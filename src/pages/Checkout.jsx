import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import FormField from '../components/ui/FormField'
import OrderSummary from '../components/cart/OrderSummary'
import { LeafLogo, ShieldIcon, ArrowRight } from '../components/ui/Icons'
import { useCart } from '../context/CartContext'
import { computeTotals } from '../utils/pricing'
import { formatCurrency } from '../utils/format'
import {
  collectErrors,
  required,
  validateEmail,
  validatePhone,
  validateZip,
  validateCardNumber,
  validateExpiry,
  validateCvc,
} from '../utils/validation'
import './Checkout.css'

const COUNTRY_OPTIONS = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
]

const INITIAL_FORM = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  billingSame: true,
  billingAddress1: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

/** Group digits into blocks of four for readable card entry. */
function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

/** Auto-insert the slash in MM/YY expiry entry. */
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function createOrderNumber() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `TH-${random}${Date.now().toString().slice(-4)}`
}

function validateForm(form) {
  return collectErrors({
    email: validateEmail(form.email),
    phone: validatePhone(form.phone, { requiredField: true }),
    firstName: required(form.firstName, 'First name'),
    lastName: required(form.lastName, 'Last name'),
    address1: required(form.address1, 'Street address'),
    city: required(form.city, 'City'),
    state: required(form.state, 'State / province'),
    zip: validateZip(form.zip),
    cardName: required(form.cardName, 'Name on card'),
    cardNumber: validateCardNumber(form.cardNumber),
    expiry: validateExpiry(form.expiry),
    cvc: validateCvc(form.cvc),
    ...(form.billingSame
      ? {}
      : {
          billingAddress1: required(form.billingAddress1, 'Billing address'),
          billingCity: required(form.billingCity, 'Billing city'),
          billingState: required(form.billingState, 'Billing state'),
          billingZip: validateZip(form.billingZip),
        }),
  })
}

