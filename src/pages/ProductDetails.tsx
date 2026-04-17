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
            to="/shop"
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
        currency: product.priceRange.currencyCode || 'EUR',
      }).format(parseFloat(selectedVariant.price))
    : '';

  const isAvailable = selectedVariant?.availableForSale ?? false;

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-[0_4px_18px_rgba(17,17,17,0.05)]">
            {product.images[selectedImageIndex] && (
              <img
                src={product.images[selectedImageIndex].url}
                alt={
                  product.images[selectedImageIndex].altText || product.title
                }
                className="aspect-[4/5] w-full object-cover"
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square overflow-hidden rounded-md border transition-all duration-300 ${
                    idx === selectedImageIndex
                      ? 'border-black ring-2 ring-black/10'
                      : 'border-zinc-200 hover:border-zinc-400'
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
          <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-[0_4px_18px_rgba(17,17,17,0.05)] md:p-8">
          <nav className="mb-6 text-xs text-zinc-500">
            <Link to="/" className="transition-colors duration-300 hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="transition-colors duration-300 hover:text-black">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{product.title}</span>
          </nav>

          <h1
            className="mb-3 text-3xl font-semibold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            {product.title}
          </h1>

          <p className="mb-8 text-2xl font-medium text-black">{formattedPrice}</p>

          {Object.entries(optionGroups).map(([name, values]) => (
            <div key={name} className="mb-6">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {name}:{' '}
                <span className="font-normal text-black">
                  {selectedOptions[name]}
                </span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                      selectedOptions[name] === value
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-black'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Quantity
            </label>
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-zinc-500 transition-all duration-300 hover:bg-white hover:text-black"
              >
                &minus;
              </button>
              <span className="min-w-[3.5rem] px-4 py-3 text-center text-sm font-medium text-black">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-zinc-500 transition-all duration-300 hover:bg-white hover:text-black"
              >
                +
              </button>
            </div>
          </div>

          {selectedVariant && (
            <p
              className={`mb-4 text-xs font-medium ${
                isAvailable ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isAvailable
                ? `In stock${
                    selectedVariant.inventoryQuantity > 0
                      ? ` (${selectedVariant.inventoryQuantity} available)`
                      : ''
                  }`
                : 'Out of stock'}
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
