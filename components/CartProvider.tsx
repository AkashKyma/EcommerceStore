'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createCartLines,
  readCart,
  removeCartItem,
  setCartItemQuantity,
  upsertCartItem,
  writeCart,
} from '@/src/cart-utils';
import { products } from '@/src/products';
import type { CartItem, CartLine, Product } from '@/src/types';

type CartContextValue = {
  cart: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      writeCart(cart);
    }
  }, [cart, ready]);

  const lines = useMemo(() => createCartLines(cart, products), [cart]);
  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.product.price * line.quantity, 0),
    [lines],
  );
  const itemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      lines,
      itemCount,
      subtotal,
      addToCart: (product, quantity = 1) => setCart((current) => upsertCartItem(current, product.id, quantity)),
      updateQuantity: (productId, quantity) => setCart((current) => setCartItemQuantity(current, productId, quantity)),
      removeFromCart: (productId) => setCart((current) => removeCartItem(current, productId)),
      clearCart: () => setCart([]),
    }),
    [cart, itemCount, lines, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
