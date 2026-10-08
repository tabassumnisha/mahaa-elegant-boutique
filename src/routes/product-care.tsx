import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/mahaa/content';
import { policies } from '@/lib/policies';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/product-care')({head:()=>pageHead(policies['product-care'].title,policies['product-care'].intro),component:()=> <PolicyPage policy="product-care"/>});
