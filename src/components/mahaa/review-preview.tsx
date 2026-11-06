import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LuxurySlider } from './slider';
// SAMPLE CONTENT FOR THE DEMO ONLY: delete this array (and <SampleReviews/>) when real reviews go live.
const samples=[
 {piece:'Bella Gown',rating:5,text:'The fall of the fabric is beautiful and the finish feels considered. Reviews like this will show the piece and the star rating.'},
 {piece:'Sunflower Embroidered Abaya',rating:5,text:'Customers can describe the fit, the fabric and the delivery experience in their own words.'},
 {piece:'Two Layer Ready Hijab',rating:5,text:'A short, honest note about everyday comfort sits here, next to the product it belongs to.'},
 {piece:'Cape Gown',rating:4,text:'Ratings and comments are moderated by MAHAA before they appear on the storefront.'},
 {piece:'Niqab Stone Butterfly',rating:5,text:'Buyers see real experiences from people who purchased the same piece.'},
 {piece:'Farista Gown',rating:5,text:'A verified-purchase badge appears when an order can be matched to the reviewer.'}
];
function SampleReviews(){return <><div className="mt-8"><LuxurySlider label="Customer reviews" kind="reviews" interval={4000}>{samples.map((r,i)=><article key={i} className="review-card"><span className="eyebrow">SAMPLE REVIEW · DEMO</span><div className="review-stars mt-3" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:5},(_,k)=><Star key={k} size={14} aria-hidden="true" fill={k<r.rating?'currentColor':'none'}/>)}</div><h3>{r.piece}</h3><p>{r.text}</p></article>)}</LuxurySlider></div><p className="text-xs text-muted-foreground mt-4 text-center">Sample cards show the design only. Live reviews from real customers appear here after moderation.</p></>;}
export function ReviewPreview(){
 const query=useQuery({queryKey:['review-preview'],retry:1,queryFn:async()=>{const {data,error}=await supabase.from('reviews').select('id,display_name,rating,body,verified_purchase').eq('status','approved').order('created_at',{ascending:false}).limit(3);if(error)throw error;return data;}});
 if(query.isPending)return <div className="review-grid mt-8" aria-busy="true" aria-label="Buyer reviews">{[0,1,2].map(i=><div key={i} className="review-card animate-pulse" aria-hidden="true"><div className="h-3 w-20 bg-muted"/><div className="mt-4 h-4 w-32 bg-muted"/><div className="mt-4 h-12 w-full bg-muted"/></div>)}</div>;
 if(query.isError)return <SampleReviews/>;
 if(!query.data.length)return <SampleReviews/>;
 return <div className="mt-8"><LuxurySlider label="Customer reviews" kind="reviews" interval={4000}>{query.data.map(r=><article key={r.id} className="review-card"><div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} size={14} aria-hidden="true" fill={i<r.rating?'currentColor':'none'}/>)}</div><h3>{r.display_name}</h3>{r.verified_purchase&&<span className="eyebrow">Verified purchase</span>}<p>{r.body}</p></article>)}</LuxurySlider></div>;
}
