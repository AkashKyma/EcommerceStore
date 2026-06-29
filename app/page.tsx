import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { featuredProducts } from '@/src/products';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="hero-gradient overflow-hidden rounded-[2rem] border border-slate-200 px-8 py-16 shadow-soft md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              New seasonal arrivals
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-brand md:text-6xl">
                Well-made essentials for home, travel, and daily routines.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Northstar Supply curates practical, design-forward goods with durable materials and fast checkout.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
                Shop the collection
              </Link>
              <Link href="/checkout" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-brand transition hover:border-brand">
                Quick checkout
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/70 p-6 shadow-soft">
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-white p-5">
                <p className="text-3xl font-semibold text-brand">8</p>
                <p className="mt-2">Curated products across home, travel, wellness, office, and tech.</p>
              </div>
              <div className="rounded-3xl bg-white p-5">
                <p className="text-3xl font-semibold text-brand">Free</p>
                <p className="mt-2">Shipping on all orders over $100, with secure mock checkout flow.</p>
              </div>
              <div className="col-span-2 rounded-3xl bg-brand p-5 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">Why shoppers return</p>
                <p className="mt-3 text-2xl font-semibold">Simple browsing, polished product detail pages, and a cart that persists locally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand">Best sellers this week</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-accent">
            View all products
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
