import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/shipping-information')({head:()=>pageHead(policies['shipping-information'].title,policies['shipping-information'].intro),component:()=> <PolicyPage policy="shipping-information"/>});
