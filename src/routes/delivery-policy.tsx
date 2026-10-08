import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/delivery-policy')({head:()=>pageHead(policies['delivery-policy'].title,policies['delivery-policy'].intro),component:()=> <PolicyPage policy="delivery-policy"/>});
