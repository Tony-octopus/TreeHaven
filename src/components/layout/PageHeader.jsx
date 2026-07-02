import './PageHeader.css'

/** Consistent page banner used by the content pages (About, Contact, FAQ...). */
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="page-header">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="lede page-header__subtitle">{subtitle}</p>}
        {children}
      </div>
    </header>
  )
}
