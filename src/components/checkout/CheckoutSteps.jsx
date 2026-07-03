import { CheckIcon } from '../ui/Icons'
import './CheckoutSteps.css'

/**
 * Macro progress indicator for the purchase ("follow instructions") flow:
 * Cart → Checkout → Confirmation. Clearly communicates which steps are done,
 * which is current, and which remain — satisfying "visibility of system status".
 */
const STEPS = [
  { id: 'cart', label: 'Cart' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'confirmation', label: 'Confirmation' },
]

export default function CheckoutSteps({ current }) {
  const currentIndex = STEPS.findIndex((step) => step.id === current)

  return (
    <nav className="checkout-steps" aria-label="Checkout progress">
      <ol className="checkout-steps__list" role="list">
        {STEPS.map((step, index) => {
          const state =
            index < currentIndex
              ? 'done'
              : index === currentIndex
                ? 'current'
                : 'upcoming'

          return (
            <li
              key={step.id}
              className={`checkout-steps__step checkout-steps__step--${state}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <span className="checkout-steps__marker" aria-hidden="true">
                {state === 'done' ? <CheckIcon size={16} /> : index + 1}
              </span>
              <span className="checkout-steps__label">
                {step.label}
                <span className="visually-hidden">
                  {state === 'done'
                    ? ' — completed'
                    : state === 'current'
                      ? ' — current step'
                      : ' — not yet started'}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
