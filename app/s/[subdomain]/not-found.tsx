import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Home, Search } from 'lucide-react';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Sahla',
  description:
    'The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.',
};

export default function NotFoundPage() {
  return (
    <div className='from-background via-secondary/20 to-primary/5 flex min-h-screen items-center justify-center bg-gradient-to-br px-4'>
      <div className='mx-auto max-w-2xl text-center'>
        <div className='relative mb-8'>
          <div className='text-primary/20 text-[120px] leading-none font-light select-none md:text-[200px]'>
            404
          </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full backdrop-blur-sm'>
              <BookOpen className='text-primary h-10 w-10 animate-pulse' />
            </div>
          </div>
        </div>

        <Card className='border-0 bg-white/50 shadow-2xl backdrop-blur-sm dark:bg-white/10'>
          <CardContent className='p-8'>
            <Badge
              variant='outline'
              className='bg-primary/10 text-primary border-primary/30 mb-6'
            >
              Page Not Found
            </Badge>

            <h1 className='mb-4 text-3xl font-bold tracking-tight md:text-4xl'>
              Oops! Page Not Found
            </h1>

            <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
              The page you&apos;re looking for might have been moved, deleted,
              or the link is incorrect.
              <br />
              Let us help you find what you&apos;re searching for.
            </p>

            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button
                size='lg'
                className='group relative overflow-hidden rounded-full px-8 py-4 text-lg font-medium transition-all duration-500 hover:scale-105'
              >
                <Link href='/' className='flex items-center gap-2'>
                  <Home className='h-5 w-5' />
                  <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                    Go to Homepage
                  </span>
                  <span className='absolute inset-0 flex translate-y-full items-center justify-center gap-2 opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                    <Home className='h-5 w-5' />
                    Go to Homepage
                  </span>
                </Link>
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='group border-primary/30 hover:border-primary/50 relative overflow-hidden rounded-full bg-transparent px-8 py-4 text-lg font-medium transition-all duration-500 hover:scale-105'
              >
                <Link href='/courses' className='flex items-center gap-2'>
                  <Search className='h-5 w-5' />
                  <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                    Browse Courses
                  </span>
                  <span className='absolute inset-0 flex translate-y-full items-center justify-center gap-2 opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                    <Search className='h-5 w-5' />
                    Browse Courses
                  </span>
                </Link>
              </Button>
            </div>

            <div className='border-border/50 mt-8 border-t pt-6'>
              <p className='text-muted-foreground text-sm'>
                Or you can{' '}
                <Link href='/contact' className='text-primary hover:underline'>
                  contact us
                </Link>{' '}
                if you think there&apos;s an error
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
