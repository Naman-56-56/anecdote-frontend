import type { Product, ProductImage, ProductVariant } from '../types';

export type ProductsSource = 'shopify' | 'mock-empty' | 'mock-error';

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyCheckoutLineItem {
  variantId: string;
  quantity: number;
}

export interface ShopifyCheckoutResponse {
  id: string;
  webUrl: string;
  lineItems: Array<{
    title: string;
    quantity: number;
    variantId: string;
    price: string;
  }>;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number | null;
        height: number | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: ShopifyMoney;
        compareAtPrice: ShopifyMoney | null;
        availableForSale: boolean;
        quantityAvailable: number | null;
        selectedOptions: Array<{ name: string; value: string }>;
        image: {
          url: string;
          altText: string | null;
        } | null;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
}

interface GetProductsResponse {
  products: {
    edges: Array<{ node: ProductNode }>;
  };
}

interface GetProductByHandleResponse {
  productByHandle: ProductNode | null;
}

interface GetProductByIdResponse {
  product: ProductNode | null;
}

interface CreateCheckoutResponse {
  checkoutCreate: {
    checkout?: {
      id: string;
      webUrl: string;
      lineItems: {
        edges: Array<{
          node: {
            title: string;
            quantity: number;
            variant: {
              id: string;
              price: ShopifyMoney;
            };
          };
        }>;
      };
    };
    userErrors?: Array<{ message: string; field: string[] }>;
  };
}

interface CreateCartResponse {
  cartCreate: {
    cart?: {
      id: string;
      checkoutUrl: string;
      lines: {
        edges: Array<{
          node: {
            quantity: number;
            merchandise: {
              id?: string;
              title?: string;
              price?: {
                amount: string;
                currencyCode: string;
              };
            };
          };
        }>;
      };
    };
    userErrors?: Array<{ field: string[]; message: string }>;
  };
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    gid: 'gid://shopify/Product/1000000001',
    title: 'Test Shirt',
    handle: 'test-shirt',
    description: 'Sample product for testing',
    descriptionHtml: '<p>Sample product for testing</p>',
    productType: 'Apparel',
    tags: ['demo', 'shirt'],
    images: [
      {
        id: 'mock-image-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
        altText: 'Test shirt',
        width: 900,
        height: 1200,
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/12345678901',
        gid: 'gid://shopify/ProductVariant/12345678901',
        title: 'M / Black',
        price: '499',
        compareAtPrice: null,
        inventoryQuantity: 24,
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: 'M' },
          { name: 'Color', value: 'Black' },
        ],
        image: {
          url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
          altText: 'Test shirt',
        },
      },
      {
        id: 'gid://shopify/ProductVariant/12345678902',
        gid: 'gid://shopify/ProductVariant/12345678902',
        title: 'L / Black',
        price: '499',
        compareAtPrice: null,
        inventoryQuantity: 0,
        availableForSale: false,
        selectedOptions: [
          { name: 'Size', value: 'L' },
          { name: 'Color', value: 'Black' },
        ],
        image: {
          url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
          altText: 'Test shirt',
        },
      },
    ],
    priceRange: {
      min: '499',
      max: '499',
      currencyCode: 'INR',
    },
  },
  {
    id: 'mock-2',
    gid: 'gid://shopify/Product/1000000002',
    title: 'Demo Hoodie',
    handle: 'demo-hoodie',
    description: 'Heavyweight hoodie used for storefront testing',
    descriptionHtml: '<p>Heavyweight hoodie used for storefront testing</p>',
    productType: 'Apparel',
    tags: ['demo', 'hoodie'],
    images: [
      {
        id: 'mock-image-2',
        url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
        altText: 'Demo hoodie',
        width: 900,
        height: 1200,
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/12345678903',
        gid: 'gid://shopify/ProductVariant/12345678903',
        title: 'S / Grey',
        price: '799',
        compareAtPrice: '999',
        inventoryQuantity: 14,
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: 'S' },
          { name: 'Color', value: 'Grey' },
        ],
        image: {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
          altText: 'Demo hoodie',
        },
      },
      {
        id: 'gid://shopify/ProductVariant/12345678904',
        gid: 'gid://shopify/ProductVariant/12345678904',
        title: 'M / Grey',
        price: '799',
        compareAtPrice: '999',
        inventoryQuantity: 9,
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: 'M' },
          { name: 'Color', value: 'Grey' },
        ],
        image: {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
          altText: 'Demo hoodie',
        },
      },
    ],
    priceRange: {
      min: '799',
      max: '799',
      currencyCode: 'INR',
    },
  },
  {
    id: 'mock-3',
    gid: 'gid://shopify/Product/1000000003',
    title: 'Sample Cap',
    handle: 'sample-cap',
    description: 'Cap product for variant and availability testing',
    descriptionHtml: '<p>Cap product for variant and availability testing</p>',
    productType: 'Accessories',
    tags: ['demo', 'cap'],
    images: [
      {
        id: 'mock-image-3',
        url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
        altText: 'Sample cap',
        width: 900,
        height: 1200,
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/12345678905',
        gid: 'gid://shopify/ProductVariant/12345678905',
        title: 'Black',
        price: '299',
        compareAtPrice: null,
        inventoryQuantity: 20,
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
        image: {
          url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
          altText: 'Sample cap',
        },
      },
      {
        id: 'gid://shopify/ProductVariant/12345678906',
        gid: 'gid://shopify/ProductVariant/12345678906',
        title: 'Brown',
        price: '299',
        compareAtPrice: null,
        inventoryQuantity: 6,
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Brown' }],
        image: {
          url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
          altText: 'Sample cap',
        },
      },
    ],
    priceRange: {
      min: '299',
      max: '299',
      currencyCode: 'INR',
    },
  },
];

