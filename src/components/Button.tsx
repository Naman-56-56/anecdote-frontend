import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center rounded-xl border font-semibold tracking-[0.02em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg hover:shadow-slate-900/10',
  secondary:
    'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50',
  outline:
    'bg-transparent text-slate-900 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-xs px-6 py-3',
  lg: 'text-sm px-8 py-4',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
