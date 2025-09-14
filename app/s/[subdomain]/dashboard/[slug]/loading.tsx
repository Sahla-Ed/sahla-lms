import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='flex min-h-0 flex-1 flex-col sm:flex-row'>
      {/* Course Sidebar Skeleton */}
      <div className='border-border max-h-screen w-full shrink-0 overflow-y-auto sm:sticky sm:top-0 sm:w-80 sm:border-r md:w-72 lg:w-80'>
        <div className='space-y-4 p-4'>
          {/* Course Header */}
          <div className='space-y-3'>
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>

          {/* Progress Bar */}
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-12' />
            </div>
            <Skeleton className='h-2 w-full' />
          </div>

          {/* Course Navigation */}
          <div className='space-y-2'>
            <Skeleton className='h-5 w-24' />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
                <div className='ml-6 space-y-1'>
                  {Array.from({
                    length: Math.floor(Math.random() * 3) + 1,
                  }).map((_, j) => (
                    <div key={j} className='flex items-center space-x-2'>
                      <Skeleton className='h-3 w-3' />
                      <Skeleton className='h-3 w-2/3' />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className='min-w-0 flex-1 overflow-hidden p-4 sm:p-6 lg:p-8'>
        <div className='space-y-6'>
          {/* Lesson Header */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-8 w-64' />
              <Skeleton className='h-8 w-24' />
            </div>
            <Skeleton className='h-4 w-48' />
          </div>

          {/* Video Player Skeleton */}
          <Card>
            <CardContent className='p-0'>
              <div className='bg-muted relative aspect-video'>
                <Skeleton className='h-full w-full' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Skeleton className='h-16 w-16 rounded-full' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-32' />
              </CardHeader>
              <CardContent className='space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <Skeleton className='h-10 w-32' />
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-28' />
            </div>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-24' />
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='flex space-x-3'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <div className='flex-1 space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Skeleton className='h-4 w-20' />
                          <Skeleton className='h-3 w-16' />
                        </div>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-3/4' />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
