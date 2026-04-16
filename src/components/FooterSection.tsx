import { Link } from 'react-router-dom';

export default function FooterSection() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase mb-6 text-slate-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-500 transition-colors duration-300 hover:text-slate-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase mb-6 text-slate-500">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-6 text-slate-500">
              Stay up to date with new collections, products and exclusive
              offers.
            </p>
            <form
              className="flex"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-300 focus:border-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-xl border border-slate-900 bg-slate-900 px-4 py-3 text-white transition-colors duration-300 hover:bg-slate-800"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 192 192"
                  fill="none"
                >
                  <path
                    d="m72 36 60 60-60 60"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Brand blurb */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase mb-6 text-slate-500">
              Anecdote
            </h3>
            <p className="text-sm leading-6 text-slate-500">
              Premium streetwear crafted with intention. Every piece tells a
              story.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 transition-colors duration-300 hover:text-slate-900"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-slate-400 transition-colors duration-300 hover:text-slate-900"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Anecdote. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="cursor-pointer text-xs text-slate-400 transition-colors duration-300 hover:text-slate-900">
              Privacy Policy
            </span>
            <span className="cursor-pointer text-xs text-slate-400 transition-colors duration-300 hover:text-slate-900">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
