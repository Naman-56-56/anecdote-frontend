import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickAdding, setQuickAdding] = useState(false);
  const { addItem } = useCart();

  const primary = product.images[0];
  const hover = product.images[1];
  const firstVariant = product.variants[0];
  const isOutOfStock = !firstVariant || firstVariant.availableForSale === false;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.currencyCode || 'EUR',
  }).format(parseFloat(product.priceRange.min));

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || isOutOfStock || quickAdding) return;

    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      image: primary?.url ?? '',
      handle: product.handle,
    });
    setQuickAdding(true);
    window.setTimeout(() => setQuickAdding(false), 1400);
  }

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.handle}`} className="block">
        {/* Image container — no border, no shadow, no radius */}
        <div className="relative aspect-[3/4] overflow-hidden bg-white">
          {/* Primary image */}
          {primary ? (
            <img
              src={primary.url}
              alt={primary.altText || product.title}
              className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ${
                hovered && hover ? 'opacity-0' : 'opacity-100'
              } ${hovered ? 'scale-[1.04]' : 'scale-100'}`}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f0f0f0]">
              <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3]">
                No image
              </span>
            </div>
          )}

          {/* Hover image */}
          {hover && (
            <img
              src={hover.url}
              alt={hover.altText || product.title}
              className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ${
                hovered ? 'opacity-100 scale-[1.04]' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}

          {/* Out of stock label */}
          {isOutOfStock && (
            <div className="absolute left-3 top-3 bg-white px-2 py-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
                Sold Out
              </span>
            </div>
          )}

          {/* Quick Add — appears on hover */}
          {!isOutOfStock && (
            <div
              className={`absolute inset-x-0 bottom-0 transition-all duration-250 ${
                hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
              }`}
            >
              <button
                onClick={handleQuickAdd}
                className="w-full bg-white py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white"
              >
                {quickAdding ? '✓ Added' : 'Quick Add'}
              </button>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-3 space-y-0.5 pl-0.5">
          <h3 className="truncate text-[12px] font-medium leading-snug text-[#0a0a0a] sm:text-[13px]">
            {product.title}
          </h3>
          <p className="text-[11px] text-[#737373]">{formattedPrice}</p>
        </div>
      </Link>
    </div>
  );
}
