/**
 * Backward-compatible API surface.
 *
 * Runtime Shopify Storefront API logic now lives in `shopify.ts`.
 * Keep this file only as a thin compatibility layer for existing imports.
 */

export {
  createCheckout,
  fetchProduct,
  fetchProducts,
  formatShopifyError,
  getProductByHandle,
  getProductById,
  getProducts,
  isShopifyError,
} from './shopify';

export type {
  ShopifyCheckoutLineItem,
  ShopifyCheckoutResponse,
  ShopifyMoney,
} from './shopify';
