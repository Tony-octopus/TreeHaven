import { createContext, useContext } from 'react'

/**
 * Cart context object and consumer hook. Kept separate from the provider so this
 * module exports only non-component values (better HMR / fast-refresh support).
 */
export const CartContext = createContext(null)

/** Access the cart. Throws if used outside <CartProvider /> to catch bugs early. */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a <CartProvider>')
  }
  return context
}
