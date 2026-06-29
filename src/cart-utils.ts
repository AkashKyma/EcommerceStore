import type { CartItem, CartLine, Product } from '@/src/types';

export const CART_STORAGE_KEY = 'aka-74-cart';

export function readCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((item) => item.quantity > 0) : [];
  } catch {
    return [];
  }
}

export function writeCart(cart: CartItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function upsertCartItem(cart: CartItem[], productId: string, quantity: number) {
  const existing = cart.find((item) => item.id === productId);

  if (!existing) {
    return [...cart, { id: productId, quantity }];
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity: item.quantity + quantity } : item,
  );
}

export function setCartItemQuantity(cart: CartItem[], productId: string, quantity: number) {
  if (quantity <= 0) {
    return cart.filter((item) => item.id !== productId);
  }

  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}

export function removeCartItem(cart: CartItem[], productId: string) {
  return cart.filter((item) => item.id !== productId);
}

export function createCartLines(cart: CartItem[], products: Product[]): CartLine[] {
  return cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is CartLine => item !== null);
}

export function getCartSubtotal(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.product.price * line.quantity, 0);
}
