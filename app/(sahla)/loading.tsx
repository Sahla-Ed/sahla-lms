import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='from-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Header Skeleton */}
      <div className='bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-8 w-32' />
            <div className='hidden items-center space-x-6 md:flex'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-9 w-20' />
              <Skeleton className='h-9 w-24' />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
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

      {/* Features Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
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

      {/* CTA Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <Card className='p-12 text-center'>
          <CardContent className='space-y-6'>
            <Skeleton className='mx-auto h-10 w-1/2' />
            <Skeleton className='mx-auto h-4 w-2/3' />
            <Skeleton className='mx-auto h-12 w-40' />
          </CardContent>
        </Card>
      </div>

      {/* Footer Skeleton */}
      <div className='bg-muted/30 border-t'>
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
        </div>
      </div>
    </div>
  );
}
