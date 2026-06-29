# AKA-74 — Architect Plan

Role: Architect
Ticket: AKA-74 — E-commerce Store
Phase: PLAN_DESIGN only
Status: Ready for Grunt handoff

## Repo / Stack Assessment

Current repository is effectively empty scaffold:
- `README.md` only contains project name
- no `package.json`
- no Next.js app structure exists yet
- no Tailwind or TypeScript config exists yet

Recommended stack to implement:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- local static JSON product catalog
- client-side cart state persisted to `localStorage`
- no backend required for acceptance criteria
- checkout form should be Stripe-ready in structure, but use a non-live mock submit path so app works without API keys

## Acceptance Criteria Mapping

1. `npm run dev` starts cleanly
   - Requires full Next.js app scaffold with valid scripts/config
2. `/` hero + at least 4 featured products
   - use featured flag in product JSON
3. `/products` product grid + filter + sort
   - category filter, price/rating sort, maybe search if time permits
4. `/products/[id]` product detail + add to cart
   - dynamic route from static catalog
5. `/cart` cart items + summary
   - subtotal, shipping placeholder/free threshold, total
6. `/checkout` address + payment form
   - client form with card-like inputs; Stripe-ready UX but local mock completion
7. `/order-success` success confirmation
   - display order summary from query/local state fallback

## Proposed File / Directory Plan

```txt
app/
  layout.tsx
  globals.css
  page.tsx
  products/
    page.tsx
    [id]/page.tsx
  cart/page.tsx
  checkout/page.tsx
  order-success/page.tsx
  not-found.tsx
components/
  layout/
    Navbar.tsx
    Footer.tsx
  products/
    ProductCard.tsx
    ProductGrid.tsx
    FilterSidebar.tsx
    QuantitySelector.tsx
  cart/
    CartItem.tsx
    CartSummary.tsx
  checkout/
    CheckoutForm.tsx
  ui/
    Button.tsx
    Badge.tsx
    Input.tsx
    Select.tsx
lib/
  products.ts
  cart.ts
  currency.ts
  utils.ts
  constants.ts
context/
  CartContext.tsx
hooks/
  useCart.ts
  useLocalStorage.ts
data/
  products.json
public/
  products/... optional images or inline remote-free placeholders
package.json
next.config.js|mjs
tsconfig.json
tailwind.config.ts
postcss.config.js
.env.example
```

## Data Model Plan

Use `data/products.json` as source of truth.

Suggested product shape:

```ts
interface Product {
  id: string;
  slug?: string; // optional, but id alone is enough for route
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  image: string;
  images?: string[];
  shortDescription: string;
  description: string;
  tags?: string[];
}
```

Cart item shape:

```ts
interface CartItem {
  productId: string;
  quantity: number;
}
```

Derived cart UI should hydrate product data by joining cart items with product catalog.

## Page-by-Page Implementation Plan

### 1) `/`
Build a polished storefront landing page:
- Navbar with store name + cart count
- Hero banner with CTA to `/products`
- Featured products section showing first 4+ `featured: true` products
- Small value props row (shipping, returns, support) for visual completeness

### 2) `/products`
Client-driven browse page:
- left or top filter sidebar
- filters:
  - category
  - in-stock only toggle
  - optional price band if time permits
- sorting:
  - featured
  - price low-high
  - price high-low
  - rating
  - name A-Z
- product grid responsive: 1/2/3/4 columns depending on viewport
- empty-state if filters remove all items

### 3) `/products/[id]`
Product detail page:
- image
- title/category/rating/price
- description
- stock state
- quantity selector
- add to cart button
- small related products section from same category optional but valuable
- use `notFound()` if id missing

### 4) `/cart`
Cart page:
- list of `CartItem` components
- quantity increment/decrement/remove controls
- order summary card
- subtotal
- shipping rule: free over threshold or flat rate
- total
- CTA to `/checkout`
- empty cart state with return-to-shopping CTA

### 5) `/checkout`
Checkout page:
- address form fields:
  - full name
  - email
  - address line 1
  - address line 2 optional
  - city
  - state/region
  - postal code
  - country
