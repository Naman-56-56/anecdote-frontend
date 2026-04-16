export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width: number | null;
  height: number | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  gid: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  inventoryQuantity: number;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  image: { url: string; altText: string } | null;
}

export interface PriceRange {
  min: string;
  max: string;
  currencyCode: string;
}

export interface Product {
  id: string;
  gid: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  priceRange: PriceRange;
}

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: string;
  quantity: number;
  image: string;
  handle: string;
}

export interface OrderLineItem {
  variantId: string;
  quantity: number;
}

export interface OrderResponse {
  orderId: string;
  name: string;
  checkoutUrl: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    title: string;
    quantity: number;
    total: string;
  }[];
}
