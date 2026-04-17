import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  // Transparent when: on homepage, not scrolled, drawer closed
  const transparent = isHomepage && !scrolled && !open;

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Scroll detection — threshold 50px
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50);
    check(); // set initial value
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Icon / text color
  const iconColor = transparent ? 'text-white' : 'text-[#0a0a0a]';
  const barColor  = transparent ? 'bg-white'   : 'bg-[#0a0a0a]';

  return (
    <>
      {/* ━━━━━━━━━━━━ HEADER ━━━━━━━━━━━━ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 transition-all duration-300 ease-in-out ${
          transparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-white border-b border-[#e5e5e5] shadow-[0_1px_16px_rgba(0,0,0,0.05)]'
        }`}
      >
        {/*
          3-column flex layout:
            [LEFT  flex-1] hamburger + desktop links
            [CENTER      ] logo — always centered
            [RIGHT flex-1] search + cart — pushed right
        */}
        <div className="mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">

          {/* ── LEFT ── */}
          <div className="flex flex-1 items-center gap-6">

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] transition-opacity hover:opacity-60 lg:hidden ${iconColor}`}
            >
              <span className={`block h-[1.5px] w-[18px] ${barColor} transition-all duration-300 origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] w-[18px] ${barColor} transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[1.5px] w-[18px] ${barColor} transition-all duration-300 origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </button>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                      transparent
                        ? isActive ? 'text-white' : 'text-white/60 hover:text-white'
                        : isActive ? 'text-[#0a0a0a]' : 'text-[#737373] hover:text-[#0a0a0a]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ── CENTER: Logo — absolutely centered ── */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              to="/"
              className={`text-[13px] font-bold uppercase tracking-[0.28em] transition-colors duration-300 hover:opacity-70 ${
                transparent ? 'text-white' : 'text-[#0a0a0a]'
              }`}
              style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
            >
              Anecdote
            </Link>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">

            {/* Search icon */}
            <button
              aria-label="Search"
              className={`flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 ${iconColor}`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Cart icon */}
            <Link
              to="/cart"
              aria-label={`Cart (${itemCount} items)`}
              className={`relative flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 ${iconColor}`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5h2l2.2 9.3A2 2 0 0 0 9.2 16h7.9a2 2 0 0 0 2-1.7L21 8H7.2" />
                <circle cx="10" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="17" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              {itemCount > 0 && (
                <span
                  className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center px-1 text-[9px] font-bold leading-none ${
                    transparent ? 'bg-white text-[#0a0a0a]' : 'bg-[#0a0a0a] text-white'
                  }`}
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </header>

      {/*
        Spacer: only inject on NON-homepage pages.
        On homepage, the hero overlays the transparent header — no spacer needed.
      */}
      {!isHomepage && <div className="h-14" aria-hidden />}

      {/* ━━━━━━━━━━━━ FULL-SCREEN MOBILE DRAWER ━━━━━━━━━━━━ */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
          style={{ animation: 'drawerOpen 0.3s ease both' }}
        >
          {/* Align with header height */}
          <div className="h-14 shrink-0" />

          {/* Giant nav links */}
          <nav className="flex flex-1 flex-col justify-center px-8">
            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `block py-5 text-5xl font-bold uppercase tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-[#0a0a0a]' : 'text-[#d4d4d4] hover:text-[#0a0a0a]'
                  }`
                }
                style={{
                  fontFamily: 'var(--FONT-STACK-HEADING)',
                  animation: `fadeInUp 0.4s ${0.06 * i}s ease both`,
                }}
              >
                {l.label}
              </NavLink>
            ))}

            {/* Cart link below divider */}
            <div
              className="mt-8 border-t border-[#e5e5e5] pt-8"
              style={{ animation: 'fadeInUp 0.4s 0.22s ease both' }}
            >
              <Link
                to="/cart"
                className="flex items-center gap-3 text-sm font-medium text-[#737373] transition-colors hover:text-[#0a0a0a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5h2l2.2 9.3A2 2 0 0 0 9.2 16h7.9a2 2 0 0 0 2-1.7L21 8H7.2" />
                  <circle cx="10" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                Your Bag
                {itemCount > 0 && (
                  <span className="font-semibold text-[#0a0a0a]">({itemCount})</span>
                )}
              </Link>
            </div>
          </nav>

          {/* Drawer footer */}
          <div className="shrink-0 border-t border-[#e5e5e5] px-8 py-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]">
              © Anecdote {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
