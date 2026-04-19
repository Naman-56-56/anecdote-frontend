import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { completeCheckout } from '../services/checkout';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import EmptyState from '../components/EmptyState';

function formatEUR(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePlaceOrder() {
    setLoading(true);
    setError(null);

    try {
      await completeCheckout(items);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to place order',
      );
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <SectionWrapper>
        <EmptyState
          title="Nothing to checkout"
          description="Add some items to your cart first."
          actionLabel="Shop Now"
          actionTo="/"
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper narrow>
      <h1
        className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        Checkout
      </h1>
      <div className="mb-10 h-0.5 w-16 bg-slate-300" />

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Order Summary
        </h2>

        <div className="divide-y divide-slate-200">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{item.title}</p>
                {item.variantTitle &&
                  item.variantTitle !== 'Default Title' && (
                    <p className="text-xs text-slate-500">{item.variantTitle}</p>
                  )}
                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-slate-900">
                {formatEUR(parseFloat(item.price) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold uppercase text-slate-900">Total</span>
            <span className="text-xl font-semibold text-slate-900">{formatEUR(subtotal)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? 'Processing…' : 'Place Order'}
      </Button>

      <p className="mt-4 text-center text-xs text-slate-500">
        You will be redirected to complete your payment securely.
      </p>
    </SectionWrapper>
  );
}
