# 🌳 TreeHaven

A tree-themed e-commerce storefront built with **React + Vite**. TreeHaven sells
indoor & outdoor trees, fruit trees, bonsai, and tree-care supplies, with a
complete browse → cart → checkout flow. This is a **front-end only** project —
all data is mocked locally and orders are simulated (no backend, no real
payments).

## ✨ Features

- **Storefront** — home page with hero, featured categories, and best-sellers.
- **Shop** — responsive product grid with URL-driven **search, category
  filtering, care-level filtering, availability filter, and sorting**.
- **Product detail** — imagery, care specs, stock status, quantity selection,
  add-to-cart, and related products.
- **Cart** — add / remove / update quantities with validation, live subtotal,
  free-shipping progress, and **persistence across refreshes** (localStorage).
- **Checkout** — contact, shipping, optional separate billing, and simulated
  payment, all with **client-side validation** (email, ZIP, card Luhn check,
  expiry). Places an order and shows a **confirmation page**.
- **Content pages** — About, Contact (validated form), FAQ, and a 404 page.
- **Branding & UX** — cohesive forest/sage/earthy theme, self-contained SVG
  product illustrations (no external images), accessible markup, and a
  responsive layout with a mobile nav and filter drawer.

## 🧱 Tech stack

- React 19 + Vite
- React Router for client-side routing
- React Context + `useReducer` for cart state
- Plain CSS with design tokens (CSS custom properties)
- Oxlint for linting

## 🗂️ Project structure

```
src/
  components/
    cart/        OrderSummary
    layout/      Layout, Navbar, Footer, PageHeader, ScrollToTop
    product/     ProductCard, ProductGrid, ProductImage (SVG art)
    ui/          Icons, StarRating, QuantityStepper, FormField
  context/       CartContext (hook) + CartProvider (state)
  data/          products.js (catalog + selectors)
  pages/         Home, Shop, ProductDetail, Cart, Checkout,
                 OrderConfirmation, About, Contact, FAQ, NotFound
  utils/         format, pricing, validation
  index.css      design system (tokens, reset, UI primitives)
  App.jsx        routes
  main.jsx       app entry (Router + CartProvider)
```

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run oxlint
```

Then open the printed local URL (default http://localhost:5173).

## 🧪 Demo checkout

The checkout is simulated. Use test card `4242 4242 4242 4242`, any future
expiry (MM/YY), and any 3–4 digit CVC. No data leaves the browser.
