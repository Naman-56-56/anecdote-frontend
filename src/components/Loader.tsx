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
      <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            <div className="skeleton aspect-[3/4] w-full" />
            <div className="mt-3 space-y-1.5">
              <div className="skeleton h-3 w-3/4" />
              <div className="skeleton h-2.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 border border-[#e5e5e5]" />
        <div className="absolute inset-0 animate-spin border border-transparent border-t-[#0a0a0a]" />
      </div>
    </div>
  );
}
