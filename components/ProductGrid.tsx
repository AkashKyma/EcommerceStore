'use client';

import { useMemo, useState } from 'react';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/src/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

export function ProductGrid({ products, categories }: { products: Product[]; categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const scoped =
      selectedCategory === 'All'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    return [...scoped].sort((left, right) => {
      switch (selectedSort) {
        case 'price-asc':
          return left.price - right.price;
        case 'price-desc':
          return right.price - left.price;
        case 'rating-desc':
          return right.rating - left.rating;
        case 'featured':
        default:
          return Number(right.featured) - Number(left.featured);
      }
    });
  }, [products, selectedCategory, selectedSort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
      />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-brand">{filteredProducts.length}</span> products
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
