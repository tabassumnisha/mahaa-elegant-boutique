import { useState } from 'react'

// Original SVG product illustrations (dresses, gowns, abayas, scarves, coats and bags). Each product's `art` object picks a drawing and a colour.
// Replace these with real photos by setting `image` on a product (see ProductCard / ProductPage).

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))
function parse(hex) {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
const toHex = (r, g, b) => '#' + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')
export const tint = (hex, t) => {
  const [r, g, b] = parse(hex)
  return toHex(r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t)
}
export const shade = (hex, t) => {
  const [r, g, b] = parse(hex)
  return toHex(r * (1 - t), g * (1 - t), b * (1 - t))
}
const luminance = (hex) => {
  const [r, g, b] = parse(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

const GOLD = '#B8924A'

function Shadow({ cx = 200, cy = 354, rx = 110 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="9" fill="#000" opacity="0.16" />
}

function Hanger({ y = 40 }) {
  return (
    <g fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round">
      <path d={`M200 ${y + 22} v-8 c0 -10 12 -10 12 -20 c0 -8 -6 -12 -12 -12`} />
      <path d={`M200 ${y + 22} L136 ${y + 44} Q128 ${y + 48} 138 ${y + 50} H262 Q272 ${y + 48} 264 ${y + 44} Z`} strokeLinejoin="round" />
    </g>
  )
}

// Soft light and shadow overlays shared by the garments.
function Sheen({ d, o = 0.1 }) {
  return (
    <>
      <path d={d} fill="#fff" opacity={o} />
    </>
  )
}

function Dress({ color }) {
  const dark = shade(color, 0.22)
  const trim = luminance(color) > 0.6 ? shade(color, 0.3) : GOLD
  return (
    <g>
      <Shadow cy={356} rx={118} />
      <Hanger />
      <path d="M166 92 L200 106 L234 92 L262 112 L292 214 L262 224 L246 160 L252 240 L300 340 H100 L148 240 L154 160 L138 224 L108 214 L138 112 Z" fill={color} />
      <path d="M200 106 L234 92 L262 112 L292 214 L262 224 L246 160 L252 240 L300 340 H200 Z" fill="#000" opacity="0.1" />
      <path d="M166 92 L200 106 L234 92 Q200 128 166 92 Z" fill={dark} />
      <path d="M148 240 H252 V252 H148 Z" fill={trim} opacity="0.9" />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <path key={k} d={`M${158 + k * 14} 256 Q${150 + k * 18} 300 ${112 + k * 26} 338`} stroke="#000" strokeWidth="2" opacity="0.1" fill="none" />
      ))}
      <path d="M146 214 H108 M254 214 H292" stroke={trim} strokeWidth="4" opacity="0.9" />
    </g>
  )
}

function Gown({ color }) {
  const dark = shade(color, 0.24)
  const lace = luminance(color) > 0.6 ? shade(color, 0.12) : tint(color, 0.18)
  return (
    <g>
      <Shadow cy={358} rx={140} />
      <Hanger y={30} />
      <path d="M170 82 L200 94 L230 82 L256 100 L284 200 L256 212 L242 150 L250 196 L322 346 Q200 366 78 346 L150 196 L158 150 L144 212 L116 200 L144 100 Z" fill={color} />
      <path d="M200 94 L230 82 L256 100 L284 200 L256 212 L242 150 L250 196 L322 346 Q260 358 200 360 Z" fill="#000" opacity="0.1" />
      <path d="M170 82 L200 94 L230 82 Q200 118 170 82 Z" fill={dark} />
      <path d="M150 196 Q200 214 250 196 L252 206 Q200 226 148 206 Z" fill={GOLD} opacity="0.9" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <path key={k} d={`M${166 + k * 10} 222 Q${150 + k * 14} 290 ${100 + k * 28} 352`} stroke="#000" strokeWidth="2" opacity="0.09" fill="none" />
      ))}
      <path d="M150 120 q25 14 50 0 q25 14 50 0" stroke={lace} strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M128 330 q18 12 36 0 q18 12 36 0 q18 12 36 0 q18 12 36 0 q18 12 20 0" stroke={lace} strokeWidth="3" fill="none" opacity="0.7" />
    </g>
  )
}

function Abaya({ color }) {
  const dark = shade(color, 0.28)
  const inner = luminance(color) > 0.5 ? shade(color, 0.3) : '#0c0b09'
  const trim = luminance(color) > 0.5 ? shade(color, 0.35) : GOLD
  return (
    <g>
      <Shadow cy={358} rx={118} />
      <Hanger y={30} />
      <path d="M168 84 L200 96 L232 84 L260 102 L328 280 L296 292 L256 170 L262 346 H138 L144 170 L104 292 L72 280 L140 102 Z" fill={color} />
      <path d="M200 96 L232 84 L260 102 L328 280 L296 292 L256 170 L262 346 H200 Z" fill="#000" opacity="0.12" />
      <path d="M192 96 H208 L212 346 H188 Z" fill={inner} />
      <path d="M168 84 L200 96 L232 84 Q200 124 168 84 Z" fill={dark} />
      <path d="M186 100 L184 346 M214 100 L216 346" stroke={trim} strokeWidth="3" opacity="0.9" />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <circle key={k} cx="200" cy={122 + k * 32} r="2" fill={trim} opacity="0.75" />
      ))}
      <path d="M74 282 L100 292 M326 282 L300 292" stroke={trim} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
      <path d="M150 190 Q146 270 150 340 M250 190 Q254 270 250 340" stroke="#000" strokeWidth="2" opacity="0.12" fill="none" />
    </g>
  )
}

