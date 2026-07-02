/**
 * Lightweight, dependency-free validation helpers for the checkout and contact
 * forms. Each validator returns an error string when invalid, or an empty
 * string when the value passes.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ZIP_RE = /^\d{5}(-\d{4})?$/
// Accept spaces/dashes; 13–19 digits covers the common card networks.
const CARD_RE = /^\d{13,19}$/
const EXPIRY_RE = /^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/
const CVC_RE = /^\d{3,4}$/

export function required(value, label = 'This field') {
  return value?.toString().trim() ? '' : `${label} is required.`
}

export function validateEmail(value) {
  if (!value?.trim()) return 'Email is required.'
  return EMAIL_RE.test(value.trim()) ? '' : 'Enter a valid email address.'
}

export function validateZip(value) {
  if (!value?.trim()) return 'ZIP / postal code is required.'
  return ZIP_RE.test(value.trim()) ? '' : 'Enter a valid 5-digit ZIP code.'
}

export function validatePhone(value, { requiredField = false } = {}) {
  const digits = value?.replace(/\D/g, '') ?? ''
  if (!digits) return requiredField ? 'Phone number is required.' : ''
  return digits.length >= 10 ? '' : 'Enter a valid phone number.'
}

export function validateCardNumber(value) {
  const digits = value?.replace(/[\s-]/g, '') ?? ''
  if (!digits) return 'Card number is required.'
  if (!CARD_RE.test(digits)) return 'Enter a valid card number.'
  return luhnCheck(digits) ? '' : 'That card number looks invalid.'
}

export function validateExpiry(value) {
  if (!value?.trim()) return 'Expiry date is required.'
  const match = value.trim().match(EXPIRY_RE)
  if (!match) return 'Use MM/YY format.'
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const expiry = new Date(year, month, 1) // first day of month AFTER expiry
  return expiry > new Date() ? '' : 'This card has expired.'
}

export function validateCvc(value) {
  if (!value?.trim()) return 'CVC is required.'
  return CVC_RE.test(value.trim()) ? '' : 'Enter a 3–4 digit CVC.'
}

/**
 * Luhn checksum used by real card networks. This is a validity check only —
 * no card data ever leaves the browser in this demo store.
 */
export function luhnCheck(digits) {
  let sum = 0
  let shouldDouble = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i])
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

/** Run a map of `{ field: validatorResult }` and return only the errors. */
export function collectErrors(results) {
  return Object.fromEntries(
    Object.entries(results).filter(([, message]) => Boolean(message)),
  )
}
