import { useMemo, useState } from 'react'
import { Link } from '../router'
import { useStore } from '../store'
import { STORE, money } from '../config'
import { Icon, Stars } from '../components/Icons'
import Media from '../components/Media'
import ProductCard from '../components/ProductCard'
import { REVIEW_POOL } from '../data/products'
import { TASTES, lowestPrice, usePageTitle } from '../utils'
import heroImg from '../assets/images/hero.webp'
import collectionImg from '../assets/images/collection.webp'
import customImg from '../assets/images/custom.webp'
import tiersImg from '../assets/images/tiers.webp'
import lightImg from '../assets/images/bg-light.webp'

export default function Home() {
  usePageTitle('')
  const { products } = useStore()
  const [taste, setTaste] = useState('light')

  const featured = products.filter((p) => p.category === 'dresses' && p.featured).slice(0, 4)
  const picks = products.filter((p) => (p.category === 'abayas' || p.category === 'scarves' || p.category === 'outerwear') && p.stock > 0).slice(0, 3)
  const gift = products.find((p) => p.id === 'layla-lace-wedding-gown')
  const kit = products.find((p) => p.id === 'medina-embroidered-abaya')
  const current = TASTES.find((t) => t.id === taste)
  const matches = useMemo(() => products.filter((p) => p.category === 'dresses' && p.stock > 0 && p.profile && current.test(p)).slice(0, 3), [products, current])

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="wrap hero-in">
          <div className="hero-copy">
            <h1>
              <span className="rise r1">Modest</span> <span className="rise r2">dressing,</span> <span className="rise r3">beautifully made.</span>
            </h1>
            <p className="hero-sub rise r4">
              Dresses, gowns, abayas and scarves in silk, satin, linen and crepe. Thoughtful cuts, fine finishing and free returns for 14 days.
            </p>
            <div className="hero-cta rise r5">
              <Link to="/shop?cat=dresses" className="btn btn-gold btn-lg">
                Shop dresses
              </Link>
              {gift && (
                <Link to={`/product/${gift.id}`} className="btn btn-outline-light btn-lg">
                  See the bridal gown
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="wrap trust-in">
          <p><Icon name="flame" /> Small batches, fine finishing</p>
          <p><Icon name="truck" /> Free shipping over {money(STORE.freeShippingOver)}</p>
          <p><Icon name="leaf" /> Recyclable packaging</p>
          <p><Icon name="shield" /> Free returns within 14 days</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>Signature dresses and gowns</h2>
            <Link to="/shop?cat=dresses" className="text-link">
              View all dresses <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="grid grid-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap band">
        <figure>
          <img src={collectionImg} alt="A black abaya, a satin gown and a sage dress hanging in a bright studio" loading="lazy" />
          <figcaption>
            <p>Every piece is cut in small runs, from airy chiffon dresses to heavy satin evening gowns.</p>
            <Link to="/shop?cat=dresses" className="text-link">
              Explore the dresses <Icon name="arrow" size={16} />
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="section section-photo" style={{ backgroundImage: `url(${lightImg})` }}>
        <div className="wrap finder">
          <div className="finder-copy">
            <h2>Not sure where to start?</h2>
            <p className="lede">Tell us how you like to dress. We will point you to the pieces that fit.</p>
            <div className="pills" role="tablist" aria-label="Style">
              {TASTES.map((t) => (
                <button key={t.id} role="tab" aria-selected={taste === t.id} className={`pill ${taste === t.id ? 'on' : ''}`} onClick={() => setTaste(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <p className="finder-blurb">{current.blurb}</p>
            <Link to={`/shop?cat=dresses&taste=${taste}`} className="text-link">
              See all {current.label.toLowerCase()} dresses <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="finder-list">
            {matches.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="finder-item">
                <Media product={p} className="finder-img" />
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.notes.join(', ')}</small>
                </span>
                <span className="price">{money(lowestPrice(p))}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>New in abayas, scarves and coats</h2>
            <Link to="/shop?cat=abayas" className="text-link">
              All abayas and kaftans <Icon name="arrow" size={16} />
            </Link>
          </div>
          <img className="wide-img" src={customImg} alt="Four dresses in cream, ivory, terracotta and navy hanging in a row" loading="lazy" />
          <div className="grid grid-3">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {kit && (
        <section className="feature">
          <div className="wrap feature-in">
            <img className="feature-img" src={tiersImg} alt="A black abaya with gold trim beside two chiffon hijabs" loading="lazy" />
            <div className="feature-copy">
              <h2>The occasion edit</h2>
              <p className="lede">{kit.description}</p>
              <p className="feature-price">
                {money(kit.price)}
              </p>
              <Link to={`/product/${kit.id}`} className="btn btn-gold btn-lg">
                See the abaya
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>What customers say</h2>
          </div>
          <div className="grid grid-3">
            {REVIEW_POOL.slice(0, 3).map((r) => (
              <figure key={r.name} className="quote">
                <Stars value={5} />
                <blockquote>
                  <strong>{r.title}</strong>
                  <p>{r.body}</p>
                </blockquote>
                <figcaption>{r.name}, verified buyer</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
