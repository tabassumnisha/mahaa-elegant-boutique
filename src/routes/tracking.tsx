import { BackButton } from '@/components/mahaa/layout';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { trackingSteps } from '@/lib/demo';
import { Check, Package } from 'lucide-react';
import { pageHead,money,business } from '@/lib/catalog';
import { trackOrder } from '@/lib/mahaa.functions';
export const Route=createFileRoute('/tracking')({head:()=>pageHead('Order Tracking','Track your MAHAA order with your order ID and mobile number.'),component:Tracking});
const statusIndex:Record<string,number>={placed:0,confirmed:1,processing:2,packed:3,shipped:4,out_for_delivery:5,delivered:6};
function Tracking(){const [id,setId]=useState('');const [phone,setPhone]=useState('');const fn=useServerFn(trackOrder);const m=useMutation({mutationFn:()=>fn({data:{code:id,phone}})});const o=m.data;const idx=o?statusIndex[o.status]??-1:-1;
return <main className="wrap section"><BackButton/><div className="auth-layout"><span className="eyebrow">YOUR MAHAA ORDER</span><h1 className="page-title">Track your order</h1><p className="notice">Enter the order ID shown after checkout and the mobile number used for the order.</p><form className="form-stack mt-6" onSubmit={e=>{e.preventDefault();if(!m.isPending)m.mutate();}}><label className="field">Order ID<input maxLength={40} required value={id} onChange={e=>setId(e.target.value)} placeholder="MAHAA-XXXXXXXX"/></label><label className="field">Mobile number<input maxLength={14} pattern="(\+88)?01[3-9][0-9]{8}" required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="01XXXXXXXXX"/></label><Button variant="luxury" disabled={m.isPending}>{m.isPending?'Looking up…':'Track order'}</Button></form>
{m.isError&&<p role="alert" className="notice mt-5">{m.error instanceof Error?m.error.message:'Tracking is unavailable right now.'}</p>}
{m.isSuccess&&!o&&<p role="alert" className="notice mt-5">No order matches this order ID and mobile number. For help call {business.phone}.</p>}
{o&&<section className="tracking-result" aria-label="Tracking result"><span className="eyebrow">ORDER · {o.code}</span><h2 className="section-title">{idx>=0?trackingSteps[idx]:o.status==='cancelled'?'Cancelled':o.status}</h2>{idx>=0&&<ol className="tracking-timeline">{trackingSteps.map((step,i)=><li key={step} className={i<=idx?'complete':''}><span>{i<idx?<Check size={14}/>:<Package size={14}/>}</span><div><strong>{step}</strong>{i===idx&&<small>Current status</small>}</div></li>)}</ol>}<p>{new Date(o.date).toLocaleDateString()} · {money(o.total)}</p>{o.items.map((it,i)=><p key={i}>{it.name} × {it.quantity}</p>)}<p className="notice">Status is updated by MAHAA as your order progresses.</p></section>}</div></main>;}
