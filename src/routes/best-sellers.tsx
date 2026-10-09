import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/catalog';
import { ShopPage } from '@/components/mahaa/shop-page';
export const Route=createFileRoute('/best-sellers')({head:()=>pageHead('Best Sellers','Discover MAHAA catalogue favourites. Sales rankings are not yet connected.'),component:()=> <ShopPage heading="The MAHAA favourites edit"/>});