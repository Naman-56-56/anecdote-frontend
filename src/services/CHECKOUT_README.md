# Shopify Checkout Flow Implementation

Complete end-to-end Shopify checkout implementation using GraphQL Storefront API.

## Overview

This implementation provides a complete checkout flow:

1. **Add to Cart** - Product page allows adding items to cart (localStorage)
2. **View Cart** - Cart page displays items with manage options
3. **Checkout** - Direct integration with Shopify's hosted checkout
4. **Payment** - User completes payment on Shopify
5. **Return** - User redirected back to your site

## Architecture

```
Product Page
    ↓
Add to Cart (CartContext)
    ↓
Cart Storage (localStorage)
    ↓
Cart Page
    ↓
Checkout Button
    ↓
createCheckout() - GraphQL Mutation
    ↓
Shopify Hosted Checkout
    ↓
Return to Site
```

## File Structure

```
frontend/src/
├── services/
│   ├── api.ts                              ← createCheckout mutation
│   ├── checkout.ts                         ← Checkout service logic
│   ├── CHECKOUT_IMPLEMENTATION_GUIDE.ts    ← Detailed guide
│   └── CHECKOUT_QUICK_REFERENCE.ts         ← Quick lookup
├── pages/
│   ├── Cart.tsx                            ← Shopping cart with checkout
│   └── ShopifyProductPage.tsx              ← Add to cart
└── context/
    └── CartContext.tsx                     ← Cart state management
```

## Quick Start

### 1. Environment Setup

```env
VITE_SHOPIFY_STORE_DOMAIN=anecdote-5002.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=b87b60f59123d50d593ab1aa68735588
VITE_SHOPIFY_API_VERSION=2024-10
```

### 2. Add Product to Cart

```typescript
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      variantId: 'gid://shopify/ProductVariant/123',
      productId: 'gid://shopify/Product/456',
      title: 'Product Name',
      variantTitle: 'Size M',
      price: '99.99',
      quantity: 1,
      image: 'https://...',
      handle: 'product-handle',
    });
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

### 3. Checkout from Cart Page

```typescript
import { useCart } from '../context/CartContext';
import { completeCheckout } from '../services/checkout';

function CartPage() {
  const { items } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      // This redirects to Shopify checkout
      await completeCheckout(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <button onClick={handleCheckout} disabled={isCheckingOut}>
        {isCheckingOut ? 'Processing...' : 'Checkout'}
      </button>
    </>
  );
}
```

## Core Functions

### `completeCheckout(cartItems, onSuccess?)`

Main function that handles the complete checkout flow.

```typescript
import { completeCheckout } from '../services/checkout';

try {
  // Creates checkout and redirects to Shopify
  await completeCheckout(cartItems);
  // Note: This function redirects, doesn't return
} catch (error) {
  console.error('Checkout failed:', error);
}
```

**Parameters:**
- `cartItems: CartItem[]` - Array of items in cart
- `onSuccess?: () => void` - Optional callback before redirect

**Returns:** Never (redirects to Shopify)

**Throws:** Error on validation or API failure

### `prepareLineItems(cartItems)`

Converts CartItem format to CheckoutLineItem format.

```typescript
import { prepareLineItems } from '../services/checkout';

const lineItems = prepareLineItems([
  {
    variantId: 'gid://shopify/ProductVariant/123',
    quantity: 1,
  },
]);

// Result: [{ variantId: '...', quantity: 1 }]
```

### `calculateCartTotals(cartItems)`

Calculates and formats cart totals.

```typescript
import { calculateCartTotals } from '../services/checkout';

const totals = calculateCartTotals(cartItems);
// Returns:
// {
//   itemCount: 2,
//   subtotal: 199.98,
//   formattedSubtotal: '$199.98',
//   currencyCode: 'USD'
// }
```

### `formatPrice(amount, currency)`

Formats a price string as currency.

```typescript
import { formatPrice } from '../services/checkout';

const price = formatPrice('99.99', 'USD');
// Result: '$99.99'
```

## API Integration

### GraphQL Mutation

The `createCheckout` function uses the following Shopify mutation:

```graphql
mutation CreateCheckout($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
      webUrl
      lineItems(first: 250) {
        edges {
          node {
            id
            title
            quantity
            variant {
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
    userErrors {
      message
      field
    }
  }
}
```

**Request:**

```json
{
  "query": "...",
  "variables": {
    "input": {
      "lineItems": [
        {
          "variantId": "gid://shopify/ProductVariant/123",
          "quantity": 1
        }
      ]
    }
  }
}
```

**Response:**

```json
{
  "checkout": {
    "id": "gid://shopify/Checkout/abc123...",
    "webUrl": "https://anecdote.myshopify.com/cart/c/abc123...",
    "lineItems": [
      {
        "id": "...",
        "title": "Product Name",
        "quantity": 1,
        "variant": {
          "id": "gid://shopify/ProductVariant/123",
          "title": "Size M",
          "price": {
            "amount": "99.99",
            "currencyCode": "USD"
          }
        }
      }
    ]
  }
}
```

## Cart Context

The CartContext provides cart management:

```typescript
import { useCart } from '../context/CartContext';

const {
  items,           // CartItem[]
  itemCount,       // number
  subtotal,        // number
  addItem,         // (item: CartItem) => void
  removeItem,      // (variantId: string) => void
  updateQuantity,  // (variantId: string, quantity: number) => void
  clearCart,       // () => void
} = useCart();
```

**CartItem Structure:**

```typescript
interface CartItem {
  variantId: string;      // Shopify variant ID
  productId: string;      // Shopify product ID
  title: string;          // Product name
  variantTitle: string;   // Variant name (Size, Color, etc.)
  price: string;          // Price per unit
  quantity: number;       // Quantity in cart
  image: string;          // Product image URL
  handle: string;         // Product handle
}
```

## Error Handling

The checkout flow includes comprehensive error handling:

```typescript
try {
  await completeCheckout(items);
} catch (error) {
  if (error instanceof Error) {
    const msg = error.message;

    if (msg.includes('empty')) {
      // Cart is empty
    } else if (msg.includes('Checkout error')) {
      // Shopify API error
    } else if (msg.includes('GraphQL error')) {
      // Query syntax error
    } else if (msg.includes('Missing Shopify')) {
      // Environment variables not set
    }
  }
}
```

## Implementation Example

Complete cart page with checkout:

```typescript
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { completeCheckout, calculateCartTotals } from '../services/checkout';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartTotals = calculateCartTotals(items);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      await completeCheckout(items);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Checkout failed';
      setCheckoutError(msg);
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* Cart Items */}
      {items.map((item) => (
        <div key={item.variantId}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.variantId, parseInt(e.target.value))
            }
          />

          <button onClick={() => removeItem(item.variantId)}>Remove</button>
        </div>
      ))}

      {/* Order Summary */}
      <div>
        <p>Items: {cartTotals.itemCount}</p>
        <p>Total: {cartTotals.formattedSubtotal}</p>

        {checkoutError && <p className="error">{checkoutError}</p>}

        <button
          onClick={handleCheckout}
          disabled={isCheckingOut || items.length === 0}
        >
          {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}
