import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import StarRating from '../ui/StarRating'
import { CheckIcon, PlusIcon } from '../ui/Icons'
import { useCart } from '../../context/CartContext'
import { categoryMap } from '../../data/products'
import { formatCurrency } from '../../utils/format'
import './ProductCard.css'

/** A product tile used in grids across the storefront. */
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const timeoutRef = useRef(null)

  const outOfStock = product.stock <= 0
  const lowStock = !outOfStock && product.stock <= 5
  const category = categoryMap[product.category]

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const handleAdd = () => {
    if (outOfStock) return
    addItem(product.id, 1)
    setJustAdded(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <article className="product-card card">
      <Link
        to={`/product/${product.id}`}
        className="product-card__media"
        aria-label={`View ${product.name}`}
      >
        <ProductImage product={product} />
        <span className="product-card__badges">
          {product.badges?.includes('bestseller') && (
            <span className="badge badge--accent">Bestseller</span>
          )}
          {product.badges?.includes('new') && <span className="badge">New</span>}
          {outOfStock ? (
            <span className="badge badge--danger">Sold out</span>
          ) : (
            lowStock && <span className="badge badge--danger">Only {product.stock} left</span>
          )}
        </span>
      </Link>

      <div className="product-card__body">
        {category && (
          <span className="product-card__category text-muted">{category.name}</span>
        )}
        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="product-card__foot">
          <span className="price product-card__price">
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            className="btn btn--sm product-card__add"
            onClick={handleAdd}
            disabled={outOfStock}
            aria-disabled={outOfStock}
          >
            {justAdded ? (
              <>
                <CheckIcon size={16} /> Added
              </>
            ) : (
              <>
                <PlusIcon size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