let lastProductsSource: ProductsSource = 'shopify';
const MOCK_VARIANT_IDS = new Set(
  MOCK_PRODUCTS.flatMap((product) => product.variants.map((variant) => variant.id)),
);

export function useMockProducts(source: ProductsSource): Product[] {
  lastProductsSource = source;
  console.info('[Shopify] Using mock product fallback', { source, count: MOCK_PRODUCTS.length });
  return MOCK_PRODUCTS;
}

export function getProductsSource(): ProductsSource {
  return lastProductsSource;
}

function getConfig() {
  const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION;

  if (!storeDomain || !storefrontToken || !apiVersion) {
    throw new Error(
      'Missing Shopify environment variables: VITE_SHOPIFY_STORE_DOMAIN, VITE_SHOPIFY_STOREFRONT_TOKEN, VITE_SHOPIFY_API_VERSION',
    );
  }

  return {
    endpoint: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    token: storefrontToken,
  };
}

async function shopifyRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { endpoint, token } = getConfig();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables: variables ?? {} }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: HTTP ${response.status}`);
  }

  const result = (await response.json()) as ShopifyGraphQLResponse<T>;

  if (result.errors?.length) {
    throw new Error(`GraphQL error: ${result.errors[0].message}`);
  }

  if (!result.data) {
    throw new Error('No data returned from Shopify API');
  }

  return result.data;
}

function mapImage(node: ProductNode['images']['edges'][number]['node']): ProductImage {
  return {
    id: node.id,
    url: node.url,
    altText: node.altText ?? '',
    width: node.width,
    height: node.height,
  };
}

function mapVariant(node: ProductNode['variants']['edges'][number]['node']): ProductVariant {
  return {
    id: node.id,
    gid: node.id,
    title: node.title,
    price: node.price.amount,
    compareAtPrice: node.compareAtPrice?.amount ?? null,
    inventoryQuantity: node.quantityAvailable ?? 0,
    availableForSale: node.availableForSale,
    selectedOptions: node.selectedOptions ?? [],
    image: node.image
      ? {
          url: node.image.url,
          altText: node.image.altText ?? '',
        }
      : null,
  };
}

function mapProduct(node: ProductNode): Product {
  return {
    id: node.id,
    gid: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    productType: node.productType,
    tags: node.tags ?? [],
    images: node.images.edges.map((edge) => mapImage(edge.node)),
    variants: node.variants.edges.map((edge) => mapVariant(edge.node)),
    priceRange: {
      min: node.priceRange.minVariantPrice.amount,
      max: node.priceRange.maxVariantPrice.amount,
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
    },
  };
}

export async function getProducts(first: number = 250): Promise<Product[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            productType
            tags
            images(first: 2) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest<GetProductsResponse>(query, { first });
    console.log("Shopify products:", data);
    const products = data.products.edges.map(({ node }) => mapProduct(node));

    if (products.length === 0) {
      console.warn('[Shopify] Storefront API returned exactly 0 products. Please verify products are PUBLISHED strictly to the Storefront App channel in Shopify Admin.');
    }

    lastProductsSource = 'shopify';
    return products;
  } catch (error) {
    console.error('[Shopify] getProducts failed physically.', error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        productType
        tags
        images(first: 250) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest<GetProductByHandleResponse>(query, {
      handle,
    });

    if (data.productByHandle) {
      return mapProduct(data.productByHandle);
    }

    const mockProduct = MOCK_PRODUCTS.find((product) => product.handle === handle);
    if (mockProduct) {
      console.info('[Shopify] Product not found in API, using mock product by handle', { handle });
      return mockProduct;
    }

    throw new Error(`Product not found: ${handle}`);
  } catch (error) {
    const mockProduct = MOCK_PRODUCTS.find((product) => product.handle === handle);
    if (mockProduct) {
      console.info('[Shopify] getProductByHandle failed, using mock product', { handle });
      return mockProduct;
    }
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  const query = `
    query GetProductById($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        descriptionHtml
        productType
        tags
        images(first: 250) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const data = await shopifyRequest<GetProductByIdResponse>(query, { id });

  if (!data.product) {
    throw new Error(`Product not found: ${id}`);
  }

  return mapProduct(data.product);
}

