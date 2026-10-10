import { useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function LuxurySlider({children,label,kind='products',interval=4500}:{children:ReactNode[];label:string;kind?:'products'|'hero'|'editorial'|'stories';interval?:number}){
 const [reduced,setReduced]=useState(false);const [selected,setSelected]=useState(0);const [snaps,setSnaps]=useState<number[]>([]);
 const [ref,api]=useEmblaCarousel({loop:true,align:'start',slidesToScroll:1},[Autoplay({delay:interval,stopOnInteraction:false,stopOnMouseEnter:true,stopOnFocusIn:true})]);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(m.matches);const update=()=>setReduced(m.matches);m.addEventListener('change',update);return()=>m.removeEventListener('change',update);},[]);
 useEffect(()=>{if(!api)return;const update=()=>{setSelected(api.selectedScrollSnap());setSnaps(api.scrollSnapList());if(reduced)api.plugins().autoplay?.stop();};update();api.on('select',update);api.on('reInit',update);return()=>{api.off('select',update);api.off('reInit',update);};},[api,reduced]);
 return <div className={`lux-slider lux-slider-${kind}`} role="region" aria-label={label} data-slide={selected}><div className="lux-viewport" ref={ref}><div className="lux-track">{children.map((child,i)=><div className="lux-slide" key={i}>{child}</div>)}</div></div><div className="lux-controls"><Button variant="ghost" size="icon" aria-label={`Previous ${label}`} onClick={()=>api?.scrollPrev()}><ArrowLeft size={17}/></Button><div className="lux-dots">{snaps.map((_,i)=><Button key={i} variant="ghost" size="icon" aria-label={`${label} slide ${i+1}`} aria-current={i===selected?'true':undefined} className={i===selected?'selected':''} onClick={()=>api?.scrollTo(i)}><span/></Button>)}</div><Button variant="ghost" size="icon" aria-label={`Next ${label}`} onClick={()=>api?.scrollNext()}><ArrowRight size={17}/></Button></div></div>;
}