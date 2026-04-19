import { Link } from 'react-router-dom';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1600&h=1200&fit=crop&q=85';

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Image filling the ENTIRE viewport */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Anecdote — Anime Streetwear"
          className="h-full w-full object-cover object-center opacity-90"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark gradient overlay so the white transparent header and text are legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
      </div>

      {/* Centered Minimal Content Overlay (OtakuComplex style) */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <div style={{ animation: 'fadeInUp 0.8s ease both' }}>
          <p className="mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Premium anime streetwear
          </p>

          <h1
            className="text-[14vw] font-extrabold uppercase leading-[0.9] tracking-tighter text-white sm:text-[80px] lg:text-[100px]"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Built for
            <br />
            expression.
          </h1>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animation: 'fadeInUp 0.8s 0.2s ease both' }}
          >
            <Link
              to="/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center bg-white px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
