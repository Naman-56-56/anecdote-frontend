import { Link } from 'react-router-dom';

const products = [
  {
    id: '1',
    title: 'Dream Heritage Hoodie',
    price: '€69.95',
    image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&h=780&fit=crop',
  },
  {
    id: '2',
    title: 'Dream Heritage Tee',
    price: '€37.95',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=780&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=780&fit=crop',
  },
];

export default function FeaturedCollection() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">
            Featured
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Have You Ever Had a Dream?
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-slate-300" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <div className="hidden md:block" />
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
          <div className="hidden md:block" />
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
