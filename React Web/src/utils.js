import { useEffect } from 'react'
import { STORE } from './config'

export const cx = (...a) => a.filter(Boolean).join(' ')

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const fmtDay = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export const isNew = (iso, days = 45) => Date.now() - new Date(iso).getTime() < days * 86400000

export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${STORE.name}` : `${STORE.name} | ${STORE.tagline}`
  }, [title])
}

export const lowestPrice = (p) => (p.sizes ? Math.min(...p.sizes.map((s) => s.price)) : p.price)

// Deterministic pick so a product always shows the same sample reviews.
export function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export const TASTES = [
  { id: 'light', label: 'Light and flowing', blurb: 'Chiffon, linen and jersey. Airy pieces for warm days and long evenings.', test: (p) => p.profile.drape >= 4 && p.profile.warmth <= 2 },
  { id: 'sweet', label: 'Soft and structured', blurb: 'Crepe, satin and lace with a clean line. Easy to dress up or down.', test: (p) => p.profile.structure >= 3 && p.profile.warmth <= 3 && p.profile.drape >= 3 },
  { id: 'rich', label: 'Warm and tailored', blurb: 'Velvet, wool and quilting. Layers made for the cold months.', test: (p) => p.profile.warmth >= 4 },
]
