import { Link, Navigate, useLocation } from 'react-router-dom'
import OrderSummary from '../components/cart/OrderSummary'
import { CheckIcon, TruckIcon, MailIcon } from '../components/ui/Icons'
import './OrderConfirmation.css'

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export default function OrderConfirmation() {
  const location = useLocation()
  const order = location.state?.order

  // Direct visits (no order in navigation state) go back home.
  if (!order) {
    return <Navigate to="/" replace />
  }

  const placedAt = new Date(order.placedAt)
  const deliveryStart = new Date(placedAt)
  deliveryStart.setDate(deliveryStart.getDate() + 5)
  const deliveryEnd = new Date(placedAt)
  deliveryEnd.setDate(deliveryEnd.getDate() + 7)

  const firstName = order.customer.name.split(' ')[0] || 'there'

  return (
    <div className="confirmation">
      <div className="container">
        <div className="confirmation__banner">
          <span className="confirmation__check" aria-hidden="true">
            <CheckIcon size={36} />
          </span>
          <span className="eyebrow">Order confirmed</span>
          <h1>Thank you, {firstName}!</h1>
          <p className="lede">
            Your order <strong>{order.number}</strong> is confirmed and being
            prepared with care at our nursery.
          </p>
        </div>

        <div className="confirmation__layout">
          <div className="confirmation__details">
            <div className="confirmation__info card">
              <div className="confirmation__info-item">
                <span className="confirmation__info-icon" aria-hidden="true">
                  <MailIcon size={20} />
                </span>
                <div>
                  <h2>Confirmation sent</h2>
                  <p className="text-muted">
                    A receipt is on its way to{' '}
                    <strong>{order.customer.email}</strong>.
                  </p>
                </div>
              </div>
              <div className="confirmation__info-item">
                <span className="confirmation__info-icon" aria-hidden="true">
                  <TruckIcon size={20} />
                </span>
                <div>
                  <h2>Estimated delivery</h2>
                  <p className="text-muted">
                    {formatDate(deliveryStart)} – {formatDate(deliveryEnd)}
                  </p>
                </div>
              </div>
            </div>

            <div className="confirmation__address card">
              <h2>Shipping to</h2>
              <address>
                {order.customer.name}
                <br />
                {order.shipping.address1}
                {order.shipping.address2 && (
                  <>
                    <br />
                    {order.shipping.address2}
                  </>
                )}
                <br />
                {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                <br />
                {order.shipping.country}
              </address>
            </div>

            <div className="confirmation__actions">
              <Link to="/shop" className="btn btn--lg">
                Continue shopping
              </Link>
              <Link to="/" className="btn btn--secondary btn--lg">
                Back to home
              </Link>
            </div>
          </div>

          <aside className="confirmation__summary">
            <OrderSummary
              totals={order.totals}
              items={order.items}
              title="Order details"
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