export default function Checkout() {
  const { items, subtotal, isEmpty, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const totals = computeTotals(subtotal)

  // Guard: no checkout without items (unless we're mid-placement).
  if (isEmpty && !placing) {
    return <Navigate to="/cart" replace />
  }

  const update = (field) => (event) => {
    let value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    if (field === 'cardNumber') value = formatCardNumber(value)
    if (field === 'expiry') value = formatExpiry(value)

    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    const firstErrorField = Object.keys(nextErrors)[0]
    if (firstErrorField) {
      document.getElementById(firstErrorField)?.focus()
      return
    }

    setPlacing(true)
    const order = {
      number: createOrderNumber(),
      placedAt: new Date().toISOString(),
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
        art: item.art,
      })),
      totals,
      customer: {
        email: form.email,
        phone: form.phone,
        name: `${form.firstName} ${form.lastName}`.trim(),
      },
      shipping: {
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
    }

    clearCart()
    navigate('/order-confirmation', { state: { order } })
  }

  return (
    <div className="checkout">
      <div className="container">
        <header className="checkout__header">
          <div>
            <span className="eyebrow">Secure checkout</span>
            <h1>Checkout</h1>
          </div>
          <Link to="/cart" className="checkout__back">
            ← Back to cart
          </Link>
        </header>

        <form className="checkout__layout" onSubmit={handleSubmit} noValidate>
          <div className="checkout__forms">
            {/* -------------------------------------------------- Contact */}
            <section className="checkout__section card">
              <h2 className="checkout__section-title">
                <span className="checkout__step">1</span> Contact
              </h2>
              <div className="checkout__grid">
                <FormField
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                  className="checkout__col-2"
                />
                <FormField
                  id="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                  className="checkout__col-2"
                />
              </div>
            </section>

            {/* ------------------------------------------------- Shipping */}
            <section className="checkout__section card">
              <h2 className="checkout__section-title">
                <span className="checkout__step">2</span> Shipping address
              </h2>
              <div className="checkout__grid">
                <FormField
                  id="firstName"
                  label="First name"
                  autoComplete="given-name"
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                  error={errors.firstName}
                />
                <FormField
                  id="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  required
                  value={form.lastName}
                  onChange={update('lastName')}
                  error={errors.lastName}
                />
                <FormField
                  id="address1"
                  label="Street address"
                  autoComplete="address-line1"
                  required
                  value={form.address1}
                  onChange={update('address1')}
                  error={errors.address1}
                  className="checkout__col-2"
                />
                <FormField
                  id="address2"
                  label="Apartment, suite, etc."
                  autoComplete="address-line2"
                  value={form.address2}
                  onChange={update('address2')}
                  className="checkout__col-2"
                />
                <FormField
                  id="city"
                  label="City"
                  autoComplete="address-level2"
                  required
                  value={form.city}
                  onChange={update('city')}
                  error={errors.city}
                />
                <FormField
                  id="state"
                  label="State / province"
                  autoComplete="address-level1"
                  required
                  value={form.state}
                  onChange={update('state')}
                  error={errors.state}
                />
                <FormField
                  id="zip"
                  label="ZIP / postal code"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  value={form.zip}
                  onChange={update('zip')}
                  error={errors.zip}
                />
                <FormField
                  id="country"
                  label="Country"
                  autoComplete="country-name"
                  options={COUNTRY_OPTIONS}
                  value={form.country}
                  onChange={update('country')}
                />
              </div>
            </section>

            {/* -------------------------------------------------- Payment */}
            <section className="checkout__section card">
              <h2 className="checkout__section-title">
                <span className="checkout__step">3</span> Payment
              </h2>
              <p className="checkout__demo-note">
                <ShieldIcon size={18} />
                Demo store — no real payment is processed. Use test card{' '}
                <code>4242 4242 4242 4242</code>, any future expiry, any CVC.
              </p>

              <label className="checkout__billing-toggle">
                <input
                  type="checkbox"
                  checked={form.billingSame}
                  onChange={update('billingSame')}
                />
                <span>Billing address same as shipping</span>
              </label>

              {!form.billingSame && (
                <div className="checkout__grid checkout__billing">
                  <FormField
                    id="billingAddress1"
                    label="Billing street address"
                    required
                    value={form.billingAddress1}
                    onChange={update('billingAddress1')}
                    error={errors.billingAddress1}
                    className="checkout__col-2"
                  />
                  <FormField
                    id="billingCity"
                    label="City"
                    required
                    value={form.billingCity}
                    onChange={update('billingCity')}
                    error={errors.billingCity}
                  />
                  <FormField
                    id="billingState"
                    label="State / province"
                    required
                    value={form.billingState}
                    onChange={update('billingState')}
                    error={errors.billingState}
                  />
                  <FormField
                    id="billingZip"
                    label="ZIP / postal code"
                    inputMode="numeric"
                    required
                    value={form.billingZip}
                    onChange={update('billingZip')}
                    error={errors.billingZip}
                  />
                </div>
              )}

              <div className="checkout__grid">
                <FormField
                  id="cardName"
                  label="Name on card"
                  autoComplete="cc-name"
                  required
                  value={form.cardName}
                  onChange={update('cardName')}
                  error={errors.cardName}
                  className="checkout__col-2"
                />
                <FormField
                  id="cardNumber"
                  label="Card number"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={form.cardNumber}
                  onChange={update('cardNumber')}
                  error={errors.cardNumber}
                  className="checkout__col-2"
                />
                <FormField
                  id="expiry"
                  label="Expiry (MM/YY)"
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  required
                  value={form.expiry}
                  onChange={update('expiry')}
                  error={errors.expiry}
                />
                <FormField
                  id="cvc"
                  label="CVC"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  placeholder="123"
                  required
                  value={form.cvc}
                  onChange={update('cvc')}
                  error={errors.cvc}
                />
              </div>
            </section>
          </div>

          <aside className="checkout__summary">
            <OrderSummary totals={totals} items={items} title="Your order">
              <button type="submit" className="btn btn--lg btn--block">
                Place order · {formatCurrency(totals.total)} <ArrowRight size={18} />
              </button>
              <p className="order-summary__note">
                <LeafLogo size={16} /> By placing this order you agree to
                TreeHaven’s demo terms.
              </p>
            </OrderSummary>
          </aside>
        </form>
      </div>
    </div>
  )
}
