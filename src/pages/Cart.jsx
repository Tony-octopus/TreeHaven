import { Link } from 'react-router-dom'
import ProductImage from '../components/product/ProductImage'
import OrderSummary from '../components/cart/OrderSummary'
import QuantityStepper from '../components/ui/QuantityStepper'
import { TrashIcon, ArrowRight, TruckIcon } from '../components/ui/Icons'
import { useCart } from '../context/CartContext'
import { categoryMap } from '../data/products'
import { formatCurrency, pluralize } from '../utils/format'
import { computeTotals, FREE_SHIPPING_THRESHOLD } from '../utils/pricing'
import './Cart.css'

export default function Cart() {
  const { items, itemCount, subtotal, isEmpty, setQuantity, removeItem, clearCart } =
    useCart()
  const totals = computeTotals(subtotal)

  if (isEmpty) {
    return (
      <div className="container cart cart--empty">
        <div className="empty-state">
          <svg className="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1>Your cart is empty</h1>
          <p className="text-muted">
            Once you add trees or supplies, they’ll appear here — ready for a
            quick, secure checkout.
          </p>
          <Link to="/shop" className="btn btn--lg">
            Start shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  )

  return (
    <div className="cart">
      <div className="container">
        <header className="cart__header">
          <h1>Your cart</h1>
          <p className="text-muted">{pluralize(itemCount, 'item')}</p>
        </header>

        <div className="cart__layout">
          <section className="cart__items" aria-label="Cart items">
            {!totals.qualifiesForFreeShipping && (
              <div className="cart__shipping-nudge card">
                <TruckIcon size={20} />
                <div>
                  <p>
                    You’re <strong>{formatCurrency(totals.freeShippingRemaining)}</strong>{' '}
                    away from <strong>free shipping</strong>.
                  </p>
                  <div
                    className="cart__progress"
                    role="progressbar"
                    aria-valuenow={freeShippingProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${freeShippingProgress}%` }} />
                  </div>
                </div>
              </div>
            )}

            <ul className="cart__list" role="list">
              {items.map((item) => (
                <li key={item.id} className="cart-line">
                  <Link to={`/product/${item.id}`} className="cart-line__media">
                    <ProductImage product={item} />
                  </Link>

                  <div className="cart-line__info">
                    <div className="cart-line__head">
                      <div>
                        <span className="cart-line__category text-muted">
                          {categoryMap[item.category]?.name}
                        </span>
                        <h2 className="cart-line__name">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h2>
                      </div>
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>

                    <div className="cart-line__foot">
                      <QuantityStepper
                        value={item.quantity}
                        min={1}
                        max={Math.max(item.stock, 1)}
                        onChange={(quantity) => setQuantity(item.id, quantity)}
                        label={`Quantity of ${item.name}`}
                        size="sm"
                      />
                      <div className="cart-line__pricing">
                        <span className="price cart-line__total">
                          {formatCurrency(item.lineTotal)}
                        </span>
                        <span className="cart-line__each text-muted">
                          {formatCurrency(item.price)} each
                        </span>
                      </div>
                    </div>
                    {item.quantity >= item.stock && (
                      <p className="cart-line__limit text-muted">
                        Max available quantity reached.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart__actions">
              <Link to="/shop" className="btn btn--secondary">
                Continue shopping
              </Link>
              <button type="button" className="btn btn--ghost cart__clear" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </section>

          <aside className="cart__summary">
            <OrderSummary totals={totals}>
              <Link to="/checkout" className="btn btn--lg btn--block">
                Proceed to checkout <ArrowRight size={18} />
              </Link>
              <p className="order-summary__note text-muted">
                Taxes calculated at checkout. Secure, encrypted payment.
              </p>
            </OrderSummary>
          </aside>
        </div>
      </div>
    </div>
  )
}
