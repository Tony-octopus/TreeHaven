/** Formatting helpers shared across the app. */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/**
 * Format a number as USD currency, e.g. 89 -> "$89.00".
 * Falls back gracefully for non-numeric input.
 */
export function formatCurrency(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return currencyFormatter.format(0)
  return currencyFormatter.format(amount)
}

/** Pluralize a noun based on a count: pluralize(1, 'item') -> "1 item". */
export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

/** Human-readable category/word capitalization. */
export function titleCase(value = '') {
  return value.replace(/\b\w/g, (char) => char.toUpperCase())
}
