import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/refund-information')({head:()=>pageHead(policies['refund-information'].title,policies['refund-information'].intro),component:()=> <PolicyPage policy="refund-information"/>});
