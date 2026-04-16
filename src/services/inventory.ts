/**
 * Inventory and Availability Utilities
 *
 * Provides helper functions for checking product and variant availability
 * throughout the application
 */

/**
 * Check if a product is available based on its variants
 */
export function isProductAvailable(availableForSale: boolean): boolean {
  return availableForSale === true;
}

/**
 * Check if a variant is available
 */
export function isVariantAvailable(availableForSale: boolean): boolean {
  return availableForSale === true;
}

/**
 * Get availability status text
 */
export function getAvailabilityStatus(availableForSale: boolean): {
  text: string;
  color: string;
  isDot: boolean;
} {
  return availableForSale
    ? { text: 'In Stock', color: 'text-green-500', isDot: true }
    : { text: 'Out of Stock', color: 'text-red-500', isDot: false };
}

/**
 * Get availability badge info for UI
 */
export function getAvailabilityBadge(availableForSale: boolean) {
  return {
    isAvailable: availableForSale,
    label: availableForSale ? 'In Stock' : 'Out of Stock',
    bgColor: availableForSale ? 'bg-green-500' : 'bg-red-500',
    textColor: availableForSale ? 'text-green-400' : 'text-red-400',
  };
}

/**
 * Filter available variants from an array
 */
export function getAvailableVariants<
  T extends { availableForSale: boolean }
>(variants: T[]): T[] {
  return variants.filter((v) => v.availableForSale);
}

/**
 * Check if at least one variant is available
 */
export function hasAvailableVariants<
  T extends { availableForSale: boolean }
>(variants: T[]): boolean {
  return variants.some((v) => v.availableForSale);
}

/**
 * Get the first available variant
 */
export function getFirstAvailableVariant<
  T extends { availableForSale: boolean }
>(variants: T[]): T | null {
  return variants.find((v) => v.availableForSale) || null;
}

/**
 * Count available variants
 */
export function countAvailableVariants<
  T extends { availableForSale: boolean }
>(variants: T[]): number {
  return variants.filter((v) => v.availableForSale).length;
}

/**
 * Get CSS classes for availability styling
 */
export function getAvailabilityClasses(availableForSale: boolean): string {
  return availableForSale
    ? 'opacity-100'
    : 'opacity-75 grayscale';
}

/**
 * Get CSS classes for button state based on availability
 */
export function getButtonStateClasses(availableForSale: boolean): string {
  return availableForSale
    ? 'hover:bg-brand-orange/90 active:bg-brand-orange'
    : 'opacity-50 cursor-not-allowed';
}

/**
 * Get variant chip styling based on availability
 */
export function getVariantChipClasses(
  isSelected: boolean,
  availableForSale: boolean,
): string {
  const baseClasses = 'px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm';
  const selectedClasses = isSelected
    ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
    : 'border-white/20 text-white hover:border-brand-orange hover:bg-white/5';
  const disabledClasses = !availableForSale
    ? 'opacity-40 cursor-not-allowed line-through'
    : '';

  return `${baseClasses} ${selectedClasses} ${disabledClasses}`;
}

/**
 * Validation helper: Check if item can be added to cart
 */
export function canAddToCart(
  availableForSale: boolean,
  quantity: number = 1,
): boolean {
  return availableForSale && quantity > 0;
}

/**
 * Get error message for unavailable product
 */
export function getUnavailableMessage(
  productName: string,
  availableVariantsCount: number = 0,
): string {
  if (availableVariantsCount > 0) {
    return `This option is out of stock. Please select another option.`;
  }
  return `${productName} is currently out of stock.`;
}

/**
 * Format availability info for display
 */
export function formatAvailabilityInfo(
  isAvailable: boolean,
  variantCount?: number,
  availableCount?: number,
): string {
  if (!isAvailable) {
    return 'Out of Stock';
  }

  if (variantCount && availableCount && availableCount < variantCount) {
    return `In Stock (${availableCount} of ${variantCount} options)`;
  }

  return 'In Stock';
}

/**
 * Check availability for quick add workflows
 * Returns availability status and any blockers
 */
export function getQuickAddStatus(
  productAvailable: boolean,
  variantSelected: boolean,
  variantAvailable: boolean,
): {
  canAdd: boolean;
  reason?: string;
  isDimmed: boolean;
} {
  if (!productAvailable) {
    return {
      canAdd: false,
      reason: 'Product is out of stock',
      isDimmed: true,
    };
  }

  if (!variantSelected) {
    return {
      canAdd: false,
      reason: 'Please select a variant',
      isDimmed: false,
    };
  }

  if (!variantAvailable) {
    return {
      canAdd: false,
      reason: 'Selected variant is out of stock',
      isDimmed: true,
    };
  }

  return {
    canAdd: true,
    isDimmed: false,
  };
}

/**
 * Inventory level descriptions (for future use with stock levels)
 */
export function getInventoryLevelDescription(
  count: number,
): 'In Stock' | 'Low Stock' | 'Out of Stock' {
  if (count === 0) return 'Out of Stock';
  if (count <= 5) return 'Low Stock';
  return 'In Stock';
}
