import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/privacy-policy')({head:()=>pageHead(policies['privacy-policy'].title,policies['privacy-policy'].intro),component:()=> <PolicyPage policy="privacy-policy"/>});
