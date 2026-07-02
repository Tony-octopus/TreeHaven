import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import ProductImage from '../components/product/ProductImage'
import { SproutIcon, ShieldIcon, TruckIcon, LeafLogo } from '../components/ui/Icons'
import { getProductById } from '../data/products'
import './About.css'

const VALUES = [
  {
    icon: SproutIcon,
    title: 'Grown responsibly',
    text: 'Peat-free soils, recyclable packaging, and nursery practices that give back more than they take.',
  },
  {
    icon: ShieldIcon,
    title: 'Healthy or replaced',
    text: 'Every tree is inspected by hand and backed by our 30-day thrive guarantee.',
  },
  {
    icon: LeafLogo,
    title: 'Guidance included',
    text: 'Care cards ship with every plant, and our team answers questions long after delivery.',
  },
  {
    icon: TruckIcon,
    title: 'Shipped with care',
    text: 'Custom boxes and moisture locks keep roots safe from our nursery to your door.',
  },
]

const STATS = [
  { value: '2016', label: 'Planted our roots' },
  { value: '12,000+', label: 'Trees rehomed' },
  { value: '48', label: 'Native species' },
  { value: '4.8/5', label: 'Customer rating' },
]

export default function About() {
  return (
    <div className="about">
      <PageHeader
        eyebrow="Our story"
        title="Trees, grown with intention"
        subtitle="TreeHaven began with a simple belief: everyone deserves a little more green in their life — and the confidence to help it grow."
      />

      <section className="section">
        <div className="container about__story">
          <div className="about__story-text">
            <span className="eyebrow">Rooted in Portland</span>
            <h2>From a backyard nursery to your living room</h2>
            <p>
              What started as a weekend passion for propagating cuttings has
              grown into a working nursery of horticulturists, designers, and
              plant lovers. We specialize in trees — the kind that anchor a
              room, shade a garden, or fruit on a balcony.
            </p>
            <p>
              We hand-select every specimen, acclimate it in our greenhouses,
              and only ship it when it’s genuinely ready to thrive in your care.
              No mystery big-box stock — just healthy, traceable trees.
            </p>
            <Link to="/shop" className="btn">
              Explore the nursery
            </Link>
          </div>
          <div className="about__story-art" aria-hidden="true">
            <div className="about__art-frame">
              <ProductImage product={getProductById('olive-tree')} />
            </div>
            <div className="about__art-frame about__art-frame--offset">
              <ProductImage product={getProductById('japanese-maple')} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">What we stand for</span>
              <h2>Values that keep us grounded</h2>
            </div>
          </div>
          <ul className="about__values" role="list">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="about__value card">
                <span className="about__value-icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p className="text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <dl className="about__stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about__cta">
            <h2>Ready to find your next tree?</h2>
            <p>Browse the collection or reach out — we love talking plants.</p>
            <div className="about__cta-actions">
              <Link to="/shop" className="btn btn--lg">
                Shop trees
              </Link>
              <Link to="/contact" className="btn btn--secondary btn--lg">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
