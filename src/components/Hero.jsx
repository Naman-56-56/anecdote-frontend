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
          <h1
            className="text-[10vw] font-extrabold uppercase leading-[0.9] tracking-tighter text-white sm:text-[50px] lg:text-[70px]"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            The Tarot
            <br />
            Club
          </h1>
          <p className="mt-8 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] text-white/90">
            Live Now
          </p>
        </div>
      </div>
    </section>
  );
}
