import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { ChevronRight } from '../components/ui/Icons'
import { FREE_SHIPPING_THRESHOLD } from '../utils/pricing'
import { formatCurrency } from '../utils/format'
import './FAQ.css'

const FAQS = [
  {
    q: 'How are trees packaged and shipped?',
    a: 'Each tree is secured in a custom box with a moisture lock around the root ball, so it arrives hydrated and undamaged. We ship Monday–Wednesday to avoid weekends in transit.',
  },
  {
    q: 'When will my order arrive?',
    a: 'Most orders are prepared within 1–2 business days and arrive 5–7 business days after they ship. You’ll receive tracking by email as soon as your box is on its way.',
  },
  {
    q: 'Do you offer free shipping?',
    a: `Yes — shipping is free on every order over ${formatCurrency(
      FREE_SHIPPING_THRESHOLD,
    )}. Orders below that ship at a flat rate shown at checkout.`,
  },
  {
    q: 'What if my tree arrives damaged or unhealthy?',
    a: 'Every order is covered by our 30-day thrive guarantee. If your tree arrives damaged or struggles in the first month, send us a photo and we’ll replace it or refund you.',
  },
  {
    q: 'Can indoor trees really live in low light?',
    a: 'Most of our indoor trees prefer bright, indirect light, but several — like the Money Tree — tolerate medium light. Each product page lists exact light and watering needs.',
  },
  {
    q: 'Do you provide care instructions?',
    a: 'Absolutely. A printed care card ships with every plant, and detailed care info lives on each product page. You can also reach our team any time for tailored advice.',
  },
  {
    q: 'Is this a real store?',
    a: 'TreeHaven is a student portfolio project. The catalog and checkout are fully functional as a demo, but no real orders are placed and no payment is processed.',
  },
]

export default function FAQ() {
  return (
    <div className="faq">
      <PageHeader
        eyebrow="Help center"
        title="Frequently asked questions"
        subtitle="Everything you need to know about ordering, shipping, and caring for your trees."
      />

      <section className="section">
        <div className="container faq__container">
          <ul className="faq__list" role="list">
            {FAQS.map((item) => (
              <li key={item.q}>
                <details className="faq__item">
                  <summary className="faq__question">
                    <span>{item.q}</span>
                    <ChevronRight size={18} className="faq__chevron" />
                  </summary>
                  <p className="faq__answer">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>

          <div className="faq__cta card">
            <div>
              <h2>Still have questions?</h2>
              <p className="text-muted">
                We’re happy to help you pick the right tree or troubleshoot care.
              </p>
            </div>
            <Link to="/contact" className="btn">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
