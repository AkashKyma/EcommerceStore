'use client';

import Link from 'next/link';
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/components/CartProvider';

export default function CartPage() {
  const { lines, subtotal, removeFromCart, updateQuantity } = useCart();
  const shipping = lines.length === 0 || subtotal > 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Cart</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand">Review your selections</h1>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-brand">Your cart is empty</h2>
          <p className="mt-3 text-slate-600">Browse the catalog and add a few essentials to continue.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-5">
            {lines.map((line) => (
              <CartItem
                key={line.product.id}
                line={line}
                onQuantityChange={(quantity) => updateQuantity(line.product.id, quantity)}
                onRemove={() => removeFromCart(line.product.id)}
              />
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-brand">Summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-brand">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 font-semibold text-white transition hover:opacity-90">
              Continue to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
