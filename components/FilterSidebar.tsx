type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

type FilterSidebarProps = {
  categories: string[];
  selectedCategory: string;
  selectedSort: SortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
};

export function FilterSidebar({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-brand">Filter by category</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="text-base font-semibold text-brand">
            Sort products
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none ring-accent focus:ring"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating-desc">Top rated</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
