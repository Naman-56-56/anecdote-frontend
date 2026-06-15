import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import SectionWrapper from '../components/SectionWrapper';

export default function ProductDetails() {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useProduct(handle);
  const { addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  /* Build option groups (e.g. Size → [S, M, L]) */
  const optionGroups = useMemo(() => {
    if (!product) return {};
    const groups: Record<string, string[]> = {};
    for (const variant of product.variants) {
      for (const opt of variant.selectedOptions) {
        if (!groups[opt.name]) groups[opt.name] = [];
        if (!groups[opt.name].includes(opt.value)) {
          groups[opt.name].push(opt.value);
        }
      }
    }
    return groups;
  }, [product]);

  /* Initialise selected options from first variant */
  useEffect(() => {
    if (!product || product.variants.length === 0) return;
    const first = product.variants[0];
    const initial: Record<string, string> = {};
    for (const opt of first.selectedOptions) {
      initial[opt.name] = opt.value;
    }
    setSelectedOptions(initial);
    setSelectedVariantId(first.id);
  }, [product]);

  useEffect(() => {
    setAddedToCart(false);
  }, [product?.id]);

  /* Match variant whenever options change */
  useEffect(() => {
    if (!product || Object.keys(selectedOptions).length === 0) return;
    const match = product.variants.find((v) =>
      v.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value,
      ),
    );
    if (match) setSelectedVariantId(match.id);
  }, [selectedOptions, product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find((v) => v.id === selectedVariantId) ??
      product.variants[0] ??
      null
    );
  }, [product, selectedVariantId]);

  /* ---------- handlers ---------- */

  function handleAddToCart() {
    if (!product || !selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      image: product.images[0]?.url ?? '',
      handle: product.handle,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  // Check if a specific option value is out of stock given other currently selected options
  const isOptionValueOutOfStock = (optionName: string, value: string) => {
    if (!product) return false;
    
    const targetOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    
    const matchingVariants = product.variants.filter((variant) =>
      variant.selectedOptions.every(
        (opt) => targetOptions[opt.name] === opt.value
      )
    );
    
    if (matchingVariants.length === 0) {
      const generalMatching = product.variants.filter((variant) =>
        variant.selectedOptions.some(
          (opt) => opt.name === optionName && opt.value === value
        )
      );
      return generalMatching.length > 0 && generalMatching.every((v) => !v.availableForSale);
    }
    
    return matchingVariants.every((v) => !v.availableForSale);
  };

  const tagline = useMemo(() => {
    if (!product) return '';
    const titleLower = product.title.toLowerCase();
    if (titleLower.includes('hoodie')) {
      return 'Heavyweight comfort engineered for daily wear.';
    }
    if (titleLower.includes('tee') || titleLower.includes('shirt') || titleLower.includes('t-shirt')) {
      return 'Premium ringspun cotton in our signature boxy fit.';
    }
    if (titleLower.includes('cap')) {
      return 'Low profile, unstructured classic daily cap.';
    }
    return 'Exclusively crafted for our limited collection.';
  }, [product]);

  /* ---------- render ---------- */

  if (loading) return <Loader />;

  if (error || !product) {
    return (
      <SectionWrapper>
        <div className="py-20 text-center">
          <h2
            className="mb-4 text-2xl font-semibold tracking-tight text-black"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Product not found
          </h2>
          <Link
            to="/"
            className="text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors duration-300 hover:text-black"
          >
            Back to Shop
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const formattedPrice = selectedVariant
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product.priceRange.currencyCode || 'USD',
      }).format(parseFloat(selectedVariant.price))
    : '';

  const isAvailable = selectedVariant?.availableForSale ?? false;

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.42fr_0.58fr] lg:gap-16">
        {/* Left Column: Image Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {product.images.map((img) => (
              <div key={img.id} className="aspect-[3/4] bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
                <img
                  src={img.url}
                  alt={img.altText || product.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-white py-4 md:py-0">
            {/* Title & Price Row */}
            <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-3">
              <h1
                className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#0a0a0a]"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
              >
                {product.title}
                {selectedVariant && selectedVariant.title !== 'Default Title' && ` / ${selectedVariant.title}`}
              </h1>
              <span className="text-xs font-bold tracking-wider text-[#0a0a0a] shrink-0">
                {formattedPrice}
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-2.5 text-[11px] italic text-neutral-500">
              {tagline}
            </p>

            {/* Options */}
            <div className="mt-8">
              {Object.entries(optionGroups).map(([name, values]) => {
                const isSize = name.toLowerCase() === 'size';
                return (
                  <div key={name} className="mb-6">
                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#737373]">
                      {name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value) => {
                        const isSelected = selectedOptions[name] === value;
                        const isOutOfStock = isOptionValueOutOfStock(name, value);
                        return (
                          <button
                            key={value}
                            onClick={() =>
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [name]: value,
                              }))
                            }
                            className={`relative h-9 ${
                              isSize ? 'w-9' : 'px-3.5'
                            } flex items-center justify-center text-[10px] font-semibold transition-all duration-200 border ${
                              isSelected
                                ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
                                : 'bg-white border-neutral-200 text-[#0a0a0a] hover:border-[#0a0a0a]'
                            }`}
                          >
                            <span className={isOutOfStock && !isSelected ? 'text-neutral-400' : ''}>
                              {value}
                            </span>
                            {isOutOfStock && (
                              <svg
                                className="absolute inset-0 h-full w-full stroke-neutral-300 stroke-[1px] pointer-events-none"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <line x1="0" y1="100" x2="100" y2="0" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Points Box */}
            <div className="mt-6 rounded-md border border-neutral-200 bg-[#fafafa] p-3 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10M2 12h20" />
                </svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a]">
                  FREE SHIPPING ON ORDERS $70 AND ABOVE
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c1.008 0 2 .05 3 .15M12 4.5a1.5 1.5 0 00-3 0m3 0c-1.008 0-2 .05-3 .15m3-.15V6m0 0a4.5 4.5 0 004.5 4.5H21m-9-4.5A4.5 4.5 0 007.5 6H3m9 4.5v10m9-10v8.25a2.25 2.25 0 01-2.25 2.25H6.25A2.25 2.25 0 014 18.75V10.5" />
                </svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a]">
                  PREMIUM COTTON BLEND
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3.096 15 8.19 14.187 9 9l.813 5.187 5.096.813-5.096.904zM19.006 5.003L18.5 8l-.5-2.997-2.997-.5L18 4l.5-2.997.5 2.997 2.997.5-2.997.5zM12.003 3.002L11.5 5l-.5-1.998-1.998-.5L11 2l.5-1.998.5 1.998 1.998.5-1.998.5z" />
                </svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a]">
                  LIMITED ANECDOTE DROP
                </span>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-5">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`w-full py-3 text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-200 ${
                  isAvailable
                    ? 'bg-[#0a0a0a] text-white hover:bg-neutral-800 active:scale-[0.99]'
                    : 'bg-[#f5f5f5] text-neutral-400 border border-neutral-200 cursor-not-allowed'
                }`}
              >
                {addedToCart
                  ? 'ADDED!'
                  : isAvailable
                    ? 'ADD TO CART'
                    : 'SOLD OUT'}
              </button>
            </div>



            {/* Product Description */}
            {product.descriptionHtml && (
              <div className="mt-6 border-t border-neutral-100 pt-6">
                <div
                  className="text-[11px] leading-6 text-neutral-600 space-y-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
