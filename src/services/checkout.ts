/**
 * Shopify Checkout Service
 *
 * Handles the checkout flow including:
 * - Preparing cart items for checkout
 * - Creating checkout with Shopify
 * - Redirecting to Shopify hosted checkout
 * - Error handling
 */

import { createCheckout } from './shopify';
import type { CartItem } from '../types';

interface CheckoutLineItem {
  variantId: string;
  quantity: number;
}

interface CheckoutResult {
  id: string;
  webUrl: string;
  lineItems: Array<{
    title: string;
    quantity: number;
    variantId: string;
    price: string;
  }>;
}

/**
 * Convert CartItem array to CheckoutLineItem array
 * Required format for Shopify checkout API
 */
export function prepareLineItems(cartItems: CartItem[]): CheckoutLineItem[] {
  return cartItems.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));
}

/**
 * Create checkout and redirect to Shopify's hosted checkout
 * Optionally clear cart after successful redirect
 */
export async function proceedToCheckout(
  cartItems: CartItem[],
): Promise<CheckoutResult> {
  try {
    // Validate cart
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Your cart is empty. Please add items before checking out.');
    }

    // Prepare line items
    const lineItems = prepareLineItems(cartItems);

    // Create checkout with Shopify
    const checkout = await createCheckout(lineItems);

    // Store checkout ID in session for reference
    sessionStorage.setItem('shopify_checkout_id', checkout.id);

    return checkout;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout';
    console.error('Checkout error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Redirect user to Shopify hosted checkout
 */
export function redirectToCheckout(checkoutUrl: string): void {
  if (!checkoutUrl) {
    throw new Error('Invalid checkout URL');
  }

  let finalCheckoutUrl = checkoutUrl;

  try {
    const parsed = new URL(checkoutUrl);
    const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;

    // Some stores return checkout URLs on a custom domain. If DNS is not configured,
    // fall back to the canonical myshopify storefront domain.
    if (
      storeDomain &&
      parsed.hostname !== storeDomain &&
      !parsed.hostname.endsWith('.myshopify.com')
    ) {
      parsed.hostname = storeDomain;
      finalCheckoutUrl = parsed.toString();
      console.warn('[Checkout] Rewrote checkout URL to Shopify store domain', {
        original: checkoutUrl,
        rewritten: finalCheckoutUrl,
      });
    }
  } catch {
    // Keep original URL if parsing fails.
  }

  // Redirect to Shopify checkout
  window.location.href = finalCheckoutUrl;
}

/**
 * Complete checkout flow:
 * 1. Create checkout
 * 2. Redirect to Shopify
 */
export async function completeCheckout(
  cartItems: CartItem[],
): Promise<void> {
  try {
    const checkout = await proceedToCheckout(cartItems);
    redirectToCheckout(checkout.webUrl);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Checkout failed';
    console.error('Complete checkout error:', errorMessage);
    throw error;
  }
}

/**
 * Format currency for display
 */
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

/**
 * Calculate cart totals
 */
export interface CartTotals {
  subtotal: number;
  itemCount: number;
  formattedSubtotal: string;
  currencyCode?: string;
}

export function calculateCartTotals(
  cartItems: CartItem[],
  currencyCode: string = 'USD',
): CartTotals {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  return {
    itemCount,
    subtotal,
    formattedSubtotal: formatPrice(subtotal.toString(), currencyCode),
    currencyCode,
  };
}

/**
 * Check if checkout was successful (return from Shopify)
 */
export function wasCheckoutSuccessful(): boolean {
  const checkoutId = sessionStorage.getItem('shopify_checkout_id');
  return !!checkoutId;
}

/**
 * Clear checkout session data
 */
export function clearCheckoutSession(): void {
  sessionStorage.removeItem('shopify_checkout_id');
}

/**
 * Get checkout ID from session
 */
export function getCheckoutId(): string | null {
  return sessionStorage.getItem('shopify_checkout_id');
}
