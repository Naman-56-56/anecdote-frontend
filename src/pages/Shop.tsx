import { useProducts } from '../hooks';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import SectionWrapper from '../components/SectionWrapper';

export default function Shop() {
  const { products, loading, error, usingDemoData } = useProducts();

  return (
    <>
      <SectionWrapper className="pb-0 pt-10 md:pt-14" padded={false}>
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 md:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Shop
          </p>
          <h1
            className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Shop all
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            Discover refined essentials and standout pieces, curated for an elevated everyday wardrobe.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {loading && <Loader variant="grid" count={8} />}

        {error && (
          <EmptyState
            title="Something went wrong"
            description={error}
            actionLabel="Try Again"
            actionTo="/shop"
          />
        )}

        {!loading && !error && products.length === 0 && (
          <EmptyState
            title="No products found"
            description="Check back soon for new arrivals or try adjusting your filters."
          />
        )}

        {!loading && !error && products.length > 0 && (
          <>
            {usingDemoData && (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                No products found. Using demo data.
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </SectionWrapper>
    </>
  );
}
