import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&h=1800&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=1800&fit=crop',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1400&h=1800&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=1800&fit=crop',
];

export default function Hero() {
  const bgImage = HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];

  return (
    <section className="relative overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.04),_transparent_30%)]" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
            style={{
              animationName: 'fadeInUp',
              animationDuration: '0.8s',
              animationFillMode: 'both',
            }}
          >
            Curated essentials for the modern wardrobe
          </p>
          <h1
            className="max-w-xl text-5xl font-semibold leading-[0.92] tracking-tight text-slate-900 md:text-7xl lg:text-8xl"
            style={{
              fontFamily: 'var(--FONT-STACK-HEADING)',
              animationName: 'fadeInUp',
              animationDuration: '0.8s',
              animationFillMode: 'both',
            }}
          >
            The Arcana Collection
          </h1>

          <p
            className="mt-6 max-w-lg text-base leading-7 text-slate-500 md:text-lg"
            style={{
              animationName: 'fadeInUp',
              animationDuration: '0.8s',
              animationDelay: '0.15s',
              animationFillMode: 'both',
            }}
          >
            Minimal silhouettes, refined materials, and an elevated fit system designed to feel premium on day one.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{
              animationName: 'fadeInUp',
              animationDuration: '0.8s',
              animationDelay: '0.3s',
              animationFillMode: 'both',
            }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10"
            >
              Shop the Drop
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-[560px]"
          style={{
            animationName: 'fadeInUp',
            animationDuration: '0.9s',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-slate-200/40 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
              <img
                src={bgImage}
                alt="Arcana Collection"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  New season
                </p>
                <p className="mt-2 text-lg font-medium text-slate-900">
                  Premium layers built for everyday wear.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Clean fits, soft hand-feel, and a neutral palette.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
