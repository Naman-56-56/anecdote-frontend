# Shopify Storefront API Integration Guide

Complete integration guide for fetching products from Shopify using GraphQL Storefront API.

## 📋 Overview

This integration provides two main functions:

1. **`getProducts()`** - Fetch all products from your Shopify store
2. **`getProductByHandle(handle)`** - Fetch detailed product information by product handle

## ✅ Quick Start

### 1. Environment Setup

Add the following to your `.env` file:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
VITE_SHOPIFY_API_VERSION=2024-10
```

**Note:** Variables must be prefixed with `VITE_` to be exposed to the frontend in Vite-based projects.

### 2. Get Your Credentials

1. Go to your Shopify Admin
2. Navigate to **Apps and integrations** → **App and sales channel settings** → **Storefront API**
3. Copy your:
   - Store Domain: `your-store.myshopify.com`
   - Storefront Access Token
   - API Version (e.g., 2024-10)

### 3. File Structure

```
frontend/src/
├── services/
│   ├── api.ts                          ← Main API functions
│   └── SHOPIFY_INTEGRATION_GUIDE.ts    ← Detailed examples
├── pages/
│   ├── ShopifyShopPage.tsx             ← Products list component
│   └── ShopifyProductPage.tsx          ← Product detail component
└── types/
    └── index.ts                        ← TypeScript types
```

## 🚀 API Functions

### getProducts()

Fetches a list of products with basic information.

```typescript
import { getProducts } from '../services/api';

// Usage
const products = await getProducts();

// Returns Array of:
// {
//   id: string;
//   title: string;
//   description: string;
//   handle: string;
//   image: { url: string; altText: string } | null;
//   price: { amount: string; currencyCode: string } | null;
//   availableForSale: boolean;
// }
```

**GraphQL Fields Fetched:**
- Product ID, Title, Description, Handle
- First image (URL and alt text)
- First variant's price and availability
- Price range

### getProductByHandle(handle)

Fetches complete product information including all images and variants.

```typescript
import { getProductByHandle } from '../services/api';

// Usage
const product = await getProductByHandle('my-product-handle');

// Returns:
// {
//   id: string;
//   title: string;
//   description: string;
//   handle: string;
//   productType: string;
//   tags: string[];
//   images: Array<{ url: string; altText: string }>;
//   variants: Array<{
//     id: string;
//     title: string;
//     price: string;
//     currencyCode: string;
//     availableForSale: boolean;
//     image?: { url: string; altText: string };
//   }>;
//   priceRange: {
//     min: string;
//     max: string;
//     currencyCode: string;
//   };
// }
```

**GraphQL Fields Fetched:**
- All product details
- All images (up to 250)
- All variants (up to 250) with individual prices and availability
- Price range (min/max across all variants)

## 📄 Example Components

### 1. Products List Page (`ShopifyShopPage.tsx`)

Complete implementation showing:
- Loading and error states
- Search/filter functionality
- Product card display
- Price formatting

**Usage:**
```typescript
// Add to your router
import ShopifyShopPage from './pages/ShopifyShopPage';

<Route path="/shop" element={<ShopifyShopPage />} />
```

### 2. Product Detail Page (`ShopifyProductPage.tsx`)

Complete implementation showing:
- Image gallery with thumbnails
- Variant selection
- Quantity selector
- Availability status
- Tags display

**Usage:**
```typescript
// Add to your router
import ShopifyProductPage from './pages/ShopifyProductPage';

<Route path="/product/:handle" element={<ShopifyProductPage />} />
```

## 💻 Usage Examples

### Fetch All Products

```typescript
import { getProducts } from '../services/api';
import { useEffect, useState } from 'react';

function MyShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image?.url} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price?.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Fetch Single Product

```typescript
import { getProductByHandle } from '../services/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductByHandle(handle!);
      setProduct(data);
      if (data.variants.length > 0) {
        setSelectedVariantId(data.variants[0].id);
      }
    };
    loadProduct();
  }, [handle]);

  const selectedVariant = product?.variants.find(
    (v: any) => v.id === selectedVariantId
  );

  return (
    <div>
      <h1>{product?.title}</h1>
      
      {/* Display all images */}
      <div className="image-gallery">
        {product?.images.map((img: any, idx: number) => (
          <img key={idx} src={img.url} alt={img.altText} />
        ))}
      </div>

      {/* List all variants */}
      <select 
        value={selectedVariantId || ''} 
        onChange={(e) => setSelectedVariantId(e.target.value)}
      >
        {product?.variants.map((v: any) => (
          <option key={v.id} value={v.id}>
            {v.title} - ${v.price}
          </option>
        ))}
      </select>

      <button>Add to Cart</button>
    </div>
  );
}
```

