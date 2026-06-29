import { ProductGrid } from '@/components/ProductGrid';
import { categories, products } from '@/src/products';

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand">Browse the full collection</h1>
        <p className="mt-4 text-lg text-slate-600">
          Filter by category, sort by price or rating, and explore a curated selection of practical everyday goods.
        </p>
      </div>
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
