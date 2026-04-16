interface LoaderProps {
  className?: string;
  variant?: 'spinner' | 'grid';
  count?: number;
}

export default function Loader({
  className = '',
  variant = 'spinner',
  count = 8,
}: LoaderProps) {
  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="aspect-[3/4] animate-pulse bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}
