/**
 * Example: Shopify Product Page Component
 *
 * This component demonstrates how to use the getProductByHandle function
 * to fetch product data from Shopify Storefront API and display it.
 *
 * Usage in router:
 *   <Route path="/product/:handle" element={<ShopifyProductPage />} />
 *
 * Or:
 *   <Route path="/shop/:handle" element={<ShopifyProductPage />} />
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByHandle } from '../services/shopify';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import Button from '../components/Button';
import Loader from '../components/Loader';
import SectionWrapper from '../components/SectionWrapper';

export default function ShopifyProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  // State for variant selection
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data when component mounts or handle changes
  useEffect(() => {
    if (!handle) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductByHandle(handle);
        setProduct(data);
        // Set first variant as default
        if (data.variants.length > 0) {
          setSelectedVariantId(data.variants[0].id);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load product';
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  // Get the selected variant
  const selectedVariant = product?.variants.find(
    (v) => v.id === selectedVariantId,
  ) || product?.variants[0];

  // Format price
  const formattedPrice = selectedVariant
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product?.priceRange.currencyCode || 'USD',
      }).format(parseFloat(selectedVariant.price))
    : null;

  // Render loading state
  if (loading) {
    return <Loader />;
  }

  // Render error state
  if (error || !product) {
    return (
      <SectionWrapper>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {error ? `Error: ${error}` : 'Product not found'}
          </h2>
          <Link
            to="/shop"
            className="text-sm underline text-brand-muted hover:text-brand-orange transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      image: currentImage?.url || '',
      handle: product.handle,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setQuantity(1);
  };

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* -------- Image Gallery -------- */}
        <div>
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-brand-charcoal mb-4">
            {currentImage && (
              <img
                src={currentImage.url}
                alt={currentImage.altText || product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImageIndex
                      ? 'border-brand-orange'
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.altText || `Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* -------- Product Info -------- */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              to="/shop"
              className="text-xs text-brand-muted hover:text-brand-orange transition-colors"
            >
              ← Back to Shop
            </Link>
          </div>

          {/* Title & Product Type */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {product.title}
          </h1>
          {product.productType && (
            <p className="text-sm text-brand-muted mb-6">{product.productType}</p>
          )}

          {/* Price Range */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-brand-orange">
              {formattedPrice}
            </p>
            {product.priceRange.min !== product.priceRange.max && (
              <p className="text-xs text-brand-muted">
                from{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.priceRange.currencyCode || 'USD',
                }).format(parseFloat(product.priceRange.min))}
                {' to '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.priceRange.currencyCode || 'USD',
                }).format(parseFloat(product.priceRange.max))}
              </p>
            )}
          </div>

          {/* Availability Status */}
          <div className="mb-6 flex items-center gap-2">
            {isAvailable ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-500">In Stock</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-500">Out of Stock</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-8 prose prose-invert max-w-none">
            <p className="text-brand-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <p className="text-sm font-semibold text-white mb-4">Select Option</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm ${
                      selectedVariantId === variant.id
                        ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                        : 'border-white/20 text-white hover:border-brand-orange'
                    } ${
                      !variant.availableForSale
                        ? 'opacity-40 cursor-not-allowed line-through'
                        : 'hover:bg-white/5'
                    }`}
                    disabled={!variant.availableForSale}
                    title={!variant.availableForSale ? 'This option is out of stock' : ''}
                  >
                    {variant.title}
                    {!variant.availableForSale && ' (Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          {isAvailable && (
            <div className="mb-8">
              <p className="text-sm font-semibold text-white mb-4">Quantity</p>
              <div className="flex items-center border-2 border-white/20 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white hover:bg-white/5 transition disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold text-white min-w-fit">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-white hover:bg-white/5 transition"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="relative">
            <Button
              variant="primary"
              className={`w-full mb-6 transition-all ${
                !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isAvailable}
              onClick={handleAddToCart}
            >
              {addedToCart ? '✓ Added to Cart' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            {addedToCart && (
              <div className="absolute inset-0 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center pointer-events-none">
                <span className="text-sm font-semibold text-green-400">Added!</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs font-semibold text-brand-muted mb-3 uppercase">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
