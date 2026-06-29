import { CheckoutForm } from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Checkout</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand">Complete your order</h1>
        <p className="mt-4 text-lg text-slate-600">
          Enter your address and payment details below. The payment section is ready to swap with Stripe Elements when needed.
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
