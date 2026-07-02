import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { CartIcon, LeafLogo, MenuIcon, CloseIcon, SearchIcon } from '../ui/Icons'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchInputRef = useRef(null)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleSearch = (event) => {
    event.preventDefault()
    const query = search.trim()
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop')
    setSearch('')
    searchInputRef.current?.blur()
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="TreeHaven home">
          <span className="navbar__logo" aria-hidden="true">
            <LeafLogo size={26} />
          </span>
          <span className="navbar__wordmark">TreeHaven</span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <form className="navbar__search" role="search" onSubmit={handleSearch}>
          <SearchIcon size={18} className="navbar__search-icon" />
          <input
            ref={searchInputRef}
            type="search"
            className="navbar__search-input"
            placeholder="Search trees & supplies"
            aria-label="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>

        <div className="navbar__actions">
          <Link to="/cart" className="navbar__cart" aria-label={`Cart, ${itemCount} items`}>
            <CartIcon size={22} />
            {itemCount > 0 && (
              <span className="navbar__cart-count" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            <span className="visually-hidden">
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        hidden={!menuOpen}
      >
        <div className="container">
          <form className="navbar__mobile-search" role="search" onSubmit={handleSearch}>
            <SearchIcon size={18} className="navbar__search-icon" />
            <input
              type="search"
              className="navbar__search-input"
              placeholder="Search trees & supplies"
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
          <ul role="list" className="navbar__mobile-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
