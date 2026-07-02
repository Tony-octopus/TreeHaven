import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { SearchIcon, CloseIcon } from '../components/ui/Icons'
import { products, categories, categoryMap } from '../data/products'
import { pluralize } from '../utils/format'
import './Shop.css'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'name', label: 'Name: A–Z' },
]

const DIFFICULTY_OPTIONS = ['Easy', 'Moderate', 'Advanced']

function sortProducts(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        const aBest = a.badges?.includes('bestseller') ? 1 : 0
        const bBest = b.badges?.includes('bestseller') ? 1 : 0
        if (aBest !== bBest) return bBest - aBest
        return b.rating - a.rating
      })
  }
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = searchParams.get('category') ?? 'all'
  const search = searchParams.get('search') ?? ''
  const sort = searchParams.get('sort') ?? 'featured'
  const difficulty = searchParams.get('difficulty') ?? 'all'
  const inStockOnly = searchParams.get('stock') === 'in'

  const activeCategory = categoryMap[category] ? category : 'all'

  /** Merge a set of param updates into the URL, dropping empty/default values. */
  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'all' || value === false) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    setSearchParams(next, { replace: true })
  }

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    const filtered = products.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false
      }
      if (difficulty !== 'all' && product.care?.difficulty !== difficulty) {
        return false
      }
      if (inStockOnly && product.stock <= 0) {
        return false
      }
      if (term) {
        const haystack = `${product.name} ${product.description} ${
          categoryMap[product.category]?.name ?? ''
        }`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    })
    return sortProducts(filtered, sort)
  }, [activeCategory, difficulty, inStockOnly, search, sort])

  const hasActiveFilters =
    activeCategory !== 'all' || difficulty !== 'all' || inStockOnly || search.trim()

  return (
    <div className="shop">
      <div className="container">
        <header className="shop__header">
          <span className="eyebrow">Shop</span>
          <h1>
            {activeCategory === 'all'
              ? 'All trees & supplies'
              : categoryMap[activeCategory].name}
          </h1>
          <p className="text-muted">
            {activeCategory === 'all'
              ? 'Browse our full nursery — indoor and outdoor trees, fruit trees, bonsai, and care essentials.'
              : categoryMap[activeCategory].description}
          </p>
        </header>

        <div className="shop__toolbar">
          <form
            className="shop__search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <SearchIcon size={18} />
            <input
              type="search"
              className="shop__search-input"
              placeholder="Search products"
              aria-label="Search products"
              value={search}
              onChange={(event) => updateParams({ search: event.target.value })}
            />
          </form>

          <div className="shop__toolbar-right">
            <button
              type="button"
              className="btn btn--secondary shop__filter-toggle"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              Filters
            </button>
            <label className="shop__sort">
              <span className="visually-hidden">Sort products</span>
              <select
                className="select"
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="shop__layout">
          <aside
            className={`shop__filters${filtersOpen ? ' shop__filters--open' : ''}`}
            aria-label="Product filters"
          >
            <div className="shop__filters-head">
              <h2>Filters</h2>
              <button
                type="button"
                className="btn btn--ghost shop__filters-close"
                onClick={() => setFiltersOpen(false)}
              >
                <CloseIcon size={20} />
                <span className="visually-hidden">Close filters</span>
              </button>
            </div>

            <fieldset className="filter-group">
              <legend>Category</legend>
              <ul role="list">
                <li>
                  <button
                    type="button"
                    className={`filter-pill${activeCategory === 'all' ? ' filter-pill--active' : ''}`}
                    onClick={() => updateParams({ category: 'all' })}
                  >
                    All products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`filter-pill${activeCategory === cat.id ? ' filter-pill--active' : ''}`}
                      onClick={() => updateParams({ category: cat.id })}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="filter-group">
              <legend>Care level</legend>
              <label className="filter-radio">
                <input
                  type="radio"
                  name="difficulty"
                  checked={difficulty === 'all'}
                  onChange={() => updateParams({ difficulty: 'all' })}
                />
                <span>Any level</span>
              </label>
              {DIFFICULTY_OPTIONS.map((level) => (
                <label key={level} className="filter-radio">
                  <input
                    type="radio"
                    name="difficulty"
                    checked={difficulty === level}
                    onChange={() => updateParams({ difficulty: level })}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="filter-group">
              <legend>Availability</legend>
              <label className="filter-check">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) =>
                    updateParams({ stock: event.target.checked ? 'in' : false })
                  }
                />
                <span>In stock only</span>
              </label>
            </fieldset>

            {hasActiveFilters && (
              <button
                type="button"
                className="btn btn--ghost shop__clear"
                onClick={() =>
                  setSearchParams(new URLSearchParams(), { replace: true })
                }
              >
                Clear all filters
              </button>
            )}
          </aside>

          <section className="shop__results" aria-live="polite">
            <p className="shop__count text-muted">
              {pluralize(visibleProducts.length, 'product')}
              {activeCategory !== 'all' && ` in ${categoryMap[activeCategory].name}`}
            </p>
            <ProductGrid
              products={visibleProducts}
              emptyMessage="No products match your filters. Try broadening your search."
            />
          </section>
        </div>
      </div>

      {filtersOpen && (
        <button
          type="button"
          className="shop__backdrop"
          aria-label="Close filters"
          onClick={() => setFiltersOpen(false)}
        />
      )}
    </div>
  )
}