### Custom Hook for Product Fetching

```typescript
// hooks/useShopifyProduct.ts
import { useEffect, useState } from 'react';
import { getProductByHandle } from '../services/api';

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{ url: string; altText: string }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
  }>;
  priceRange: { min: string; max: string; currencyCode: string };
}

export function useShopifyProduct(handle: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  return { product, loading, error };
}

// Usage:
function MyProduct({ handle }: { handle: string }) {
  const { product, loading, error } = useShopifyProduct(handle);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{product?.title}</div>;
}
```

## 🔄 GraphQL Queries

The functions use the following GraphQL queries:

### getProducts Query

```graphql
query GetProducts {
  products(first: 250) {
    edges {
      node {
        id
        title
        description
        handle
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
      }
    }
  }
}
```

### getProductByHandle Query

```graphql
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    description
    handle
    images(first: 250) { ... }
    variants(first: 250) { ... }
    priceRange { ... }
    productType
    tags
  }
}
```

To add custom fields, modify the queries in `src/services/api.ts`.

## ⚙️ Configuration

### Modify Query Fields

Edit `src/services/api.ts` to customize which fields are fetched:

```typescript
// Add fields to the query
query GetProducts {
  products(first: 250) {
    edges {
      node {
        id
        title
        description
        handle
        // Add more fields here
        vendor
        collections(first: 3) {
          edges { node { title } }
        }
        // ... etc
      }
    }
  }
}
```

### Pagination

Modify the `first` parameter to fetch more/fewer products:

```typescript
// Fetch 50 products instead of 250
products(first: 50) { ... }
```

### Filter Products

Add filters to the query:

```typescript
// Only get products with specific tags
products(first: 250, query: "tag:featured") { ... }
```

## 🛡️ Error Handling

The functions include built-in error handling:

```typescript
try {
  const product = await getProductByHandle('my-handle');
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('not found')) {
      console.error('Product not found');
    } else if (error.message.includes('GraphQL error')) {
      console.error('GraphQL query error');
    } else if (error.message.includes('Missing Shopify')) {
      console.error('Environment variables not set');
    }
  }
}
```

## 🔐 Security Notes

- **Storefront Token** is public-facing and safe to expose to frontend (by Shopify design)
- Use **Admin API token** for sensitive operations (never expose to frontend)
- Store sensitive tokens in backend `.env` file only
- Frontend `.env` variables should use `VITE_` prefix

## 📊 Limits & Performance

- **API Rate Limit:** Shopify allows generous rate limits for Storefront API
- **Product Limit:** Currently fetching max 250 products per query
- **Implementation:** Add pagination or caching if needed

### Caching Strategy (Optional)

```typescript
const productCache = new Map();

export async function getCachedProduct(handle: string) {
  if (productCache.has(handle)) {
    return productCache.get(handle);
  }
  
  const product = await getProductByHandle(handle);
  productCache.set(handle, product);
  return product;
}
```

## 🧪 Testing

Example test cases:

```typescript
import { getProducts, getProductByHandle } from '../services/api';

describe('Shopify API', () => {
  it('should fetch products', async () => {
    const products = await getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products[0]).toHaveProperty('id');
  });

  it('should fetch product by handle', async () => {
    const product = await getProductByHandle('test-product');
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('variants');
  });

  it('should throw error for invalid handle', async () => {
    await expect(getProductByHandle('invalid-handle')).rejects.toThrow();
  });
});
```

## 📚 Additional Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [GraphQL Playground](https://shopifystorefrontapiplayground.myshopify.com/)
- [Shopify Admin](https://admin.shopify.com/)

## 🤝 Support

For issues or questions:

1. Check the `SHOPIFY_INTEGRATION_GUIDE.ts` file for detailed examples
2. Verify environment variables are set correctly
3. Check browser console for detailed error messages
4. Refer to Shopify API documentation

---

**Created:** 2024
**Version:** 1.0
**API Version:** 2024-10
