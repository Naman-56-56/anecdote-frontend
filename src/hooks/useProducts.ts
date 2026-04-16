import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProducts, getProductsSource } from '../services/shopify';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  usingDemoData: boolean;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDemoData, setUsingDemoData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        if (!cancelled) {
          setProducts(data);
          setUsingDemoData(getProductsSource() !== 'shopify');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error, usingDemoData };
}
