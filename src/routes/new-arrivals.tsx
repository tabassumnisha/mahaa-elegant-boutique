import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/catalog';
import { ShopPage } from '@/components/mahaa/shop-page';
export const Route=createFileRoute('/new-arrivals')({head:()=>pageHead('New Arrivals','Explore the current MAHAA catalogue. Release dates and availability are confirmed by MAHAA.'),component:()=> <ShopPage heading="New arrivals"/>});