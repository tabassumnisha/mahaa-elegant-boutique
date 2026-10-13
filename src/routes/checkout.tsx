import { BackButton } from '@/components/mahaa/layout';
import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/catalog';
import { DemoCheckout } from '@/components/mahaa/demo-checkout';
export const Route=createFileRoute('/checkout')({head:()=>pageHead('Checkout','Enter delivery details, choose delivery and payment, and place your MAHAA order.'),component:Checkout});
function Checkout(){return <main className="section wrap"><BackButton fallback="/cart"/><span className="eyebrow">THE FINAL DETAILS</span><h1 className="page-title">Checkout</h1><DemoCheckout/></main>;}