function Hijab({ color }) {
  const dark = shade(color, 0.2)
  const light = tint(color, 0.28)
  return (
    <g>
      <Shadow cy={352} rx={120} />
      <path d="M92 120 C150 84 250 84 308 120 C334 190 322 290 296 332 C250 306 150 306 104 332 C78 290 66 190 92 120 Z" fill={color} />
      <path d="M200 98 C250 98 296 112 308 120 C334 190 322 290 296 332 C262 312 230 306 200 304 Z" fill="#000" opacity="0.1" />
      <path d="M92 120 C150 150 250 150 308 120" fill="none" stroke={dark} strokeWidth="3" opacity="0.5" />
      <path d="M104 332 C130 240 130 200 118 150 M296 332 C270 240 270 200 282 150" stroke={dark} strokeWidth="3" opacity="0.35" fill="none" />
      <path d="M150 130 C170 190 170 250 156 312 M200 140 C206 200 206 250 200 306 M250 130 C230 190 230 250 244 312" stroke={light} strokeWidth="5" opacity="0.28" fill="none" strokeLinecap="round" />
      <path d="M92 120 C150 84 250 84 308 120" fill="none" stroke={GOLD} strokeWidth="2.5" opacity="0.85" />
    </g>
  )
}

function Coat({ color }) {
  const dark = shade(color, 0.26)
  const light = tint(color, 0.2)
  return (
    <g>
      <Shadow cy={356} rx={122} />
      <Hanger y={30} />
      <path d="M160 86 L200 100 L240 86 L268 104 L318 280 L286 290 L260 190 L266 344 H134 L140 190 L114 290 L82 280 L132 104 Z" fill={color} />
      <path d="M200 100 L240 86 L268 104 L318 280 L286 290 L260 190 L266 344 H200 Z" fill="#000" opacity="0.12" />
      <path d="M200 100 L160 86 L176 150 L200 190 Z" fill={light} opacity="0.55" />
      <path d="M200 100 L240 86 L224 150 L200 190 Z" fill={dark} opacity="0.75" />
      <path d="M200 190 V344" stroke={dark} strokeWidth="3" />
      <rect x="134" y="206" width="132" height="14" rx="3" fill={dark} />
      <rect x="190" y="204" width="20" height="18" rx="3" fill="none" stroke={GOLD} strokeWidth="3" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={k % 2 ? 214 : 186} cy={246 + k * 30} r="5" fill={GOLD} />
      ))}
      <path d="M144 270 h30 M226 270 h30" stroke={dark} strokeWidth="3" opacity="0.8" />
    </g>
  )
}

function Bag({ color }) {
  const dark = shade(color, 0.28)
  return (
    <g>
      <Shadow cy={350} rx={112} />
      <path d="M142 170 C142 100 258 100 258 170" fill="none" stroke={dark} strokeWidth="12" strokeLinecap="round" />
      <path d="M96 170 H304 L322 336 Q322 346 312 346 H88 Q78 346 78 336 Z" fill={color} />
      <path d="M200 170 H304 L322 336 Q322 346 312 346 H200 Z" fill="#000" opacity="0.12" />
      <path d="M96 200 H304" stroke={dark} strokeWidth="3" opacity="0.6" />
      <rect x="182" y="190" width="36" height="28" rx="5" fill={GOLD} />
      <circle cx="200" cy="204" r="5" fill={dark} />
    </g>
  )
}

const DRAWINGS = { dress: Dress, gown: Gown, abaya: Abaya, hijab: Hijab, coat: Coat, bag: Bag }

let uid = 0
export function ProductArt({ art, color, view = 'main', className = '', title }) {
  const Drawing = DRAWINGS[art.type] || Dress
  const base = color || art.color
  const props = { ...art, color: base }
  const [id] = useState(() => `pa${++uid}`)
  const light = view === 'light'
  const transform = view === 'close' ? 'translate(-130 -120) scale(1.65)' : undefined
  return (
    <svg className={className} viewBox="0 0 400 400" role="img" aria-label={title || 'Product illustration'} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          {light ? (
            <>
              <stop offset="0" stopColor="#F7F1E6" />
              <stop offset="1" stopColor="#E6DAC3" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#3A342B" />
              <stop offset="1" stopColor="#16130E" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.38" r="0.6">
          <stop offset="0" stopColor="#D8B779" stopOpacity={light ? 0.22 : 0.3} />
          <stop offset="1" stopColor="#D8B779" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <rect width="400" height="400" fill={`url(#${id}-glow)`} />
      <rect y="352" width="400" height="48" fill="#000" opacity={light ? 0.05 : 0.18} />
      <g transform={transform}>
        <Drawing {...props} />
      </g>
    </svg>
  )
}
