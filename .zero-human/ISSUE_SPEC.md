# AKA-74: E-commerce Store

## ⚠️ Agent Implementation Directive

**You MUST build the COMPLETE, FULLY WORKING application described below.**

* Write ALL source code files needed to run this project (components, pages, API routes, styles, config, tests)
* Do NOT create only documentation, markdown files, README updates, or empty scaffold folders
* Do NOT leave placeholder comments like `// TODO: implement this` — write the actual implementation
* The project MUST be runnable with `npm run dev` (or the specified command) after your PR is merged
* Every acceptance criterion listed below must pass when a human tests the running app
* If an API key or env var is needed, include a `.env.example` AND fallback/mock data so the app works without it
* Commit ALL necessary files: package.json, all source files, config files, public assets

**This is a full project build, not a documentation task.**

## Problem / Overview

A complete online store with product browsing and checkout functionality. The product catalog is sourced from a static JSON file, with the cart data stored in localStorage. The store includes a Stripe-ready checkout form.

## Pages / Routes

* `/` — Displays a hero section and featured products.
* `/products` — Displays a grid of products with filter and sort functionality.
* `/products/[id]` — Displays product details and an 'add to cart' option.
* `/cart` — Displays cart items and a summary of the cart.
* `/checkout` — Displays an address and payment form.
* `/order-success` — Displays a confirmation of a successful order.

## Data Sources

* Product JSON — fallback: Static product JSON

## Tech Stack & Solution

Next.js 14 App Router + TypeScript + Tailwind CSS

## Acceptance Criteria

1. npm run dev starts the app on localhost:3000 without errors
2. Home page (/) renders hero banner and at least 4 featured products
3. Products page (/products) displays a grid of products with filter and sort functionality
4. Product Detail page (/products/\[id]) displays product details and an 'add to cart' option
5. Cart page (/cart) displays cart items and a summary of the cart
6. Checkout page (/checkout) displays an address and payment form
7. Order Success page (/order-success) displays a confirmation of a successful order

## Components to Build

* Navbar with cart count
* ProductCard
* ProductGrid
* FilterSidebar
* CartItem
* CheckoutForm

## Integrations / APIs

* Product JSON

## Implementation Notes

Dev: npm run dev
Build: npm run build
Install: npm install

User Stories:

1. As an online shopper, I want to browse products so I can select items to purchase.
2. As an online shopper, I want to add items to my cart so I can purchase them later.
3. As an online shopper, I want to checkout so I can complete my purchase.

***

## Definition of Done

* [ ] `npm run dev` (or equivalent) starts the app without errors
* [ ] `npm run build` completes without errors
* [ ] All routes/pages listed in the spec render correctly
* [ ] All acceptance criteria above pass when tested in browser
* [ ] No files are empty placeholders — all source code is written
* [ ] `.env.example` exists if any environment variables are needed
