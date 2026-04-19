import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:py-16">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-[13px] font-bold uppercase tracking-[0.26em] text-[#0a0a0a]"
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              Anecdote
            </Link>
            <p className="mt-4 max-w-[220px] text-[12px] leading-6 text-[#737373]">
              Premium streetwear for those who express through what they wear.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/anecdoteco_?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#a3a3a3] transition-colors hover:text-[#0a0a0a]"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@anecdoteco_?_r=1&_t=ZP-95gCx1UJYRa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#a3a3a3] transition-colors hover:text-[#0a0a0a]"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.95-1.55 5.6-1.04 1.66-2.58 3-4.42 3.73-1.84.74-3.9.96-5.87.56-1.97-.4-3.78-1.35-5.13-2.76-1.36-1.42-2.22-3.32-2.48-5.28-.27-1.95.03-3.95 1-5.69.96-1.74 2.45-3.17 4.26-3.98 1.8-.8 3.84-1.02 5.78-.58V11.1c-1.34-.35-2.8-.2-4.04.4-1.25.59-2.24 1.64-2.75 2.92-.5 1.28-.56 2.7-.16 4 .39 1.3 1.24 2.44 2.37 3.12 1.12.69 2.45.92 3.74.65 1.28-.27 2.4-1.03 3.1-2.1.72-1.07 1-2.37.98-3.66V0h3.58z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[0.26em] text-[#a3a3a3]">
              Navigate
            </p>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[12px] text-[#737373] transition-colors hover:text-[#0a0a0a]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[0.26em] text-[#a3a3a3]">
              Newsletter
            </p>
            <p className="mb-4 text-[12px] leading-6 text-[#737373]">
              New drops and exclusive offers, direct to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-[#0a0a0a]"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent py-2 text-[12px] text-[#0a0a0a] placeholder-[#a3a3a3] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 py-2 pl-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e5e5e5] py-5 sm:flex-row">
          <p className="text-[10px] text-[#a3a3a3]">
            © {new Date().getFullYear()} Anecdote. All rights reserved.
          </p>
          <div className="flex gap-5">
            <span className="cursor-pointer text-[10px] text-[#a3a3a3] transition-colors hover:text-[#0a0a0a]">
              Privacy
            </span>
            <span className="cursor-pointer text-[10px] text-[#a3a3a3] transition-colors hover:text-[#0a0a0a]">
              Terms
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
