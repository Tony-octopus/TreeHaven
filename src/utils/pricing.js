/**
 * Central pricing rules for the store, so the cart, checkout, and confirmation
 * pages all agree on how totals are calculated.
 */

export const FREE_SHIPPING_THRESHOLD = 150
export const SHIPPING_FLAT = 14.95
export const TAX_RATE = 0.07 // 7% simulated sales tax

/** Round to cents to avoid floating-point drift in displayed totals. */
function toCents(value) {
  return Math.round(value * 100) / 100
}

/**
 * Compute an order breakdown from a subtotal.
 * Shipping is free at/above the threshold; otherwise a flat rate applies.
 * An empty cart (subtotal 0) has no shipping or tax.
 */
export function computeTotals(subtotal) {
  const safeSubtotal = Number.isFinite(subtotal) && subtotal > 0 ? subtotal : 0
  const qualifiesForFreeShipping = safeSubtotal >= FREE_SHIPPING_THRESHOLD
  const shipping =
    safeSubtotal === 0 || qualifiesForFreeShipping ? 0 : SHIPPING_FLAT
  const tax = toCents(safeSubtotal * TAX_RATE)
  const total = toCents(safeSubtotal + shipping + tax)

  return {
    subtotal: toCents(safeSubtotal),
    shipping,
    tax,
    total,
    qualifiesForFreeShipping,
    freeShippingRemaining: qualifiesForFreeShipping
      ? 0
      : toCents(FREE_SHIPPING_THRESHOLD - safeSubtotal),
  }
}
