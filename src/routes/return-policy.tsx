import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/return-policy')({head:()=>pageHead(policies['return-policy'].title,policies['return-policy'].intro),component:()=> <PolicyPage policy="return-policy"/>});
