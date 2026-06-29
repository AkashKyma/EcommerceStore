'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import type { Product } from '@/src/types';

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium text-slate-600">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none ring-accent focus:ring"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Add to cart
        </button>
        <Link href="/cart" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-brand transition hover:border-brand">
          View cart
        </Link>
      </div>
      {added && <p className="text-sm font-medium text-emerald-600">Added to cart.</p>}
    </div>
  );
}
