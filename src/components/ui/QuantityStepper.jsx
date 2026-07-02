import { MinusIcon, PlusIcon } from './Icons'
import './QuantityStepper.css'

/**
 * Accessible quantity control with decrement / input / increment.
 * Enforces integer values within [min, max]; typing is clamped on change.
 */
export default function QuantityStepper({
  value,
  min = 1,
  max = Infinity,
  onChange,
  label = 'Quantity',
  size = 'md',
}) {
  const clamp = (next) => Math.min(Math.max(Math.floor(next), min), max)

  const setValue = (next) => {
    const parsed = Number(next)
    if (!Number.isFinite(parsed)) return
    onChange(clamp(parsed))
  }

  return (
    <div className={`qty qty--${size}`} role="group" aria-label={label}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => setValue(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon size={16} />
      </button>
      <input
        className="qty__input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        aria-label={label}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '')
          if (digits === '') {
            onChange(min)
            return
          }
          setValue(digits)
        }}
        onBlur={(event) => {
          if (event.target.value.trim() === '') setValue(min)
        }}
      />
      <button
        type="button"
        className="qty__btn"
        onClick={() => setValue(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  )
}
