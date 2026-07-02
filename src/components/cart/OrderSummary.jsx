import ProductImage from '../product/ProductImage'
import { formatCurrency } from '../../utils/format'
import './OrderSummary.css'

/**
 * Shared order totals panel used on both the cart and checkout pages.
 * Optionally lists the line items; `children` renders below the totals
 * (e.g. the checkout button or fine print).
 */
export default function OrderSummary({
  totals,
  items,
  title = 'Order summary',
  children,
}) {
  return (
    <div className="order-summary card">
      <h2 className="order-summary__title">{title}</h2>

      {items && (
        <ul className="order-summary__items" role="list">
          {items.map((item) => (
            <li key={item.id} className="order-summary__item">
              <span className="order-summary__thumb" aria-hidden="true">
                <ProductImage product={item} />
                <span className="order-summary__qty">{item.quantity}</span>
              </span>
              <span className="order-summary__name">{item.name}</span>
              <span className="price">{formatCurrency(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="order-summary__rows">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(totals.subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}</dd>
        </div>
        <div>
          <dt>Estimated tax</dt>
          <dd>{formatCurrency(totals.tax)}</dd>
        </div>
        <div className="order-summary__total">
          <dt>Total</dt>
          <dd>{formatCurrency(totals.total)}</dd>
        </div>
      </dl>

      {children}
    </div>
  )
}
