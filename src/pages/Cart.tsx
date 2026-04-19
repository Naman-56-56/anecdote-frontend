import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { completeCheckout } from '../services/checkout';

function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      await completeCheckout(items);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : 'Failed to proceed to checkout',
      );
      setIsCheckingOut(false);
    }
  };

  /* ── Empty bag ── */
  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#a3a3a3]">
          Your bag
        </p>
        <h1
          className="text-3xl font-extrabold uppercase text-[#0a0a0a] sm:text-4xl"
          style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
        >
          Still empty
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#737373]">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex h-12 items-center justify-center bg-[#0a0a0a] px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#262626]"
        >
          Shop the Drop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Header */}
        <div className="mb-8 border-t border-[#e5e5e5] pt-6 sm:mb-10 sm:pt-8">
          <p className="mb-1.5 text-[9px] uppercase tracking-[0.28em] text-[#a3a3a3]">
            Checkout
          </p>
          <h1
            className="text-3xl font-extrabold uppercase tracking-tight text-[#0a0a0a] sm:text-4xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Your Bag
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-16 xl:grid-cols-[1fr_380px]">

          {/* ── Items list ── */}
          <div>
            {items.map((item, idx) => {
              const lineTotal = parseFloat(item.price) * item.quantity;
              return (
                <div key={item.variantId}>
                  {idx > 0 && <div className="border-t border-[#e5e5e5]" />}
                  <div className="flex gap-4 py-6 sm:gap-6">
                    {/* Thumbnail */}
                    <Link to={`/product/${item.handle}`} className="shrink-0">
                      <div className="h-24 w-[72px] overflow-hidden bg-[#f5f5f5] sm:h-28 sm:w-20">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.handle}`}
                            className="block truncate text-[13px] font-medium text-[#0a0a0a] transition-colors hover:text-[#737373]"
                          >
                            {item.title}
                          </Link>
                          {item.variantTitle && item.variantTitle !== 'Default Title' && (
                            <p className="mt-0.5 text-[11px] text-[#a3a3a3]">
                              {item.variantTitle}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-[13px] font-medium text-[#0a0a0a]">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity stepper */}
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center border border-[#e5e5e5] text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
                          >
                            −
                          </button>
                          <span className="flex h-8 min-w-[2rem] items-center justify-center border-y border-[#e5e5e5] text-[12px] font-medium text-[#0a0a0a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center border border-[#e5e5e5] text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[10px] uppercase tracking-[0.16em] text-[#a3a3a3] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-[#e5e5e5]" />
          </div>

          {/* ── Order summary ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">

            <p className="mb-5 text-[9px] uppercase tracking-[0.26em] text-[#a3a3a3]">
              Summary
            </p>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[13px] text-[#737373]">Subtotal</span>
                <span className="text-[13px] font-medium text-[#0a0a0a]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#737373]">Shipping</span>
                <span className="text-[13px] text-[#a3a3a3]">At checkout</span>
              </div>
            </div>

            <div className="my-5 border-t border-[#e5e5e5]" />

            <div className="flex justify-between">
              <span className="text-[13px] font-semibold text-[#0a0a0a]">Total</span>
              <span className="text-lg font-bold text-[#0a0a0a]">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Error */}
            {checkoutError && (
              <div className="mt-4 border border-[#dc2626]/20 bg-[#dc2626]/5 px-4 py-3">
                <p className="text-[11px] text-[#dc2626]">{checkoutError}</p>
              </div>
            )}

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || items.length === 0}
              className="mt-6 w-full bg-[#0a0a0a] py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 hover:bg-[#262626] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <Link
              to="/"
              className="mt-4 block text-center text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
