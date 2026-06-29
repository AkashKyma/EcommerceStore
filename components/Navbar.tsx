'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/CartProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-brand">
          Northstar Supply
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'text-brand' : 'transition hover:text-brand'}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/cart"
            className="rounded-full bg-brand px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Cart ({itemCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}
