/**
 * Example: Shopify Products List Component
 *
 * This component demonstrates how to use the getProducts function
 * to fetch and display a list of products from Shopify Storefront API.
 *
 * Usage in router:
 *   <Route path="/shop" element={<ShopifyShopPage />} />
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/shopify';
import type { Product } from '../types';

export default function ShopifyShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
        setError(errorMessage);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Format price helper
  const formatPrice = (product: Product) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.priceRange.currencyCode || 'USD',
    }).format(parseFloat(product.priceRange.min));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-brand-muted mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand-orange text-black font-semibold rounded-lg hover:bg-brand-orange/80 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-charcoal to-brand-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Shop</h1>
          <p className="text-brand-muted mb-8 max-w-2xl">
            Explore our collection of premium products sourced directly from Shopify.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brand-muted focus:outline-none focus:border-brand-orange transition"
            />
            <svg
              className="absolute right-4 top-3.5 w-5 h-5 text-brand-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-brand-muted mb-6">
              {searchTerm
                ? `Try adjusting your search terms`
                : 'Check back soon for new products'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-brand-orange hover:text-brand-orange/80 font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-brand-muted mb-8">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                (() => {
                  const isAvailable = product.variants.some((v) => v.availableForSale);
                  const primaryImage = product.images[0];
                  return (
                <Link
                  key={product.id}
                  to={`/product/${product.handle}`}
                  className={`group cursor-pointer transition-opacity ${
                    !isAvailable ? 'opacity-75' : ''
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg bg-brand-charcoal aspect-[3/4] mb-4">
                    {/* Product Image */}
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.altText || product.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          !isAvailable ? 'grayscale' : ''
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="text-brand-muted">No image</span>
                      </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-center px-4">OUT OF STOCK</span>
                      </div>
                    )}

                    {/* Availability Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvailable ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></span>
                      <span
                        className={`text-xs font-semibold ${
                          isAvailable
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {isAvailable ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className={`font-semibold ${
                      isAvailable
                        ? 'text-white group-hover:text-brand-orange'
                        : 'text-brand-muted'
                    } transition mb-1 line-clamp-2`}>
                      {product.title}
                    </h3>
                    <p className="text-sm text-brand-muted mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-bold ${
                        isAvailable ? 'text-brand-orange' : 'text-brand-muted/50'
                      }`}>
                        {formatPrice(product)}
                      </span>
                      {!isAvailable && (
                        <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                  );
                })()
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
