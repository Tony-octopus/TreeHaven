import { useEffect, useMemo, useReducer } from 'react'
import { CartContext } from './CartContext'
import { getProductById } from '../data/products'

/**
 * Cart state management.
 *
 * The cart is persisted to localStorage as a minimal list of `{ id, quantity }`
 * entries. Full product details (price, stock, artwork) are resolved from the
 * catalog at render time, which keeps the stored data small and always in sync
 * with the current catalog.
 */

const STORAGE_KEY = 'treehaven.cart.v1'

/** Clamp a requested quantity to the valid range for a product. */
function clampQuantity(quantity, stock) {
  const max = Number.isFinite(stock) ? stock : Infinity
  const value = Math.floor(Number(quantity))
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(value, 1), Math.max(max, 1))
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const product = getProductById(action.id)
      if (!product || product.stock <= 0) return state

      const existing = state.find((entry) => entry.id === action.id)
      const requested = (existing?.quantity ?? 0) + (action.quantity ?? 1)
      const quantity = clampQuantity(requested, product.stock)

      if (existing) {
        return state.map((entry) =>
          entry.id === action.id ? { ...entry, quantity } : entry,
        )
      }
      return [...state, { id: action.id, quantity }]
    }

    case 'SET_QUANTITY': {
      const product = getProductById(action.id)
      if (!product) return state.filter((entry) => entry.id !== action.id)
      const quantity = clampQuantity(action.quantity, product.stock)
      return state.map((entry) =>
        entry.id === action.id ? { ...entry, quantity } : entry,
      )
    }

    case 'REMOVE':
      return state.filter((entry) => entry.id !== action.id)

    case 'CLEAR':
      return []

    default:
      return state
  }
}

/** Read and sanitize the persisted cart. Invalid entries are dropped. */
function loadInitialCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((entry) => entry && typeof entry.id === 'string')
      .map((entry) => {
        const product = getProductById(entry.id)
        if (!product) return null
        return { id: entry.id, quantity: clampQuantity(entry.quantity, product.stock) }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [entries, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {
      /* storage may be unavailable (private mode) — fail silently */
    }
  }, [entries])

  const value = useMemo(() => {
    // Resolve stored entries into rich line items, dropping any missing products.
    const items = entries
      .map((entry) => {
        const product = getProductById(entry.id)
        if (!product) return null
        return {
          ...product,
          quantity: entry.quantity,
          lineTotal: product.price * entry.quantity,
        }
      })
      .filter(Boolean)

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)

    return {
      items,
      itemCount,
      subtotal,
      isEmpty: items.length === 0,
      addItem: (id, quantity = 1) => dispatch({ type: 'ADD', id, quantity }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQuantity: (id, quantity) =>
        dispatch({ type: 'SET_QUANTITY', id, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }
  }, [entries])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
