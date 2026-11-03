# MAHAA — Elegant Modest Fashion

A premium e-commerce storefront for **MAHAA**, a modest-fashion brand based in Natore, Bangladesh. The experience is designed around the brand's real identity: deep black, MAHAA gold and warm ivory, with editorial photography, restrained motion and a refined, trustworthy feel on every screen size.

> Your fashion style destination — gowns, hijabs, abayas & borkhas, niqabs and three-piece collections.

## Highlights

- **Cinematic homepage** — autoplay hero, shop-by-collection, new arrivals, best sellers, editorial campaign, outlet experience, MAHAA Stories (YouTube) and social gallery
- **Complete shopping journey** — product browsing, category filters, search, product detail with gallery, quick view, bag, wishlist, five-step checkout, order confirmation and order tracking
- **Delivery and payment options** — Natore and nationwide delivery, bKash, Nagad and cash-on-delivery selections (no online payment is collected until a gateway is connected)
- **Customer accounts** — email sign-in, Google sign-in, profile, wishlist, saved details and order history
- **Real review system** — customer submissions with star rating, moderation and featured reviews; no fabricated testimonials
- **Help Center and policies** — order procedure, delivery, returns & exchange, refunds, shipping, privacy, terms, FAQ, size guide and product care
- **Content** — About MAHAA, outlet page, blog / style journal, product videos and contact page with enquiry form
- **Fully responsive** — separate layouts for mobile (bottom navigation, sticky actions), tablet, laptop and large desktop

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | TanStack Start + TanStack Router (React 19, TypeScript) |
| Styling | Tailwind CSS 4 with a custom MAHAA design layer |
| UI primitives | Radix UI, Embla Carousel, Lucide icons, Sonner |
| Data and auth | Supabase (database, authentication, row-level security) |
| Tooling | Vite, Vitest, ESLint, Prettier |

## Getting started

Requires Node.js 20+ (or Bun).

```sh
npm install      # or: bun install
npm run dev      # start the local development server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # lint the project
npm test         # run the test suite
```

Copy the Supabase connection details into a `.env` file:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
```

## Project structure

```
src/
  components/mahaa/   Storefront components (header, footer, sliders, product cards, checkout)
  components/ui/      Shared UI primitives
  lib/                Catalogue, policies, articles, delivery and business data
  routes/             One file per page
  assets/             Logo and photography references
  styles.css          Design tokens and the MAHAA visual layer
supabase/             Database migrations
public/               Static files
```

## Updating content

Everything the client is likely to change lives in shared data files, so the storefront and detail pages always stay in sync:

- **Products and categories** — `src/lib/catalog.ts`
- **Contact details and social links** — `src/lib/catalog.ts` (`business`)
- **Policy text** — `src/lib/policies.ts`
- **Style journal articles** — `src/lib/articles.ts`
- **Delivery options** — `src/lib/delivery.ts`
- **Brand imagery** — `src/assets/` (see the README inside for replacing images)

## Production checklist

Before launch, the following need MAHAA's own production details:

- Live payment gateway (bKash / Nagad / card) and inventory connection
- Final legal text for the policy pages
- Original high-resolution product and campaign photography
- Approved customer reviews (reviews are moderated and none are pre-filled)

## Brand assets

The MAHAA logo is used exactly as supplied and must never be redrawn, recoloured or distorted.

© 2026 Mahaa. All rights reserved.
