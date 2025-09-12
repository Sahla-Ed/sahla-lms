import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
    className={cn('text-gray-900 dark:text-white', className)}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    {/* Main eye shape */}
    <path
      d='M8 20C8 20 14 10 20 10C26 10 32 20 32 20C32 20 26 26 20 26C14 26 8 20 8 20Z'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
    />
    {/* Pupil */}
    <circle cx='20' cy='18' r='4' fill='currentColor' />
    {/* Eye of Horus markings */}
    <path
      d='M20 26L18 30M20 26L22 32M26 22L30 24M14 22L10 24'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
    {/* Eyebrow */}
    <path
      d='M12 14C16 12 24 12 28 14'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
  );
}