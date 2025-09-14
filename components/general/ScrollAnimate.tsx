'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: '100' | '200' | '300' | '500';
}

export function ScrollAnimate({ children, direction = 'up', delay = '100' }: ScrollAnimateProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const baseClasses = `transition-all duration-700 ease-out delay-${delay}`;
  
  const directionClasses = {
    up: 'translate-y-10',
    left: '-translate-x-10',
    right: 'translate-x-10',
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClasses[direction]}`
      )}
    >
      {children}
    </div>
  );
}