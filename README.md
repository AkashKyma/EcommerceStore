# AKA-74 E-commerce Store

A polished Next.js 14 storefront built for ticket **AKA-74**. The app uses the App Router, TypeScript, and Tailwind CSS to deliver a complete browse-to-checkout flow backed by static product JSON and a cart persisted in `localStorage`.

## Feature Overview

This project implements a complete mock e-commerce experience with:

- Hero-driven landing page on `/`
- Featured products section with at least 4 highlighted items
- Product catalog page on `/products`
- Filter and sort controls for product browsing
- Product detail pages on `/products/[id]`
- Add-to-cart flow with persistent cart state
- Cart review page on `/cart`
- Checkout page on `/checkout`
- Stripe-ready mock payment form for future live integration
- Order confirmation page on `/order-success`

## What Was Built for AKA-74

### Pages and routes

- `/` — Hero section plus featured products
- `/products` — Product grid with filtering and sorting
- `/products/[id]` — Product details and purchase controls
- `/cart` — Cart line items, shipping, tax, and totals
- `/checkout` — Shipping address form and mock payment form
- `/order-success` — Post-checkout confirmation screen

### Core components

- `Navbar` with cart count
- `ProductCard`
- `ProductGrid`
- `FilterSidebar`
- `CartItem`
- `CheckoutForm`
- Cart state provider for client-side persistence

### Data and checkout behavior

- Product catalog sourced from `data/products.json`
- Cart data stored locally in the browser with `localStorage`
- Shipping logic includes free shipping over `$100`
- Checkout is implemented as a mock Stripe-ready form, with clear upgrade space for Stripe Elements or hosted checkout later

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Static JSON product catalog
- Client-side cart persistence via `localStorage`

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open <http://localhost:3000>.

### Production build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

## Project Notes

- No external API keys are required for the current implementation.
- The catalog works from bundled static JSON fallback data.
- The checkout form is intentionally mock/Stripe-ready rather than connected to live payment processing.

## Acceptance Criteria Coverage

This implementation is intended to satisfy the ticket requirements:

1. `npm run dev` starts the app on `localhost:3000`
2. `/` renders a hero banner and at least 4 featured products
3. `/products` provides a product grid with filter and sort functionality
4. `/products/[id]` shows product details and add-to-cart controls
5. `/cart` shows cart items and an order summary
6. `/checkout` shows shipping and payment form fields
7. `/order-success` shows successful order confirmation

## Repository Structure

```text
app/
  cart/page.tsx
  checkout/page.tsx
  order-success/page.tsx
  page.tsx
  products/page.tsx
  products/[id]/page.tsx
components/
  CartItem.tsx
  CartProvider.tsx
  CheckoutForm.tsx
  FilterSidebar.tsx
  Navbar.tsx
  ProductCard.tsx
  ProductGrid.tsx
  ProductPurchasePanel.tsx
data/
  products.json
src/
  cart-utils.ts
  products.ts
  types.ts
```

## Handoff

Documentation for release and PR preparation is captured in:

- `README.md`
- `CHANGELOG.md`
- `docs/IMPLEMENTATION_NOTES.md`
