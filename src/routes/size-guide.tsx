import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/size-guide')({head:()=>pageHead(policies['size-guide'].title,policies['size-guide'].intro),component:()=> <PolicyPage policy="size-guide"/>});