```

## Routing

Add these routes to your React Router:

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopifyShopPage from './pages/ShopifyShopPage';
import ShopifyProductPage from './pages/ShopifyProductPage';
import Cart from './pages/Cart';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop" element={<ShopifyShopPage />} />
        <Route path="/product/:handle" element={<ShopifyProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
```

## Testing

### Test Checklist

- [ ] Add product to cart from product page
- [ ] Navigate to cart page and see items
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] Click "Proceed to Checkout"
- [ ] Verify redirect to Shopify checkout URL
- [ ] Test with multiple items
- [ ] Test error handling (empty cart)
- [ ] Test network error handling
- [ ] Verify cart persists after page reload

### Manual Testing

1. **Add to Cart:**
   ```
   http://localhost:5173/shop
   → Click product
   → Click "Add to Cart"
   → Verify item count increases
   ```

2. **View Cart:**
   ```
   http://localhost:5173/cart
   → See items in cart
   → Verify prices and quantities
   ```

3. **Checkout:**
   ```
   Click "Proceed to Checkout"
   → Should redirect to:
   https://[store].myshopify.com/cart/c/...
   ```

## TypeScript Types

```typescript
interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: string;
  quantity: number;
  image: string;
  handle: string;
}

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

interface CartTotals {
  itemCount: number;
  subtotal: number;
  formattedSubtotal: string;
  currencyCode?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}
```

## Performance Considerations

1. **Cart Persistence**
   - Uses `localStorage` for cart data
   - Automatically syncs on changes
   - Persists across browser sessions

2. **Checkout Creation**
   - GraphQL mutation to Shopify
   - ~200-500ms response time
   - No caching (fresh checkout each time)

3. **Image Optimization**
   - Use CDN-hosted images from Shopify
   - Implement lazy loading for product images

## Security

- **Storefront Token**: Public-facing (safe to expose)
- **Checkout URL**: Generated per session
- **Payment**: Handled by Shopify (PCI compliant)
- **Cart Data**: Stored in localStorage (client-side)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required
- Fetch API support required

## Troubleshooting

### Checkout Button Doesn't Work

```
1. Check console for error messages
2. Verify environment variables in .env
3. Verify cart has items (itemCount > 0)
4. Check DevTools Network tab for API errors
```

### Redirect to Shopify Fails

```
1. Verify checkout URL is valid
2. Check for CORS errors in console
3. Verify window.location.href works (try in console)
4. Check Shopify store is accessible
```

### Variant Not Found Error

```
1. Verify variant ID format (should be gid://shopify/ProductVariant/...)
2. Fetch product by handle to get valid variant IDs
3. Check variant exists in Shopify admin
4. Verify variant is published to online store
```

### Cart Doesn't Persist

```
1. Check localStorage is enabled in browser
2. Verify CartProvider wraps app
3. Check DevTools Application tab for localStorage
4. Verify auth token is valid
```

## Next Steps

1. **Implement Thank You Page**
   - Display order details
   - Show order number
   - Provide download/tracking info

2. **Order Tracking** (Optional)
   - Store order details in database
   - Display in user account
   - Send email confirmation

3. **Webhook Integration** (Optional)
   - Listen for order.created events
   - Update inventory
   - Send notifications

4. **Analytics**
   - Track checkout abandonment
   - Monitor conversion rate
   - Track average order value

## Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Checkout API Reference](https://shopify.dev/docs/api/storefront/latest/mutations/checkoutcreate)
- [GraphQL Playground](https://shopifystorefrontapiplayground.myshopify.com/)

## Support

For issues or questions:

1. Check `CHECKOUT_QUICK_REFERENCE.ts` for quick examples
2. Review `CHECKOUT_IMPLEMENTATION_GUIDE.ts` for detailed guide
3. Check browser console for error messages
4. Verify environment variables are set correctly
5. Review Shopify API documentation

---

**Version:** 1.0  
**Last Updated:** 2024-10  
**API Version:** 2024-10
