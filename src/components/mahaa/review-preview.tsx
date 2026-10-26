import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export function ReviewPreview(){
 const query=useQuery({queryKey:['review-preview'],retry:1,queryFn:async()=>{const {data,error}=await supabase.from('reviews').select('id,display_name,rating,body,verified_purchase').eq('status','approved').order('created_at',{ascending:false}).limit(3);if(error)throw error;return data;}});
 if(query.isPending)return <div className="review-grid mt-8" aria-busy="true" aria-label="Buyer reviews">{[0,1,2].map(i=><div key={i} className="review-card animate-pulse" aria-hidden="true"><div className="h-3 w-20 bg-muted"/><div className="mt-4 h-4 w-32 bg-muted"/><div className="mt-4 h-12 w-full bg-muted"/></div>)}</div>;
 if(query.isError)return <div className="notice mt-8" role="alert">Buyer reviews could not be loaded. <Button variant="link" className="p-0 h-auto" onClick={()=>query.refetch()}>Try again</Button></div>;
 if(!query.data.length)return <p className="notice mt-8">No approved buyer reviews yet. Reviews appear here after moderation.</p>;
 return <div className="review-grid mt-8">{query.data.map(r=><article key={r.id} className="review-card"><div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} size={14} aria-hidden="true" fill={i<r.rating?'currentColor':'none'}/>)}</div><h3>{r.display_name}</h3>{r.verified_purchase&&<span className="eyebrow">Verified purchase</span>}<p>{r.body}</p></article>)}</div>;
}
