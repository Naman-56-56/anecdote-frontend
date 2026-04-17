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
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-8 flex items-end justify-between border-t border-[#e5e5e5] pt-8 sm:mb-10">
          <div>
            <p className="mb-1.5 text-[9px] uppercase tracking-[0.28em] text-[#a3a3a3]">
              Curated Edit
            </p>
            <h2
              className="text-3xl font-extrabold uppercase tracking-tight text-[#0a0a0a] sm:text-4xl"
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              New Drop
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3a3a3] underline underline-offset-4 decoration-[#e5e5e5] transition-colors duration-200 hover:text-[#0a0a0a] hover:decoration-[#0a0a0a]"
          >
            View All
          </Link>
        </div>

        {/* Product grid — 2-col mobile / 4-col desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
