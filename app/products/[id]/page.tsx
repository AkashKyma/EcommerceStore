import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getProductById, products } from '@/src/products';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel';

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr,0.95fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-600">★ {product.rating.toFixed(1)} rating</span>
              <span>{product.inventory} in stock</span>
            </div>
          </div>
          <p className="text-lg leading-8 text-slate-600">{product.description}</p>
          <div>
            <p className="text-3xl font-semibold text-brand">${product.price}</p>
            <p className="mt-2 text-sm text-slate-500">Taxes and shipping calculated at checkout.</p>
          </div>
          <ul className="space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            {product.details.map((detail) => (
              <li key={detail} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {detail}
              </li>
            ))}
          </ul>
          <ProductPurchasePanel product={product} />
          <Link href="/products" className="inline-flex text-sm font-semibold text-accent">
            ← Back to all products
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-brand">You may also like</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
