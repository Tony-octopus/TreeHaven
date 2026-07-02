import ProductCard from './ProductCard'
import './ProductGrid.css'

/** Responsive grid of product cards with a graceful empty state. */
export default function ProductGrid({ products, emptyMessage = 'No products found.' }) {
  if (!products?.length) {
    return <p className="product-grid__empty text-muted">{emptyMessage}</p>
  }

  return (
    <ul className="product-grid" role="list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
