import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProductByHandle } from '../services/shopify';

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(handle: string | undefined): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    const currentHandle = handle;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductByHandle(currentHandle);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { product, loading, error };
}
