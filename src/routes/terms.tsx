import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/terms')({head:()=>pageHead(policies['terms'].title,policies['terms'].intro),component:()=> <PolicyPage policy="terms"/>});
