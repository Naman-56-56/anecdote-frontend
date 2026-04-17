import { useProducts } from '../hooks';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import SectionWrapper from '../components/SectionWrapper';

export default function Shop() {
  const { products, loading, error } = useProducts();

  return (
    <>
      {/* Page header */}
      <SectionWrapper className="pb-0 pt-6 sm:pt-10" padded={false}>
        <div className="mx-auto max-w-7xl border-t border-[#e5e5e5] px-5 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-[#a3a3a3]">
            Collection
          </p>
          <h1
            className="text-4xl font-extrabold uppercase tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Shop All
          </h1>
        </div>
      </SectionWrapper>

      {/* Products */}
      <SectionWrapper className="pt-8 sm:pt-10">
        {loading && <Loader variant="grid" count={6} />}

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
            title="No products yet"
            description="Check back soon for new drops."
          />
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
