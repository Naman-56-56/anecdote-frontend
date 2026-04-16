import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

function linkClass(isActive: boolean): string {
  return `text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-300 ${
    isActive
      ? 'text-slate-900'
      : 'text-slate-500 hover:text-slate-900'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'
          : 'bg-white/75 backdrop-blur-xl'
      }`}
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-slate-500 sm:px-6">
        FREE SHIPPING ON ALL DOMESTIC ORDERS OVER $150
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm transition hover:border-slate-300 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="h-5 w-5" viewBox="0 0 192 192" fill="none">
                  <path
                    d="M150 42 42 150M150 150 42 42"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 192 192" fill="none">
                  <path
                    d="M30 54h132M30 96h132M30 138h132"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            <Link to="/" className="lg:hidden">
              <span
                className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
              >
                Anecdote
              </span>
            </Link>

            <Link to="/" className="hidden lg:block">
              <span
                className="text-lg font-semibold uppercase tracking-[0.28em] text-slate-900"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
              >
                Anecdote
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Cart"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 5h2l2.2 9.3a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H7.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="19" r="1.25" />
                <circle cx="17" cy="19" r="1.25" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[10px] font-semibold leading-none text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-4 px-4 py-5 sm:px-6">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
