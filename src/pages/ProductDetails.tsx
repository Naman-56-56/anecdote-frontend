import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Loader from '../components/Loader';
import SectionWrapper from '../components/SectionWrapper';

export default function ProductDetails() {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useProduct(handle);
  const { addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
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
    setSelectedImageIndex(0);
    setQuantity(1);
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
      quantity,
      image: product.images[0]?.url ?? '',
      handle: product.handle,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="space-y-4">
          {/* Native CSS Snap Carousel */}
          <div 
            className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={(e) => {
              const container = e.currentTarget;
              const index = Math.round(container.scrollLeft / container.clientWidth);
              if (index !== selectedImageIndex) setSelectedImageIndex(index);
            }}
          >
            {product.images.map((img, idx) => (
              <div key={img.id} className="w-full shrink-0 snap-center bg-[#f5f5f5]">
                <img
                  src={img.url}
                  alt={img.altText || `${product.title} image ${idx + 1}`}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots (Mobile) */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-2 pt-2 sm:hidden">
              {product.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 w-1 transition-all duration-300 ${
                    idx === selectedImageIndex ? 'w-4 bg-[#0a0a0a]' : 'bg-[#d4d4d4]'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Desktop thumbnails */}
          {product.images.length > 1 && (
            <div className="hidden grid-cols-5 gap-1.5 sm:grid sm:grid-cols-6">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    const container = document.querySelector('.snap-x');
                    if (container) {
                      const target = container.children[idx] as HTMLElement;
                      container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
                    }
                  }}
                  className={`aspect-square overflow-hidden bg-[#f5f5f5] transition-all duration-200 ${
                    idx === selectedImageIndex
                      ? 'ring-1 ring-[#0a0a0a] ring-offset-1'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.altText || ''}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-white py-4 md:py-0">
          <nav className="mb-6 text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
            <Link to="/" className="transition-colors duration-300 hover:text-[#0a0a0a]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#0a0a0a]">{product.title}</span>
          </nav>

          <h1
            className="mb-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#0a0a0a] md:text-4xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            {product.title}
          </h1>

          <p className="mb-8 text-2xl font-semibold text-[#0a0a0a]">{formattedPrice}</p>

          {Object.entries(optionGroups).map(([name, values]) => (
            <div key={name} className="mb-6">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373]">
                {name}
              </label>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }
                    className={`h-9 min-w-[2.5rem] px-4 text-[11px] font-medium transition-all duration-200 ${
                      selectedOptions[name] === value
                        ? 'bg-[#0a0a0a] text-white'
                        : 'border border-[#e5e5e5] text-[#0a0a0a] hover:border-[#0a0a0a]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-8">
            <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373]">
              Quantity
            </label>
            <div className="inline-flex items-center border border-[#e5e5e5]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-[#0a0a0a] transition-colors duration-300 hover:bg-[#f5f5f5]"
              >
                &minus;
              </button>
              <span className="flex h-11 min-w-[3rem] items-center justify-center text-sm font-medium text-[#0a0a0a]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-[#0a0a0a] transition-colors duration-300 hover:bg-[#f5f5f5]"
              >
                +
              </button>
            </div>
          </div>

          {selectedVariant && (
            <p
              className={`mb-6 text-[11px] font-medium uppercase tracking-[0.05em] ${
                isAvailable ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isAvailable ? 'Available Now' : 'Out of Stock'}
            </p>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isAvailable}
            onClick={handleAddToCart}
          >
            {addedToCart
              ? 'Added!'
              : isAvailable
                ? 'Add to Cart'
                : 'Sold Out'}
          </Button>

          {addedToCart && (
            <p className="mt-3 text-sm text-emerald-600">Added to your cart.</p>
          )}

          {product.descriptionHtml && (
            <div className="mt-10 border-t border-zinc-200 pt-10">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Description
              </h3>
              <div
                className="space-y-4 text-sm leading-7 text-zinc-600 [&_p]:m-0 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:font-medium [&_a]:text-black [&_a]:underline [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5"
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
