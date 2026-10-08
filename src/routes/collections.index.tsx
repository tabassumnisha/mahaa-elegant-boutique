import { createFileRoute,Link } from '@tanstack/react-router';
import { categories,pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/collections/')({head:()=>pageHead('Our Collections','Explore MAHAA gowns, hijabs, abayas, niqabs, three piece, premium overcoats and ponchos.'),component:CollectionsPage});
function CollectionsPage(){return <main className="section wrap"><span className="eyebrow">THE WORLD OF MAHAA</span><h1 className="page-title">Our collections</h1><div className="products-grid">{categories.map(c=><Link className="collection-card" to="/collections/$category" params={{category:c.id}} key={c.id}><img src={c.image} alt={c.name}/><div className="collection-label"><h3>{c.name}</h3><span>EXPLORE COLLECTION ↗</span></div></Link>)}</div></main>;}
