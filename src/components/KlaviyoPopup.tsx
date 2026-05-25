import { useState, useEffect, useRef } from 'react';

export default function KlaviyoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const hasTriggeredRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 1. Session tracking logic using sessionStorage.
    // If there is no session token, it's a new session, so reset localStorage popup seen key.
    const sessionActive = sessionStorage.getItem('tarot-session-active');
    if (!sessionActive) {
      localStorage.removeItem('tarot-popup-seen');
      sessionStorage.setItem('tarot-session-active', 'true');
    }

    // 2. Check if user already saw or interacted with the popup in this session.
    const hasSeen = localStorage.getItem('tarot-popup-seen') === 'true';
    if (hasSeen) return;

    // Trigger opening the popup
    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // Clean up listeners and timers
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('scroll', handleScroll);

      // Open the popup modal
      setIsOpen(true);
    };

    // Scroll listener for "slight scroll" (e.g. scrolled > 80px)
    const handleScroll = () => {
      if (window.scrollY > 80) {
        triggerPopup();
      }
    };

    // Setup 4 seconds timer OR scroll listener, whichever comes first
    timerRef.current = setTimeout(() => {
      triggerPopup();
    }, 4000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as seen to prevent displaying again in this session
    localStorage.setItem('tarot-popup-seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const publicKey = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY;
    const listId = import.meta.env.VITE_KLAVIYO_LIST_ID;

    if (!publicKey || !listId) {
      setErrorMsg('Configuration error: Klaviyo credentials missing.');
      setIsSubmitting(false);
      return;
    }

    const endpoint = `https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`;

    const bodyData = {
      data: {
        type: 'subscription',
        attributes: {
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email,
                first_name: firstName,
              },
            },
          },
        },
        relationships: {
          list: {
            data: {
              type: 'list',
              id: listId,
            },
          },
        },
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          revision: '2024-02-15',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('[Klaviyo Error]', errText);
        throw new Error('Failed to subscribe. Please verify your details.');
      }

      // Mark popup as seen in localStorage on successful subscribe too
      localStorage.setItem('tarot-popup-seen', 'true');
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('WELCOME10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Semi-transparent overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup modal content container */}
      <div
        className={`relative w-full max-w-[440px] overflow-hidden rounded-[20px] bg-white px-8 py-10 text-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out transform ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-[#737373] transition-colors hover:text-black focus:outline-none"
          aria-label="Close dialog"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Transition State Wrapper */}
        <div className="transition-all duration-500 ease-in-out">
          {!isSuccess ? (
            <div className="flex flex-col text-center">
              <h3 className="text-[26px] font-bold tracking-tight text-black">
                Join The Tarot Club
              </h3>
              <p className="mt-2 text-sm text-[#737373]">
                Unlock 10% off your first order.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 text-left">
                <div>
                  <label htmlFor="first_name" className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1.5 h-11 w-full rounded-md border border-[#e5e5e5] px-3.5 text-sm transition-all focus:border-[#0a0a0a] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1.5 h-11 w-full rounded-md border border-[#e5e5e5] px-3.5 text-sm transition-all focus:border-[#0a0a0a] focus:outline-none"
                    required
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 mt-1">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex h-11 items-center justify-center rounded-md bg-black text-[13px] font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Unlock Discount'}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              {/* Success Badge */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[26px] font-bold tracking-tight text-black">
                Welcome to The Tarot Club
              </h3>
              <p className="mt-2 text-sm text-[#737373]">
                Use code <span className="font-semibold text-black">WELCOME10</span> for 10% off your first order.
              </p>

              <button
                onClick={handleCopyCode}
                className="mt-8 flex h-11 w-full items-center justify-center rounded-md border border-black bg-black text-[13px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-neutral-900 focus:outline-none"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
