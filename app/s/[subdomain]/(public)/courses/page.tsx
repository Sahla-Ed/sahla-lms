import { PublicCourseCardSkeleton } from '../_components/PublicCourseCard';
import { getAllCourses } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { Suspense } from 'react';
import { CourseSearchWrapper } from '../_components/CourseSearchWrapperProps';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../../data/admin/get-tenant-settings';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'CoursesPage.metadata',
  });
  const tenant = await getTenantSettings();

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export const dynamic = 'force-dynamic';

interface PublicCoursesRouteProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function PublicCoursesroute({
  searchParams,
}: PublicCoursesRouteProps) {
  const resolvedSearchParams = await searchParams;

  const tHero = await getTranslations('CoursesPage.hero');
  const tHeader = await getTranslations('CoursesPage.header');
  const tenant = await getTenantSettings();

  return (
    <div className='from-background via-secondary/10 to-background min-h-screen bg-gradient-to-b'>
      <section className='from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden bg-gradient-to-r px-6 py-20 md:px-8'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='bg-primary/10 absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full' />
          <div className='bg-primary/5 absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full' />
          <div className='bg-primary/10 absolute bottom-20 left-1/3 h-12 w-12 animate-pulse rounded-full' />
        </div>
        <div className='relative mx-auto max-w-7xl text-center'>
          <div className='bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm'>
            <span className='bg-primary mr-2 h-2 w-2 animate-pulse rounded-full'></span>
            {tHero('badge')}
          </div>
          <h1 className='mb-6 text-4xl leading-tight font-light tracking-tight md:text-6xl lg:text-7xl'>
            <span className='from-primary to-primary/80 block bg-gradient-to-r bg-clip-text font-semibold text-transparent'>
              {tHero('title')}
            </span>
          </h1>
          <div className='via-primary mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent to-transparent' />
          <p className='text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl'>
            {tHero('description')}
          </p>
        </div>
      </section>

      <section className='px-6 py-16 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-12 flex flex-col items-center justify-center text-center'>
            <h2 className='mb-2 text-3xl font-bold tracking-tight md:text-4xl'>
              {tHeader('title', { tenantName: tenant.name })}
            </h2>
            <p className='text-muted-foreground'>{tHeader('description')}</p>
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
  searchParams: { q?: string; category?: string };
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
