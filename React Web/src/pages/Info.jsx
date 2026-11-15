import { useState } from 'react'
import { useStore } from '../store'
import { STORE, money } from '../config'
import { usePageTitle } from '../utils'
import NotFound from './NotFound'
import inkBg from '../assets/images/bg-ink.webp'
import storyImg from '../assets/images/story.webp'
import galleryImg from '../assets/images/gallery.webp'

export default function Info({ slug }) {
  const { notify } = useStore()
  const [sent, setSent] = useState(false)
  const titles = { about: 'Our story', delivery: 'Delivery and returns', contact: 'Contact' }
  usePageTitle(titles[slug])
  if (!titles[slug]) return <NotFound />

  return (
    <>
    <header className="banner" style={{ backgroundImage: `url(${inkBg})` }}>
      <div className="wrap banner-in">
        <h1>{titles[slug]}</h1>
      </div>
    </header>
    <div className="wrap page prose">

      {slug === 'about' && (
        <>
          <p className="lede">Aurea Atelier is a fictional fashion house created for this demo store. Replace this page with your own story.</p>
          <p>
            Every dress, abaya and scarf is cut in small runs from silk, satin, linen and crepe, with fine finishing and honest sizing. We make fewer pieces, and we make them well.
          </p>
          <p>
            Edit the copy, products and prices in <code>src/config.js</code> and <code>src/data/products.js</code>, or connect the store to your own catalogue API.
          </p>
          <img className="wide-img" src={storyImg} alt="A black abaya, a cream dress and a camel coat hanging side by side" loading="lazy" />
          <img className="wide-img" src={galleryImg} alt="Three abayas and coats in black, camel and olive" loading="lazy" />
        </>
      )}

      {slug === 'delivery' && (
        <>
          <h2>Delivery</h2>
          <p>
            Orders ship within two working days. Standard delivery takes 3 to 5 days after dispatch and costs {money(STORE.shipping[0].price)}, or is free on orders over {money(STORE.freeShippingOver)}. Express delivery arrives the day after dispatch and costs {money(STORE.shipping[1].price)}.
          </p>
          <h2>Returns</h2>
          <p>
            Return unworn items with tags within 14 days for a refund. If something arrives damaged, tell us within 48 hours and we will send a replacement or refund you. Made-to-measure pieces cannot be returned.
          </p>
        </>
      )}

      {slug === 'contact' && (
        <>
          <p className="lede">
            {STORE.email}, {STORE.phone}. {STORE.address}.
          </p>
          {sent ? (
            <p className="notice">Message sent. We reply within one business day.</p>
          ) : (
            <form
              className="contact"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
                notify('Message sent')
              }}
            >
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="c-msg">How can we help?</label>
                <textarea id="c-msg" rows="5" required />
              </div>
              <button className="btn btn-dark" type="submit">
                Send message
              </button>
            </form>
          )}
        </>
      )}
    </div>
    </>
  )
}
