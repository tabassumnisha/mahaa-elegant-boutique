import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
const samples=[{name:'Sample customer',rating:5,text:'A graceful silhouette and a lovely finish. This card shows how a customer review will look.'},{name:'Sample customer',rating:5,text:'The collection photographs made it easy to choose. Real reviews appear here after moderation.'},{name:'Sample customer',rating:4,text:'Customers can rate a piece and share their experience once the store goes live.'}];
function SampleReviews(){return <><div className="review-grid mt-8">{samples.map((r,i)=><article key={i} className="review-card"><span className="eyebrow">SAMPLE · NOT A REAL CUSTOMER</span><div className="review-stars mt-3" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:5},(_,k)=><Star key={k} size={14} aria-hidden="true" fill={k<r.rating?'currentColor':'none'}/>)}</div><h3>{r.name}</h3><p>{r.text}</p></article>)}</div><p className="text-xs text-muted-foreground mt-4 text-center">Sample cards show the design only. Live reviews from real customers appear here after moderation.</p></>;}
export function ReviewPreview(){
 const query=useQuery({queryKey:['review-preview'],retry:1,queryFn:async()=>{const {data,error}=await supabase.from('reviews').select('id,display_name,rating,body,verified_purchase').eq('status','approved').order('created_at',{ascending:false}).limit(3);if(error)throw error;return data;}});
 if(query.isPending)return <div className="review-grid mt-8" aria-busy="true" aria-label="Buyer reviews">{[0,1,2].map(i=><div key={i} className="review-card animate-pulse" aria-hidden="true"><div className="h-3 w-20 bg-muted"/><div className="mt-4 h-4 w-32 bg-muted"/><div className="mt-4 h-12 w-full bg-muted"/></div>)}</div>;
 if(query.isError)return <SampleReviews/>;
 if(!query.data.length)return <SampleReviews/>;
 return <div className="review-grid mt-8">{query.data.map(r=><article key={r.id} className="review-card"><div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} size={14} aria-hidden="true" fill={i<r.rating?'currentColor':'none'}/>)}</div><h3>{r.display_name}</h3>{r.verified_purchase&&<span className="eyebrow">Verified purchase</span>}<p>{r.body}</p></article>)}</div>;
}
