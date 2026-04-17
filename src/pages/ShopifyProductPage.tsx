import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByHandle } from '../services/shopify';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

export default function ShopifyProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!handle) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductByHandle(handle);
        setProduct(data);
        if (data.variants.length > 0) setSelectedVariantId(data.variants[0].id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [handle]);

  const selectedVariant =
    product?.variants.find((v) => v.id === selectedVariantId) || product?.variants[0];

  const formattedPrice = selectedVariant
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product?.priceRange.currencyCode || 'USD',
      }).format(parseFloat(selectedVariant.price))
    : null;

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="skeleton aspect-[3/4] w-full" />
          <div className="space-y-4 pt-2">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-6 w-20" />
            <div className="skeleton mt-6 h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Error / not found ── */
  if (error || !product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#a3a3a3]">Not found</p>
        <h2
          className="mb-6 text-2xl font-bold text-[#0a0a0a]"
          style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
        >
          {error ? 'Something went wrong' : 'Product not found'}
        </h2>
        <Link
          to="/shop"
          className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a] underline underline-offset-4 hover:no-underline"
        >
          ← Back to Shop
        </Link>
      </div>
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/shop"
            className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] transition-colors hover:text-[#0a0a0a]"
          >
            ← Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_480px]">

          {/* ── Image gallery ── */}
          <div>
            {/* Main image — no radius, no border */}
            <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
              {currentImage && (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-2 grid grid-cols-5 gap-1.5 sm:grid-cols-6">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square overflow-hidden bg-[#f5f5f5] transition-all duration-200 ${
                      idx === selectedImageIndex
                        ? 'ring-1 ring-[#0a0a0a] ring-offset-1'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText || `Image ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info panel ── */}
          <div className="flex flex-col lg:pt-4">

            {/* Product type */}
            {product.productType && (
              <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#a3a3a3]">
                {product.productType}
              </p>
            )}

            {/* Title */}
            <h1
              className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#0a0a0a] sm:text-4xl"
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <p className="mt-4 text-xl font-semibold text-[#0a0a0a] sm:text-2xl">
              {formattedPrice}
            </p>

            {/* Availability */}
            {!isAvailable && (
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#a3a3a3]">
                Out of stock
              </p>
            )}

            {/* Divider */}
            <div className="my-6 border-t border-[#e5e5e5]" />

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#737373]">
                  Size / Option
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const isOos = !variant.availableForSale;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantId(variant.id)}
                        disabled={isOos}
                        className={`h-9 min-w-[2.5rem] px-3 text-[11px] font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#0a0a0a] text-white'
                            : isOos
                            ? 'border border-[#e5e5e5] text-[#d4d4d4] line-through cursor-not-allowed'
                            : 'border border-[#e5e5e5] text-[#0a0a0a] hover:border-[#0a0a0a]'
                        }`}
                      >
                        {variant.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            {isAvailable && (
              <div className="mb-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#737373]">
                  Quantity
                </p>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center border border-[#e5e5e5] text-[#0a0a0a] transition-colors hover:border-[#0a0a0a] disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="flex h-9 min-w-[2.5rem] items-center justify-center border-y border-[#e5e5e5] text-[13px] font-medium text-[#0a0a0a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center border border-[#e5e5e5] text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`h-13 w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200 active:scale-[0.99] ${
                addedToCart
                  ? 'bg-[#0a0a0a] text-white'
                  : isAvailable
                  ? 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
                  : 'cursor-not-allowed bg-[#f0f0f0] text-[#a3a3a3]'
              }`}
            >
              {addedToCart ? '✓ Added to Bag' : isAvailable ? 'Add to Bag' : 'Out of Stock'}
            </button>

            {/* View cart link */}
            {addedToCart && (
              <Link
                to="/cart"
                className="mt-3 block text-center text-[10px] uppercase tracking-[0.18em] text-[#737373] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
              >
                View Bag
              </Link>
            )}

            {/* Description */}
            {product.description && (
              <div className="mt-6 border-t border-[#e5e5e5] pt-6">
                <p className="text-[10px] mb-3 uppercase tracking-[0.2em] text-[#737373]">
                  Details
                </p>
                <p className="text-sm leading-7 text-[#737373]">
                  {product.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#e5e5e5] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[#a3a3a3]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
