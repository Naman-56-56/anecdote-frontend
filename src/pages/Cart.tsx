import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { completeCheckout } from '../services/checkout';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import SectionWrapper from '../components/SectionWrapper';

function formatEUR(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  /**
   * Handle checkout - initiates Shopify checkout flow
   */
  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);

      // Proceed to Shopify checkout
      await completeCheckout(items);
      // Note: completeCheckout redirects to Shopify, so code after this won't execute
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to proceed to checkout';
      setCheckoutError(errorMessage);
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <SectionWrapper>
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <h1
        className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        Cart
      </h1>
      <p className="mb-10 max-w-2xl text-sm leading-6 text-slate-500">
        Review your selection, adjust quantities, and continue to checkout when you’re ready.
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {items.map((item) => {
            const lineTotal = parseFloat(item.price) * item.quantity;

            return (
              <div key={item.variantId} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:gap-5 md:p-5">
                <Link to={`/product/${item.handle}`} className="shrink-0">
                  <div className="h-28 w-20 overflow-hidden rounded-2xl bg-slate-100 md:h-32 md:w-24">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <Link
                      to={`/product/${item.handle}`}
                      className="block truncate text-sm font-medium text-slate-900 transition-colors duration-300 hover:text-slate-600"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle &&
                      item.variantTitle !== 'Default Title' && (
                        <p className="text-xs text-slate-500">
                          {item.variantTitle}
                        </p>
                      )}
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="px-3 py-1.5 text-sm text-slate-500 transition-all duration-300 hover:bg-white hover:text-slate-900"
                      >
                        &minus;
                      </button>
                      <span className="min-w-10 px-3 py-1.5 text-center text-xs font-medium text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="px-3 py-1.5 text-sm text-slate-500 transition-all duration-300 hover:bg-white hover:text-slate-900"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-slate-900">
                        {formatEUR(lineTotal)}
                      </span>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition-colors duration-300 hover:text-slate-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Order Summary
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="text-sm font-medium text-slate-900">
                {formatEUR(subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-slate-500">Shipping</span>
              <span className="text-sm text-slate-500">
                Calculated at checkout
              </span>
            </div>
            <div className="border-t border-slate-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-900">Total</span>
                <span className="text-lg font-semibold text-slate-900">
                  {formatEUR(subtotal)}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {checkoutError && (
              <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-xs text-rose-700">{checkoutError}</p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckout}
              disabled={isCheckingOut || items.length === 0}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </Button>

            <Link
              to="/shop"
              className="mt-4 block text-center text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition-colors duration-300 hover:text-slate-900"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
