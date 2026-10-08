import { createFileRoute } from '@tanstack/react-router';
import { ShopPage } from '@/components/mahaa/shop-page';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/shop')({head:()=>pageHead('Shop the Collection','Browse authentic MAHAA modest-fashion pieces, filter by price and discover your next favourite.'),component:ShopPage});
