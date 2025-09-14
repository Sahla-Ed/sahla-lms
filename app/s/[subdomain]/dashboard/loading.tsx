import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='bg-background flex h-screen'>
      {/* Sidebar Skeleton */}
      <div className='bg-card w-72 border-r'>
        <div className='p-6'>
          <Skeleton className='mb-8 h-8 w-32' />
          <div className='space-y-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='flex items-center space-x-3'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-24' />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        {/* Header Skeleton */}
        <header className='bg-card border-b px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-48' />
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
        </header>

        {/* Dashboard Content Skeleton */}
        <main className='flex-1 space-y-6 p-6'>
          {/* Welcome Section */}
          <div className='space-y-2'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-96' />
          </div>

          {/* Progress Overview */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-4' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-8 w-16' />
                <Skeleton className='h-3 w-24' />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-4' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-8 w-16' />
                <Skeleton className='h-3 w-24' />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-4' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-8 w-16' />
                <Skeleton className='h-3 w-24' />
              </CardContent>
            </Card>
          </div>

          {/* My Courses Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-8 w-20' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className='overflow-hidden'>
                    <Skeleton className='h-32 w-full' />
                    <CardContent className='space-y-3 p-4'>
                      <Skeleton className='h-5 w-3/4' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-2/3' />
                      <div className='space-y-2'>
                        <Skeleton className='h-2 w-full' />
                        <div className='flex justify-between text-sm'>
                          <Skeleton className='h-3 w-16' />
                          <Skeleton className='h-3 w-12' />
                        </div>
                      </div>
                      <Skeleton className='h-8 w-full' />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='flex items-center space-x-4'>
                    <Skeleton className='h-10 w-10 rounded-full' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-4 w-3/4' />
                      <Skeleton className='h-3 w-1/2' />
                    </div>
                    <Skeleton className='h-4 w-16' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Paths */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-8 w-20' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='space-y-4'>
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-3 w-full' />
                    <Skeleton className='h-3 w-2/3' />
                    <div className='space-y-2'>
                      <Skeleton className='h-2 w-full' />
                      <div className='flex justify-between text-sm'>
                        <Skeleton className='h-3 w-16' />
                        <Skeleton className='h-3 w-12' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
