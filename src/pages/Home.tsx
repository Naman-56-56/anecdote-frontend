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
      
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Single Section Header */}
          <div className="mb-10 text-center border-t border-[#e5e5e5] pt-12 sm:mb-16">
            <h2 
              className="text-4xl font-extrabold uppercase tracking-widest text-[#0a0a0a] sm:text-5xl" 
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              The Tarot Club
            </h2>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]">
              The Complete Collection
            </p>
          </div>
          
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
