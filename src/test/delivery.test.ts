import { describe,it,expect } from 'vitest';
import { deliveryFor,paymentOptions } from '@/lib/delivery';
import { customerSchema } from '@/lib/checkout-validation';
describe('Checkout selections',()=>{
 it('uses only existing confirmed charges for Dhaka and nationwide delivery',()=>{expect(deliveryFor('dhaka').charge).toBe(150);expect(deliveryFor('bangladesh').charge).toBe(150);expect(deliveryFor('natore').charge).toBe(80);});
 it('offers the requested demo payment selections',()=>{expect(paymentOptions.map(p=>p.label)).toEqual(['bKash','Nagad','Cash on Delivery']);});
 it('requires valid customer details without requiring email',()=>{const address={name:'Sample',phone:'01700000000',email:'',street:'Sample street',city:'Dhaka'};expect(customerSchema.safeParse(address).success).toBe(true);expect(customerSchema.safeParse({...address,phone:'invalid'}).success).toBe(false);expect(customerSchema.safeParse({...address,name:'  '}).success).toBe(false);});
});