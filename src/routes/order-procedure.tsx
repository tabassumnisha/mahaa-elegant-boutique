import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/order-procedure')({head:()=>pageHead(policies['order-procedure'].title,policies['order-procedure'].intro),component:()=> <PolicyPage policy="order-procedure"/>});
