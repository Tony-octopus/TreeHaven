import { Link } from 'react-router-dom'
import ProductImage from '../components/product/ProductImage'
import { getProductById } from '../data/products'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="container not-found">
      <div className="not-found__art" aria-hidden="true">
        <ProductImage product={getProductById('bonsai-juniper')} />
      </div>
      <span className="eyebrow">Error 404</span>
      <h1>This path is a little overgrown</h1>
      <p className="lede text-muted">
        The page you’re looking for doesn’t exist or may have been moved. Let’s
        get you back to greener pastures.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--lg">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn--secondary btn--lg">
          Browse the shop
        </Link>
      </div>
    </div>
  )
}
