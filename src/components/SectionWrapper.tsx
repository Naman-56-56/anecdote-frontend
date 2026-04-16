import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  narrow?: boolean;
}

export default function SectionWrapper({
  children,
  className = '',
  padded = true,
  narrow = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${
        padded ? 'py-12 md:py-16' : ''
      } transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          narrow ? 'max-w-4xl' : 'max-w-7xl'
        }`}
      >
        {children}
      </div>
    </section>
  );
}
