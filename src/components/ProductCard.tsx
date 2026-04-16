import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

const PLACEHOLDER_IMAGES = [
  'https://source.unsplash.com/600x800/?fashion,dark',
  'https://source.unsplash.com/600x800/?tarot',
  'https://source.unsplash.com/600x800/?mystic,clothing',
  'https://source.unsplash.com/600x800/?streetwear,dark',
  'https://source.unsplash.com/600x800/?aesthetic,fashion',
];

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickAddState, setQuickAddState] = useState<'idle' | 'added'>('idle');
  const { addItem } = useCart();

  const primary = product.images[0];
  const hover = product.images[1];
  const firstVariant = product.variants[0];
  const isOutOfStock = !firstVariant || firstVariant.availableForSale === false;

  const placeholderImg =
    PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.currencyCode || 'EUR',
  }).format(parseFloat(product.priceRange.min));

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || isOutOfStock) return;

    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      image: primary?.url ?? placeholderImg,
      handle: product.handle,
    });
    setQuickAddState('added');
    window.setTimeout(() => setQuickAddState('idle'), 1400);
  }

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.handle}`} className="block">
        <div
          className={`relative aspect-[3/4] overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 ${
            hovered ? 'translate-y-[-4px] shadow-[0_20px_45px_rgba(15,23,42,0.08)]' : 'shadow-sm'
          }`}
        >
          {primary ? (
            <img
              src={primary.url}
              alt={primary.altText || product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                hovered && hover ? 'opacity-0' : 'opacity-100'
              } ${hovered ? 'scale-105' : 'scale-100'}`}
              loading="lazy"
            />
          ) : (
            <img
              src={placeholderImg}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                hovered ? 'scale-105' : 'scale-100'
              }`}
              loading="lazy"
            />
          )}
          {hover && (
            <img
              src={hover.url}
              alt={hover.altText || product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}

          <div
            className={`absolute bottom-0 inset-x-0 p-3 transition-all duration-300 ${
              hovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="w-full rounded-xl border border-slate-900 bg-slate-900/95 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-white/90 disabled:text-slate-400"
            >
              {quickAddState === 'added'
                ? 'Added to Cart'
                : isOutOfStock
                  ? 'Sold Out'
                  : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-1 px-1 pb-1">
          <h3
            className="text-sm font-medium leading-snug line-clamp-2 text-slate-900"
            style={{ fontFamily: 'var(--FONT-STACK-BODY)' }}
          >
            {product.title}
          </h3>
          <p className="text-sm text-slate-500">{formattedPrice}</p>
        </div>
      </Link>
    </div>
  );
}
