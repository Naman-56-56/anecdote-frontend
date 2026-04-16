import SectionWrapper from '../components/SectionWrapper';

export default function About() {
  return (
    <>
      <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_40%)]" />
        <div className="relative px-6 text-center">
          <h1
            className="mb-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl"
            style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
          >
            Our Story
          </h1>
          <div className="mx-auto mb-4 h-0.5 w-16 bg-slate-300" />
          <p className="mx-auto max-w-lg text-sm text-slate-500 md:text-base">
            Every garment is a narrative. Every collection, an anecdote.
          </p>
        </div>
      </div>

      <SectionWrapper narrow>
        <div className="space-y-12 md:space-y-16">
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              The Brand
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Anecdote was born from the belief that clothing should carry
              meaning beyond fabric and thread. We create premium streetwear that
              bridges the gap between everyday comfort and intentional design —
              pieces that speak without shouting.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Our Philosophy
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              We believe in quality over quantity, in stories over trends. Each
              collection draws from cultural touchstones — anime, art, music, and
              the quiet moments in between. Our designs are minimal yet
              deliberate, built for those who appreciate the details others
              overlook.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Craftsmanship
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Every piece is crafted with heavyweight fabrics, premium finishes,
              and a relentless attention to fit. From oversized box tees to
              structured hoodies, we obsess over the weight of the cotton, the
              fall of the silhouette, and the permanence of every print.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-16">
            <blockquote className="text-center">
              <p
                className="text-2xl font-light italic leading-relaxed text-slate-500 md:text-3xl"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
              >
                &ldquo;Wear the story. Be the statement.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
