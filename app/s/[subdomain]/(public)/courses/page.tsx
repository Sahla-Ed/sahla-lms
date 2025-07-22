import { PublicCourseCardSkeleton } from '../_components/PublicCourseCard';
import { getAllCourses } from '@/app/data/course/get-all-courses';
import { Suspense } from 'react';
import { CourseSearchWrapper } from '../_components/CourseSearchWrapperProps';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Top Online Courses in Tech, Design, and Business | Sahla',
  description:
    'Start your learning journey with Sahla. Browse expertly curated online courses in programming, design, business, and more – designed to boost your skills and career.',
};

export const dynamic = 'force-dynamic';

export default async function PublicCoursesroute({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className='from-background via-secondary/10 to-background min-h-screen bg-gradient-to-b'>
      {/* Hero Section */}
      <section className='from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden bg-gradient-to-r px-6 py-20 md:px-8'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='bg-primary/10 absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full' />
          <div className='bg-primary/5 absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full' />
          <div className='bg-primary/10 absolute bottom-20 left-1/3 h-12 w-12 animate-pulse rounded-full' />
        </div>

        <div className='relative mx-auto max-w-7xl text-center'>
          <div className='bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm'>
            <span className='bg-primary mr-2 h-2 w-2 animate-pulse rounded-full'></span>
            Explore Our Courses
          </div>

          <h1 className='mb-6 text-4xl leading-tight font-light tracking-tight md:text-6xl lg:text-7xl'>
            Discover Your Next
            <span className='from-primary to-primary/80 block bg-gradient-to-r bg-clip-text font-semibold text-transparent'>
              Learning Adventure
            </span>
          </h1>

          <div className='via-primary mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent to-transparent' />

          <p className='text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl'>
            Dive into our carefully curated collection of courses designed by
            industry experts. Transform your skills and unlock new opportunities
            in today&apos;s digital world.
          </p>
        </div>
      </section>

      <section className='px-6 py-16 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          {/* Section Header */}
          <div className='mb-12 flex flex-col items-center justify-center text-center'>
            <h2 className='mb-2 text-3xl font-bold tracking-tight md:text-4xl'>
              Featured Courses
            </h2>
            <p className='text-muted-foreground'>
              Start your learning journey with our most popular courses
            </p>
          </div>

          <Suspense fallback={<LoadingSkeletonLayout />}>
            <RenderCourses searchParams={resolvedSearchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function RenderCourses({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const courses = await getAllCourses({
    q: searchParams?.q,
    category: searchParams?.category,
  });

  return <CourseSearchWrapper courses={courses} />;
}

function LoadingSkeletonLayout() {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
