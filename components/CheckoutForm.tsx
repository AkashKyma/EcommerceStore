'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal > 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 600);
  };

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-soft">
        Your cart is empty. Add a few products before checking out.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-brand">Shipping details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="First name" className="input" />
            <input required placeholder="Last name" className="input" />
            <input required placeholder="Email address" type="email" className="input sm:col-span-2" />
            <input required placeholder="Street address" className="input sm:col-span-2" />
            <input required placeholder="City" className="input" />
            <input required placeholder="Postal code" className="input" />
            <input required placeholder="Country" className="input" />
            <input placeholder="Apartment, suite, etc. (optional)" className="input" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-brand">Payment</h2>
          <p className="text-sm text-slate-500">
            Stripe-ready mock form. Replace these inputs with Stripe Elements when live keys are available.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Cardholder name" className="input sm:col-span-2" />
            <input required placeholder="Card number" inputMode="numeric" className="input sm:col-span-2" />
            <input required placeholder="MM / YY" className="input" />
            <input required placeholder="CVC" inputMode="numeric" className="input" />
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-brand">Order summary</h2>
        <div className="mt-5 space-y-4">
          {lines.map((line) => (
            <div key={line.product.id} className="flex items-start justify-between gap-4 text-sm text-slate-600">
              <div>
                <p className="font-medium text-brand">{line.product.name}</p>
                <p>Qty {line.quantity}</p>
              </div>
              <p>${line.product.price * line.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-brand">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
        >
          {isSubmitting ? 'Placing order...' : 'Place order'}
        </button>
      </aside>
    </form>
  );
}
