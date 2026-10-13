import { BackButton } from '@/components/mahaa/layout';
import { createFileRoute } from '@tanstack/react-router';
import { Reviews } from '@/components/mahaa/reviews';
import { pageHead } from '@/lib/catalog';
export const Route=createFileRoute('/reviews')({head:()=>pageHead('Customer Reviews','Read real moderated customer reviews and share your MAHAA experience.'),component:()=> <main className="wrap section"><BackButton/><h1 className="page-title">Worn with love.</h1><Reviews/></main>});
