import { Ban, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ReactNode } from 'react';

interface iAppProps {
  title: string;
  description: string;
  icon?: ReactNode;
  buttonText?: string;
  href?: string;
}

export function EmptyState({
  buttonText,
  description,
  title,
  href,
  icon,
}: iAppProps) {
  return (
    <div className='animate-in fade-in-50 flex h-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center'>
      <div className='bg-primary/10 flex size-20 items-center justify-center rounded-full'>
        {/* If an icon is passed, use it. Otherwise, fall back to the Ban icon. */}
        {icon ? icon : <Ban className='text-primary size-10' />}
      </div>
      <h2 className='mt-6 text-xl font-semibold'>{title}</h2>
      <p className='text-muted-foreground mt-2 mb-8 text-center text-sm leading-tight'>
        {description}
      </p>

      {/* Only render the button if both href and buttonText are provided */}
      {href && buttonText && (
        <Link href={href} className={buttonVariants()}>
          <PlusCircle className='mr-2 size-4' />
          {buttonText}
        </Link>
      )}
    </div>
  );
}
