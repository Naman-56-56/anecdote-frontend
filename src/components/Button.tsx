import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center font-semibold uppercase tracking-[0.12em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#0a0a0a] text-white border border-[#0a0a0a] hover:bg-[#262626] active:scale-[0.98]',
  secondary:
    'bg-white text-[#0a0a0a] border border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white active:scale-[0.98]',
  outline:
    'bg-transparent text-[#0a0a0a] border border-[#e5e5e5] hover:border-[#0a0a0a] active:scale-[0.98]',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-[10px] px-5 py-2.5',
  md: 'text-[10px] px-7 py-3',
  lg: 'text-[11px] px-8 py-3.5',
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
