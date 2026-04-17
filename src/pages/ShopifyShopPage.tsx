import { useEffect, useState } from 'react';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const SORT_OPTIONS = ['All', 'New', 'Best Sellers'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export default function ShopifyShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState<SortOption>('All');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ── Loading skeletons ── */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10 border-t border-[#e5e5e5] pt-8">
          <div className="skeleton mb-3 h-3 w-24" />
          <div className="skeleton h-10 w-40 sm:h-14" />
        </div>
        {/* Grid skeletons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[3/4] w-full" />
              <div className="mt-3 space-y-1.5">
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-2.5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#a3a3a3]">Error</p>
        <h2
          className="mb-6 text-2xl font-bold text-[#0a0a0a]"
          style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
        >
          Something went wrong
        </h2>
        <p className="mb-8 text-sm text-[#737373]">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="h-12 border border-[#0a0a0a] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-200 hover:bg-[#0a0a0a] hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <div className="border-t border-[#e5e5e5] pt-8 pb-6 sm:pt-12 sm:pb-8">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-[#a3a3a3]">
            Collection
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1
              className="text-4xl font-extrabold uppercase tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              All Products
            </h1>
            {/* Search — minimal inline */}
            <div className="flex items-center gap-2 border-b border-[#e5e5e5] pb-1 sm:w-56">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-[12px] text-[#0a0a0a] placeholder-[#a3a3a3] focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Sort bar ── */}
        <div className="mb-8 flex items-center justify-between border-b border-[#e5e5e5] pb-4 sm:mb-10">
          <div className="flex gap-5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                  activeSort === opt
                    ? 'text-[#0a0a0a]'
                    : 'text-[#a3a3a3] hover:text-[#0a0a0a]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#a3a3a3]">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* ── Product grid ── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-2xl font-bold text-[#0a0a0a]"
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              {searchTerm ? 'No results' : 'No products yet'}
            </p>
            <p className="mt-3 text-sm text-[#737373]">
              {searchTerm
                ? 'Try a different search term.'
                : 'Check back soon for new drops.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a] underline underline-offset-4"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-20 sm:gap-4 md:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
