import { BackButton } from '@/components/mahaa/layout';
import { createFileRoute,Link } from '@tanstack/react-router';
import { useStore } from '@/components/mahaa/store';
import { products,pageHead } from '@/lib/catalog';
import { ProductCard } from '@/components/mahaa/products';
import { Button } from '@/components/ui/button';
export const Route=createFileRoute('/wishlist')({head:()=>pageHead('Your Wishlist','Save your favourite MAHAA styles to your personal wishlist.'),component:Wishlist});
function Wishlist(){const {user,wishlist}=useStore();const items=products.filter(p=>wishlist.includes(p.id));return <main className="wrap section"><BackButton/><span className="eyebrow">PIECES YOU LOVE</span><h1 className="page-title">Your wishlist</h1>{!user&&<p className="notice">Demo favourites saved on this device. Sign in for your connected MAHAA wishlist.</p>}{items.length?<div className="products-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-state"><h2>Find something to fall in love with.</h2><Button variant="luxury" asChild><Link to="/shop">Explore the collection</Link></Button></div>}</main>;}
