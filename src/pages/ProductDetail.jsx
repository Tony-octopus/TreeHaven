import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/product/ProductImage'
import ProductGrid from '../components/product/ProductGrid'
import StarRating from '../components/ui/StarRating'
import QuantityStepper from '../components/ui/QuantityStepper'
import {
  ChevronRight,
  CheckIcon,
  SunIcon,
  DropIcon,
  SproutIcon,
  RulerIcon,
  TruckIcon,
  ShieldIcon,
} from '../components/ui/Icons'
import { useCart } from '../context/CartContext'
import {
  getProductById,
  getRelatedProducts,
  categoryMap,
} from '../data/products'
import { formatCurrency, titleCase } from '../utils/format'
import { FREE_SHIPPING_THRESHOLD } from '../utils/pricing'
import './ProductDetail.css'

const CARE_ICONS = {
  light: SunIcon,
  water: DropIcon,
  difficulty: SproutIcon,
  size: RulerIcon,
}

const CARE_LABELS = {
  light: 'Light',
  water: 'Water',
  difficulty: 'Care level',
  size: 'Size',
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const timeoutRef = useRef(null)

  // Reset selection when navigating between products.
  useEffect(() => {
    setQuantity(1)
    setAdded(false)
  }, [id])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  if (!product) {
    return (
      <div className="container detail-missing">
        <h1>Product not found</h1>
        <p className="text-muted">
          We couldn’t find the product you were looking for. It may have sold out
          or been renamed.
        </p>
        <Link to="/shop" className="btn">
          Back to shop
        </Link>
      </div>
    )
  }

  const category = categoryMap[product.category]
  const outOfStock = product.stock <= 0
  const lowStock = !outOfStock && product.stock <= 5
  const related = getRelatedProducts(product, 4)

  const handleAddToCart = () => {
    if (outOfStock) return
    addItem(product.id, quantity)
    setAdded(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="detail">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol role="list">
            <li>
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
            </li>
            <li>
              <Link to="/shop">Shop</Link>
              <ChevronRight size={14} />
            </li>
            <li>
              <Link to={`/shop?category=${product.category}`}>{category?.name}</Link>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="detail__grid">
          <div className="detail__media card">
            <ProductImage product={product} />
          </div>

          <div className="detail__info">
            <Link to={`/shop?category=${product.category}`} className="detail__category">
              {category?.name}
            </Link>
            <h1 className="detail__title">{product.name}</h1>

            <div className="detail__meta">
              <StarRating rating={product.rating} reviews={product.reviews} size={18} />
              {product.badges?.includes('bestseller') && (
                <span className="badge badge--accent">Bestseller</span>
              )}
            </div>

            <p className="detail__price price">{formatCurrency(product.price)}</p>

            <p className="detail__description">{product.description}</p>

            <div className="detail__stock">
              {outOfStock ? (
                <span className="badge badge--danger">Sold out</span>
              ) : lowStock ? (
                <span className="badge badge--danger">
                  Only {product.stock} left in stock
                </span>
              ) : (
                <span className="badge">
                  <CheckIcon size={14} /> In stock
                </span>
              )}
            </div>

            <div className="detail__buy">
              <QuantityStepper
                value={quantity}
                min={1}
                max={Math.max(product.stock, 1)}
                onChange={setQuantity}
                label={`Quantity of ${product.name}`}
              />
              <button
                type="button"
                className="btn btn--lg detail__add"
                onClick={handleAddToCart}
                disabled={outOfStock}
                aria-disabled={outOfStock}
              >
                {added ? (
                  <>
                    <CheckIcon size={18} /> Added to cart
                  </>
                ) : outOfStock ? (
                  'Out of stock'
                ) : (
                  `Add to cart · ${formatCurrency(product.price * quantity)}`
                )}
              </button>
            </div>

            {added && (
              <p className="detail__added" role="status">
                Added to your cart.{' '}
                <Link to="/cart">View cart &amp; check out →</Link>
              </p>
            )}

            {/* Care / product specs */}
            {product.care ? (
              <ul className="care-grid" role="list">
                {Object.entries(product.care).map(([key, value]) => {
                  const Icon = CARE_ICONS[key] ?? SproutIcon
                  return (
                    <li key={key} className="care-grid__item">
                      <span className="care-grid__icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="care-grid__label">
                          {CARE_LABELS[key] ?? titleCase(key)}
                        </span>
                        <span className="care-grid__value">{value}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              product.attributes && (
                <ul className="spec-list" role="list">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key}>
                      <span className="spec-list__key">{titleCase(key)}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              )
            )}

            <ul className="detail__assurances" role="list">
              <li>
                <TruckIcon size={20} /> Free shipping over{' '}
                {formatCurrency(FREE_SHIPPING_THRESHOLD)}
              </li>
              <li>
                <ShieldIcon size={20} /> 30-day thrive guarantee
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="detail__related">
            <div className="section__head">
              <h2>You may also like</h2>
              <Link to="/shop" className="section__link">
                Shop all <ChevronRight size={16} />
              </Link>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  )
}
