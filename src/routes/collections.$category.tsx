import { createFileRoute } from '@tanstack/react-router';
import { ShopPage } from '@/components/mahaa/shop-page';
import { pageHead,categories } from '@/lib/catalog';
export const Route=createFileRoute('/collections/$category')({head:({params})=>pageHead(categories.find(c=>c.id===params.category)?.name??'Collection','Explore this MAHAA collection of elegant modest fashion.'),component:Category});
function Category(){const {category}=Route.useParams();return <ShopPage category={category}/>;}
