import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className='bg-background min-h-screen'>
      <div className='mx-auto max-w-4xl px-6 py-16 lg:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
            {title}
          </h1>
          <p className='text-muted-foreground mt-4 text-lg'>
            Last Updated: July 20, 2025
          </p>
        </div>

        {/* prose dark:prose-invert لضمان تنسيق النص تلقائيًا بشكل جيد */}
        <div className='prose dark:prose-invert prose-lg max-w-none'>
          {children}
        </div>
      </div>
    </div>
  );
}
