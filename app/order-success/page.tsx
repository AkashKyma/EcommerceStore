import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-16">
      <div className="w-full rounded-[2rem] border border-emerald-100 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Order confirmed</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand">Thanks for your purchase</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Your order has been placed successfully. A confirmation email and shipping details would be sent from the live Stripe-backed flow.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products" className="rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
            Continue shopping
          </Link>
          <Link href="/" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-brand transition hover:border-brand">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
