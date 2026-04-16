import { useState, type FormEvent } from 'react';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <SectionWrapper narrow>
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1
          className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
          style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
        >
          Contact
        </h1>
        <div className="mb-4 h-0.5 w-16 bg-slate-300" />
        <p className="mb-10 text-sm leading-6 text-slate-500">
          Have a question or just want to say hello? We&rsquo;d love to hear
          from you.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
            <p className="mb-1 font-medium text-emerald-900">Thank you!</p>
            <p className="text-sm text-emerald-700">
              We&rsquo;ll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Send Message
            </Button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
