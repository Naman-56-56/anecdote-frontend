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
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-8 border-t border-[#e5e5e5] pt-8 sm:mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-1.5 text-[9px] uppercase tracking-[0.28em] text-[#a3a3a3]">
                Core Collection
              </p>
              <h2
                className="text-3xl font-extrabold uppercase tracking-tight text-[#0a0a0a] sm:text-4xl"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
              >
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3a3a3] underline underline-offset-4 decoration-[#e5e5e5] transition-colors duration-200 hover:text-[#0a0a0a] hover:decoration-[#0a0a0a]"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Asymmetric 2-up grid — full width on mobile, centered pair on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:mx-auto lg:max-w-3xl">
          {products.map((product) => (
            <Link key={product.id} to="/shop" className="group block">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <img
                  src={product.hoverImage}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 scale-100 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="mt-3 space-y-0.5 pl-0.5">
                <h3 className="truncate text-[12px] font-medium text-[#0a0a0a] sm:text-[13px]">
                  {product.title}
                </h3>
                <p className="text-[11px] text-[#737373]">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex h-12 items-center justify-center border border-[#0a0a0a] px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-200 hover:bg-[#0a0a0a] hover:text-white active:scale-[0.98]"
          >
            Shop Best Sellers
          </Link>
        </div>

      </div>
    </section>
  );
}
