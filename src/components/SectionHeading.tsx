import { type ReactNode } from 'react';
import Reveal from '@/components/Reveal';

interface SectionHeadingProps {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal className={`${center ? 'text-center' : ''} ${className}`}>
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h2 className="heading-serif text-3xl sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base text-ink-light leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
