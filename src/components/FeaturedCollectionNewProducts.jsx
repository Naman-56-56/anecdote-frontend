import { Link } from 'react-router-dom';

const products = [
  {
    id: '1',
    title: 'Arcana Cloud Hoodie',
    price: '€88.95',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1578768079470-c7c3e7753fa8?w=600&h=780&fit=crop',
  },
  {
    id: '2',
    title: 'Fate Oversized Box Tee',
    price: '€51.95',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=780&fit=crop',
  },
  {
    id: '3',
    title: 'Shadow Heritage Tee',
    price: '€51.95',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=780&fit=crop',
  },
  {
    id: '4',
    title: 'Mystic Bundle Pack',
    price: '€185.95',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=780&fit=crop',
  },
];

export default function FeaturedCollectionNewProducts() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            New Arrivals
          </h2>
          <div className="mt-4 h-0.5 w-16 bg-slate-300" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to="/shop"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img
                    src={product.hoverImage}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="truncate text-xs font-medium text-slate-900 md:text-sm">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
