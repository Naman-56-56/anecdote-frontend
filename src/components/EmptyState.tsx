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
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-24 text-center">
      <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#a3a3a3]">
        Empty
      </p>
      <h2
        className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-[#737373]">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="mt-10">
          <Button variant="primary" size="lg">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
