import { Link } from 'react-router-dom';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16M6 7l1 12h10l1-12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11v4M15 11v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        className="text-2xl font-semibold tracking-tight text-slate-900"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="mt-8">
          <Button variant="primary" size="lg">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
