import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/products'
import { LeafLogo, MailIcon, PhoneIcon, PinIcon } from '../ui/Icons'
import { validateEmail } from '../../utils/validation'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const handleSubscribe = (event) => {
    event.preventDefault()
    const error = validateEmail(email)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }
    setStatus({
      type: 'success',
      message: 'You’re on the list — watch for seasonal growing tips!',
    })
    setEmail('')
  }

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="TreeHaven home">
            <LeafLogo size={26} />
            <span>TreeHaven</span>
          </Link>
          <p className="footer__blurb">
            Thoughtfully grown trees and plant care essentials, shipped from our
            nursery to your doorstep. Rooted in quality since 2016.
          </p>
          <ul className="footer__contact" role="list">
            <li>
              <PinIcon size={18} /> 42 Grove Lane, Portland, OR
            </li>
            <li>
              <MailIcon size={18} />{' '}
              <a href="mailto:hello@treehaven.example">hello@treehaven.example</a>
            </li>
            <li>
              <PhoneIcon size={18} /> (503) 555-0142
            </li>
          </ul>
        </div>

        <nav className="footer__col" aria-label="Shop categories">
          <h2 className="footer__heading">Shop</h2>
          <ul role="list">
            <li>
              <Link to="/shop">All products</Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/shop?category=${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Company">
          <h2 className="footer__heading">Company</h2>
          <ul role="list">
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/shop">Gift cards</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col footer__newsletter">
          <h2 className="footer__heading">Stay rooted</h2>
          <p className="text-muted">
            Growing guides and new arrivals, once a month. No spam.
          </p>
          <form className="footer__form" onSubmit={handleSubscribe} noValidate>
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (status.type !== 'idle') setStatus({ type: 'idle', message: '' })
              }}
              aria-invalid={status.type === 'error'}
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>
          {status.message && (
            <p
              className={`footer__status footer__status--${status.type}`}
              role="status"
            >
              {status.message}
            </p>
          )}
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {year} TreeHaven. All rights reserved.</p>
          <p className="text-muted">
            A student project — no real orders are processed.
          </p>
        </div>
      </div>
    </footer>
  )
}
