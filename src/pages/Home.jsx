import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductImage from '../components/product/ProductImage'
import StarRating from '../components/ui/StarRating'
import {
  ArrowRight,
  ChevronRight,
  TruckIcon,
  ShieldIcon,
  SproutIcon,
} from '../components/ui/Icons'
import {
  categories,
  getFeaturedProducts,
  getProductById,
} from '../data/products'
import { formatCurrency } from '../utils/format'
import './Home.css'

const VALUE_PROPS = [
  {
    icon: TruckIcon,
    title: 'Free shipping over $150',
    text: 'Carefully boxed and delivered fast, straight from our nursery.',
  },
  {
    icon: ShieldIcon,
    title: '30-day thrive guarantee',
    text: 'If your tree struggles in the first month, we’ll make it right.',
  },
  {
    icon: SproutIcon,
    title: 'Grown by real horticulturists',
    text: 'Every plant is hand-selected and inspected before it ships.',
  },
]

export default function Home() {
  const featured = getFeaturedProducts(8)
  const heroProduct = getProductById('monstera-deliciosa')

  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Rooted in quality since 2016</span>
            <h1 className="hero__title">
              Bring the calm of nature into every space
            </h1>
            <p className="lede hero__lede">
              TreeHaven grows healthy indoor trees, hardy outdoor specimens,
              fruit trees, and bonsai — plus everything you need to help them
              flourish.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--lg">
                Shop the collection <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn--secondary btn--lg">
                Our story
              </Link>
            </div>
            <dl className="hero__stats">
              <div>
                <dt>12k+</dt>
                <dd>Trees homed</dd>
              </div>
              <div>
                <dt>4.8/5</dt>
                <dd>Average rating</dd>
              </div>
              <div>
                <dt>50 states</dt>
                <dd>We ship to</dd>
              </div>
            </dl>
          </div>

          <div className="hero__media" aria-hidden="true">
            <div className="hero__blob" />
            <div className="hero__product">
              <ProductImage product={heroProduct} />
            </div>
            <div className="hero__chip hero__chip--rating card">
              <StarRating rating={4.8} />
              <span>Loved by 12,000+ plant parents</span>
            </div>
            <div className="hero__chip hero__chip--price card">
              <span className="hero__chip-label">From</span>
              <span className="price">{formatCurrency(19)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Value props */}
      <section className="section value-props">
        <div className="container value-props__grid">
          {VALUE_PROPS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="value-prop">
              <span className="value-prop__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <div>
                <h3 className="value-prop__title">{title}</h3>
                <p className="text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Categories */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">Browse by type</span>
              <h2>Find your perfect match</h2>
            </div>
            <Link to="/shop" className="section__link">
              View all products <ChevronRight size={16} />
            </Link>
          </div>

          <ul className="category-tiles" role="list">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/shop?category=${category.id}`}
                  className="category-tile card"
                >
                  <span className="category-tile__art" aria-hidden="true">
                    <ProductImage product={{ name: category.name, art: category.art }} />
                  </span>
                  <span className="category-tile__body">
                    <span className="category-tile__name">{category.name}</span>
                    <span className="category-tile__tag text-muted">
                      {category.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Bestsellers */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">Community favorites</span>
              <h2>Best-selling trees</h2>
            </div>
            <Link to="/shop" className="section__link">
              Shop all <ChevronRight size={16} />
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__content">
              <h2>New to plant parenthood?</h2>
              <p>
                Start with one of our easy-care trees and a moisture meter —
                you’ll be amazed how quickly a room comes to life.
              </p>
              <Link to="/shop?category=indoor" className="btn btn--accent btn--lg">
                Shop easy-care trees <ArrowRight size={18} />
              </Link>
            </div>
            <div className="cta-banner__art" aria-hidden="true">
              <ProductImage product={getProductById('money-tree')} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
