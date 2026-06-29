'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartLine } from '@/src/types';

type CartItemProps = {
  line: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export function CartItem({ line, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-[140px,1fr]">
      <Link href={`/products/${line.product.id}`} className="relative block h-36 overflow-hidden rounded-2xl">
        <Image src={line.product.image} alt={line.product.name} fill className="object-cover" sizes="140px" />
      </Link>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">{line.product.category}</p>
            <Link href={`/products/${line.product.id}`} className="text-lg font-semibold text-brand">
              {line.product.name}
            </Link>
            <p className="mt-2 text-sm text-slate-600">{line.product.description}</p>
          </div>
          <p className="text-lg font-semibold text-brand">${line.product.price * line.quantity}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Qty
            <select
              value={line.quantity}
              onChange={(event) => onQuantityChange(Number(event.target.value))}
              className="rounded-full border border-slate-200 px-3 py-2 outline-none ring-accent focus:ring"
            >
              {[1, 2, 3, 4, 5, 6].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={onRemove} className="text-sm font-semibold text-slate-500 hover:text-brand">
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
