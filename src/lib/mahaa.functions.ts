import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { products } from './catalog';

const email = z.string().trim().email().max(255);
export const submitEnquiry = createServerFn({method:'POST'})
 .inputValidator((input:unknown)=>z.object({name:z.string().trim().min(1).max(100),email,message:z.string().trim().min(1).max(2000),website:z.string().max(0).optional()}).parse(input))
 .handler(async({data})=>{
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {data:allowed,error:limitError}=await supabaseAdmin.rpc('check_form_limit',{bucket:`contact:${data.email.toLowerCase()}`});
  if(limitError || !allowed) throw new Error('Please try again later or call MAHAA.');
  const {data:row,error}=await supabaseAdmin.from('contact_submissions').insert({name:data.name,email:data.email,message:data.message}).select('id').single();
  if(error)throw new Error('Your message could not be saved. Please try again.');
  return {id:row.id};
 });
export const subscribeNewsletter = createServerFn({method:'POST'})
 .inputValidator((input:unknown)=>z.object({email}).parse(input))
 .handler(async({data})=>{
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {data:allowed}=await supabaseAdmin.rpc('check_form_limit',{bucket:`newsletter:${data.email.toLowerCase()}`});
  if(!allowed)throw new Error('Please try again later.');
  const {error}=await supabaseAdmin.from('newsletter_subscriptions').upsert({email:data.email.toLowerCase()},{onConflict:'email'});
  if(error)throw new Error('Your subscription could not be saved.');
  return {saved:true};
 });
export const placeConceptOrder = createServerFn({method:'POST'})
 .middleware([requireSupabaseAuth])
 .inputValidator((input:unknown)=>z.object({items:z.array(z.object({id:z.string().max(150),quantity:z.number().int().min(1).max(20)})).min(1).max(30),address:z.object({name:z.string().trim().min(1).max(100),phone:z.string().regex(/^(?:\+88)?01[3-9]\d{8}$/),street:z.string().trim().min(5).max(300),city:z.string().trim().min(2).max(100),area:z.enum(['natore','bangladesh'])})}).parse(input))
 .handler(async({data,context})=>{
  const items=data.items.map(item=>{const product=products.find(p=>p.id===item.id);if(!product)throw new Error('Product is unavailable.');return {...item,name:product.name,price:product.price};});
  const total=items.reduce((sum,item)=>sum+item.price*item.quantity,0)+(data.address.area==='natore'?80:150);
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {data:allowed}=await supabaseAdmin.rpc('check_form_limit',{bucket:`order:${context.userId}`});if(!allowed)throw new Error('Please try again later.');
  const {data:order,error}=await supabaseAdmin.from('orders').insert({user_id:context.userId,items,address:data.address,total}).select('id,total,status').single();
  if(error)throw new Error('Your concept order could not be saved.');return order;
 });
const phoneRe=/^(?:\+88)?01[3-9]\d{8}$/;
const normPhone=(p:string)=>p.trim().replace(/^\+88/,'');
export const placeOrder = createServerFn({method:'POST'})
 .inputValidator((input:unknown)=>z.object({items:z.array(z.object({id:z.string().max(150),quantity:z.number().int().min(1).max(20)})).min(1).max(30),customer:z.object({name:z.string().trim().min(1).max(100),phone:z.string().trim().regex(phoneRe),email:z.union([z.literal(''),z.string().trim().email().max(255)]),street:z.string().trim().min(5).max(300),city:z.string().trim().min(1).max(100)}),area:z.enum(['dhaka','bangladesh','natore']),payment:z.enum(['bkash','nagad','cod'])}).parse(input))
 .handler(async({data})=>{
  const {deliveryFor}=await import('./delivery');
  const items=data.items.map(item=>{const product=products.find(p=>p.id===item.id);if(!product)throw new Error('A product in your bag is no longer available.');return {...item,name:product.name,price:product.price};});
  const total=items.reduce((s,i)=>s+i.price*i.quantity,0)+deliveryFor(data.area).charge;
  const phone=normPhone(data.customer.phone);
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {data:allowed}=await supabaseAdmin.rpc('check_form_limit',{bucket:`order:${phone}`});
  if(!allowed)throw new Error('Too many orders from this number. Please call MAHAA.');
  const code=`MAHAA-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random()*1296).toString(36).toUpperCase().padStart(2,'0')}`;
  const {data:order,error}=await supabaseAdmin.from('orders').insert({order_code:code,phone,items,address:{...data.customer,phone},total,payment_method:data.payment,delivery_area:data.area,status:'placed'}).select('order_code,total,status,created_at').single();
  if(error||!order)throw new Error('Your order could not be saved. Please try again.');
  return order;
 });
export const trackOrder = createServerFn({method:'POST'})
 .inputValidator((input:unknown)=>z.object({code:z.string().trim().min(4).max(40),phone:z.string().trim().regex(phoneRe)}).parse(input))
 .handler(async({data})=>{
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const phone=normPhone(data.phone);
  const {data:allowed}=await supabaseAdmin.rpc('check_form_limit',{bucket:`track:${phone}`});
  if(!allowed)throw new Error('Too many lookups. Please try again later.');
  const {data:o}=await supabaseAdmin.from('orders').select('order_code,status,total,created_at,items,payment_method').eq('order_code',data.code.toUpperCase()).eq('phone',phone).maybeSingle();
  if(!o)return null;
  return {code:o.order_code,status:o.status,total:o.total,date:o.created_at,payment:o.payment_method,items:(o.items as {name:string;quantity:number}[]).map(i=>({name:i.name,quantity:i.quantity}))};
 });