export function isValidVariantGid(variantId: string): boolean {
  return /^gid:\/\/shopify\/ProductVariant\/\d+$/.test(variantId);
}

export async function createCheckout(
  lineItems: ShopifyCheckoutLineItem[],
): Promise<ShopifyCheckoutResponse> {
  if (!lineItems.length) {
    throw new Error('Cannot create checkout: cart is empty');
  }

  for (const item of lineItems) {
    if (!isValidVariantGid(item.variantId)) {
      throw new Error(
        `Invalid variantId format: ${item.variantId}. Expected gid://shopify/ProductVariant/...`,
      );
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid quantity for variant ${item.variantId}`);
    }
  }

  if (lineItems.some((item) => MOCK_VARIANT_IDS.has(item.variantId))) {
    throw new Error(
      'Demo products cannot be checked out. Add real products in Shopify Admin and use their real variants for checkout.',
    );
  }

  const checkoutCreateMutation = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 250) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest<CreateCheckoutResponse>(checkoutCreateMutation, {
      input: { lineItems },
    });

    if (data.checkoutCreate.userErrors?.length) {
      throw new Error(`Checkout error: ${data.checkoutCreate.userErrors[0].message}`);
    }

    if (!data.checkoutCreate.checkout?.webUrl) {
      throw new Error('Checkout creation failed: missing checkout URL');
    }

    return {
      id: data.checkoutCreate.checkout.id,
      webUrl: data.checkoutCreate.checkout.webUrl,
      lineItems: data.checkoutCreate.checkout.lineItems.edges.map(({ node }) => ({
        title: node.title,
        quantity: node.quantity,
        variantId: node.variant.id,
        price: node.variant.price.amount,
      })),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    const shouldFallbackToCart =
      message.includes("CheckoutCreateInput isn't a defined input type") ||
      message.includes("Cannot query field 'checkoutCreate'");

    if (!shouldFallbackToCart) {
      throw error;
    }

    console.info('[Shopify] checkoutCreate unavailable, falling back to cartCreate');

    const cartCreateMutation = `
      mutation CreateCart($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const cartData = await shopifyRequest<CreateCartResponse>(cartCreateMutation, {
      lines: lineItems.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    });

    if (cartData.cartCreate.userErrors?.length) {
      throw new Error(`Checkout error: ${cartData.cartCreate.userErrors[0].message}`);
    }

    if (!cartData.cartCreate.cart?.checkoutUrl) {
      throw new Error('Cart creation failed: missing checkout URL');
    }

    const cartLineItems = cartData.cartCreate.cart.lines.edges.map(({ node }) => {
      if (!node.merchandise.id) {
        throw new Error('Cart creation failed: missing variant ID in response');
      }

      return {
        title: node.merchandise.title ?? 'Product Variant',
        quantity: node.quantity,
        variantId: node.merchandise.id,
        price: node.merchandise.price?.amount ?? '0',
      };
    });

    return {
      id: cartData.cartCreate.cart.id,
      webUrl: cartData.cartCreate.cart.checkoutUrl,
      lineItems: cartLineItems,
    };
  }
}

export function isShopifyError(error: unknown): error is Error {
  return error instanceof Error;
}

export function formatShopifyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

export async function fetchProducts(): Promise<Product[]> {
  return getProducts();
}

export async function fetchProduct(handle: string): Promise<Product> {
  return getProductByHandle(handle);
}
