// Front-end lookup data. The product catalogue itself lives in the database (database/seed.sql).
// `art` on each product drives the built-in SVG illustrations (see src/art.jsx).

export const CATEGORIES = [
  { id: 'dresses', label: 'Dresses & gowns' },
  { id: 'abayas', label: 'Abayas & kaftans' },
  { id: 'scarves', label: 'Hijabs & scarves' },
  { id: 'outerwear', label: 'Coats & outerwear' },
]

export const LENGTHS = ['Petite', 'Regular', 'Tall']

export const REVIEW_POOL = [
  { name: 'Marta K.', title: 'The best gown I have owned', body: 'The satin falls beautifully and the cut is truly modest. Several people asked where it came from.' },
  { name: 'Daniel R.', title: 'Bought it for my wife', body: 'Real quality in the hand. The finishing is neat and the colour matched the photos exactly.' },
  { name: 'Priya S.', title: 'Packaging is lovely', body: 'Arrived in two days, folded in tissue in a sturdy box. Sizing guidance was spot on.' },
  { name: 'Tomás V.', title: 'Great as a gift', body: 'Sent a hijab set to my sister. She wore the chiffon one the same evening.' },
  { name: 'Hannah L.', title: 'Looks even better in person', body: 'The embroidery is delicate and the lining feels expensive. Easy to order and easy to return.' },
]
