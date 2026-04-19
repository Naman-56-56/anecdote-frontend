import { useState, useEffect } from 'react';
// @ts-ignore
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/shopify';
import type { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getProducts(50);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <>
      <Hero />
      
      <section className="bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a3a3a3]">
                Loading...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
