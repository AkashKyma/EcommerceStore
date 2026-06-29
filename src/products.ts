import productsData from '@/data/products.json';
import type { Product } from '@/src/types';

export const products = productsData as Product[];

export const featuredProducts = products.filter((product) => product.featured);

export const categories = ['All', ...new Set(products.map((product) => product.category))];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