- payment form fields:
  - cardholder name
  - card number
  - expiry
  - CVC
- right-side order summary
- submit validates required fields on client
- on successful mock submit:
  - save lightweight order payload in `sessionStorage` or encoded query params
  - optionally clear cart
  - redirect to `/order-success`

### 6) `/order-success`
Success page:
- thank-you message
- confirmation/order number (generated client-side)
- summary of item count and total if available
- CTA back to `/products`

## Component Responsibilities

### Navbar
- persistent top nav
- links: Home, Products, Cart
- cart count badge from CartContext
- mobile-friendly layout

### ProductCard
- image, name, category, price, rating
- links to product detail
- quick add button optional

### ProductGrid
- receives product list and renders cards
- handles empty state message

### FilterSidebar
- receives categories, selected filters, and callbacks
- owns only UI, not data fetching

### CartItem
- render title, price, quantity controls, line total, remove action

### CheckoutForm
- controlled inputs + validation
- submit handler provided by page or included internally
- clearly marked demo/mock payment behavior in helper text if needed

## State Management Plan

Use a client `CartContext` provider mounted in `app/layout.tsx`.

Context responsibilities:
- initialize from `localStorage`
- expose `items`
- expose `addItem(productId, quantity)`
- expose `updateQuantity(productId, quantity)`
- expose `removeItem(productId)`
- expose `clearCart()`
- expose derived `itemCount`

Implementation detail:
- guard all `window/localStorage` access for SSR
- prefer hydration-safe initialization pattern (`useEffect` + mounted flag or lazy client init)

## API / Integration Plan

No external runtime API is required for acceptance.

"Stripe-ready" should mean:
- checkout form structure mirrors payment intent UX
- code organized so a future Stripe Elements integration can replace mock card fields
- add `.env.example` with placeholder stripe public key field only if Grunt chooses to wire optional config
- default app behavior must work with no env vars present

Recommendation: avoid integrating live Stripe SDK in this ticket unless needed, because acceptance only requires a checkout form, not live payment processing.

## Styling Plan

Tailwind CSS:
- clean neutral storefront palette
- card hover states
- consistent spacing/max-width containers
- responsive layout for catalog, cart, and checkout
- buttons and inputs centralized via lightweight reusable UI components

## Build / Tooling Plan

Minimum setup Grunt should create:
- `package.json` scripts: `dev`, `build`, `start`, `lint` optional
- dependencies: `next`, `react`, `react-dom`
- devDependencies: `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `@types/react`, `@types/node`, `@types/react-dom`, `eslint` optional
- App Router structure compatible with Next 14

## Risks / Gotchas

1. **Hydration mismatch with localStorage**
   - solve with client-only context/provider logic
2. **Dynamic route lookup**
   - normalize ids as strings and ensure JSON ids match route params
3. **Checkout page on server render**
   - keep interactive form in client component
4. **No images available**
   - use stable placeholder image URLs only if allowed, otherwise local SVG/gradient placeholders in `public/`
5. **Empty repo**
   - Grunt must scaffold entire project, not patch existing code

## Recommended Implementation Order for Grunt

1. Scaffold Next.js + Tailwind + TypeScript config
2. Add product JSON and typed product helpers in `lib/products.ts`
3. Build cart context + localStorage persistence
4. Implement shared layout and Navbar with cart count
5. Implement home page
6. Implement products listing/filter/sort
7. Implement product detail page
8. Implement cart page
9. Implement checkout flow + order-success page
10. Run `npm run build` and fix any client/server issues

## Testing Checklist for Pedant

- `npm install`
- `npm run dev`
- visit `/`
- visit `/products`
- test at least one category filter and two sort modes
- visit `/products/[id]` for a real product id
- add item to cart
- verify cart badge updates
- verify `/cart` totals update with quantity changes
- complete `/checkout`
- confirm redirect to `/order-success`
- run `npm run build`

## Explicit Handoff Notes

- No code implemented in Architect phase by design.
- Next role should create the full application from scratch in this repo.
- Do not push branches or create PRs from non-scribe roles.
