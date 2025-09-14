import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='bg-background min-h-screen'>
      {/* Header Skeleton */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-8 w-32' />
            <nav className='hidden items-center space-x-6 md:flex'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
            </nav>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-9 w-20' />
              <Skeleton className='h-9 w-24' />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className='py-16 md:py-24'>
        <div className='container mx-auto px-4'>
          <div className='space-y-6 text-center'>
            <Skeleton className='mx-auto h-12 w-3/4' />
            <Skeleton className='mx-auto h-6 w-1/2' />
            <Skeleton className='mx-auto h-4 w-2/3' />
            <div className='flex justify-center space-x-4 pt-6'>
              <Skeleton className='h-12 w-32' />
              <Skeleton className='h-12 w-32' />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section Skeleton */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 space-y-4 text-center'>
            <Skeleton className='mx-auto h-8 w-1/3' />
            <Skeleton className='mx-auto h-4 w-1/2' />
          </div>

          {/* Course Grid Skeleton */}
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className='overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-white/5'
              >
                <div className='relative'>
                  <Skeleton className='h-48 w-full' />
                  <div className='absolute top-3 right-3'>
                    <Skeleton className='h-6 w-16 rounded-full' />
                  </div>
                </div>
                <CardContent className='space-y-4 p-6'>
                  <div className='space-y-2'>
                    <Skeleton className='h-5 w-full' />
                    <Skeleton className='h-5 w-3/4' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-5/6' />
                    <Skeleton className='h-4 w-2/3' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-8' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>
                  <Skeleton className='h-10 w-full rounded-lg' />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className='bg-muted/30 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 space-y-4 text-center'>
            <Skeleton className='mx-auto h-8 w-1/3' />
            <Skeleton className='mx-auto h-4 w-1/2' />
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className='p-6'>
                <CardContent className='space-y-4'>
                  <Skeleton className='h-12 w-12 rounded-lg' />
                  <Skeleton className='h-6 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className='bg-muted/30 border-t'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid gap-8 md:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='space-y-4'>
                <Skeleton className='h-6 w-24' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 border-t pt-8'>
            <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
              <Skeleton className='h-4 w-48' />
              <div className='flex space-x-6'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-16' />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
