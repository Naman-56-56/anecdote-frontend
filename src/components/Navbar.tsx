import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Marquee from './Marquee';
import { getProducts } from '../services/shopify';
import type { Product } from '../types';

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const { itemCount } = useCart();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHomepage = location.pathname === '/';

  // Transparent when: on homepage, not scrolled, drawer closed
  const transparent = isHomepage && !scrolled && !open;

  // Close drawer and search on route change
  useEffect(() => {
    setOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer or search open
  useEffect(() => {
    document.body.style.overflow = (open || isSearchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open, isSearchOpen]);

  // Scroll detection — threshold 50px
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50);
    check(); // set initial value
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Fetch products when search is opened
  useEffect(() => {
    if (isSearchOpen && products.length === 0) {
      getProducts(100).then(setProducts).catch(console.error);
    }
  }, [isSearchOpen, products.length]);

  // Focus input when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Escape key to close search
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Filter products by title
  const filteredProducts = searchQuery.trim() === ''
    ? []
    : products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Icon / text color with transition compatibility
  const textColor = transparent ? '#ffffff' : '#0a0a0a';
  const barColor  = transparent ? 'bg-white'   : 'bg-[#0a0a0a]';

  return (
    <>
      {/* ━━━━━━━━━━━━ SEARCH OVERLAY ━━━━━━━━━━━━ */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-300 ease-in-out ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 border-b border-[#e5e5e5] shrink-0">
          <div className="flex flex-1 items-center gap-3">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="text-black">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="w-full bg-transparent py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black outline-none placeholder:text-[#737373]"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="flex h-9 w-9 items-center justify-center text-[#737373] transition-colors hover:text-black focus:outline-none"
            aria-label="Close search"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa] py-8">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            {searchQuery.trim() === '' ? (
              <div className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3a3a3] py-16">
                Type to search products
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3a3a3] py-16">
                No products found
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373]">
                  Results ({filteredProducts.length})
                </span>
                <div className="flex flex-col divide-y divide-[#e5e5e5] bg-white rounded-md border border-[#e5e5e5] overflow-hidden shadow-sm animate-fadeIn">
                  {filteredProducts.map((p) => {
                    const price = new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: p.priceRange.currencyCode || 'EUR',
                    }).format(parseFloat(p.priceRange.min));
                    
                    return (
                      <Link
                        key={p.id}
                        to={`/product/${p.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-4 transition-colors hover:bg-[#fafafa]"
                      >
                        {p.images?.[0]?.url ? (
                          <img
                            src={p.images[0].url}
                            alt={p.images[0].altText || p.title}
                            className="h-12 w-12 rounded object-cover object-center bg-neutral-100"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded bg-neutral-100 flex items-center justify-center text-[8px] font-bold text-neutral-400">
                            BAG
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-black uppercase tracking-wider">
                            {p.title}
                          </span>
                          <span className="mt-1 text-[11px] text-[#737373]">
                            {price}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━ HEADER WRAPPER ━━━━━━━━━━━━ */}
      <div 
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          scrolled ? '-translate-y-10' : 'translate-y-0'
        }`}
      >
        <Marquee />
        
        <header
          className={`h-14 transition-all duration-300 ease-in-out ${
            transparent
              ? 'bg-transparent border-b border-transparent shadow-none'
              : 'bg-white border-b border-[#e5e5e5] shadow-[0_1px_16px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">

            {/* ── LEFT ── */}
            <div className="flex flex-1 items-center gap-6">

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] transition-colors duration-300 hover:opacity-60 lg:hidden focus:outline-none"
                style={{ color: textColor }}
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
                    className="text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
                    style={({ isActive }) => ({
                      color: transparent
                        ? isActive ? '#ffffff' : 'rgba(255,255,255,0.7)'
                        : isActive ? '#0a0a0a' : '#737373'
                    })}
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
                className="text-[14px] font-bold lowercase tracking-[0.2em] transition-colors duration-300 hover:opacity-70"
                style={{ fontFamily: 'var(--FONT-STACK-HEADING)', color: textColor }}
              >
                anecdote
              </Link>
            </div>

            {/* ── RIGHT ── */}
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">

              {/* Search icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:opacity-60 focus:outline-none"
                style={{ color: textColor }}
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
                className="relative flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:opacity-60"
                style={{ color: textColor }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5h2l2.2 9.3A2 2 0 0 0 9.2 16h7.9a2 2 0 0 0 2-1.7L21 8H7.2" />
                  <circle cx="10" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                {itemCount > 0 && (
                  <span
                    className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center px-1 text-[9px] font-bold leading-none transition-colors duration-300 ${
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
      </div>

      {/* Spacer */}
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
