import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const captions=['MODESTY MEETS MODERN ELEGANCE','THE GOWN EDIT','CONSIDERED. CONFIDENT. MAHAA.'];
/** Fixed brand panel with a crossfading photograph: only the image changes, never the MAHAA wordmark or copy. */
export function HeroShowcase({images}:{images:string[]}){
 const [i,setI]=useState(0);const [paused,setPaused]=useState(false);const [reduced,setReduced]=useState(false);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(m.matches);},[]);
 useEffect(()=>{if(paused||reduced||images.length<2)return;const t=setInterval(()=>setI(n=>(n+1)%images.length),5500);return()=>clearInterval(t);},[paused,reduced,images.length]);
 const go=(n:number)=>setI((n+images.length)%images.length);
 return <section className="hero hero-static" aria-label="MAHAA campaign" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
  <div className="hero-media">{images.map((src,n)=><img key={src} src={src} alt="MAHAA modest-fashion collection" className={n===i?'hero-frame on':'hero-frame'} fetchPriority={n===0?'high':'auto'} loading={n===0?'eager':'lazy'} aria-hidden={n!==i}/>)}</div>
  <div className="wrap hero-content"><span className="eyebrow">{captions[0]}</span><h1>MAHAA</h1><p className="hero-tagline">YOUR FASHION STYLE DESTINATION</p><p className="hero-description">Elegant modest fashion designed<br/>to express your style.</p><div className="hero-actions"><Button variant="luxury" asChild><Link to="/collections">Shop collection <ArrowRight size={14}/></Link></Button><Button variant="editorial" asChild><Link to="/about">Explore MAHAA</Link></Button></div></div>
  <span className="hero-caption">THE ART OF MODEST DRESSING</span>
  <div className="hero-ctrl"><button type="button" aria-label="Previous photograph" onClick={()=>go(i-1)}><ArrowLeft size={16}/></button>{images.map((_,n)=><button type="button" key={n} aria-label={`Photograph ${n+1}`} aria-current={n===i?'true':undefined} className={n===i?'dot on':'dot'} onClick={()=>go(n)}><span/></button>)}<button type="button" aria-label="Next photograph" onClick={()=>go(i+1)}><ArrowRight size={16}/></button></div>
 </section>;
}
