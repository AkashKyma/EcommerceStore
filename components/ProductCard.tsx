'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import type { Product } from '@/src/types';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <Link href={`/products/${product.id}`} className="relative block h-64 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{product.category}</p>
            <Link href={`/products/${product.id}`} className="text-lg font-semibold text-brand">
              {product.name}
            </Link>
          </div>
          <p className="text-lg font-semibold text-brand">${product.price}</p>
        </div>
        <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-amber-600">★ {product.rating.toFixed(1)}</span>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
