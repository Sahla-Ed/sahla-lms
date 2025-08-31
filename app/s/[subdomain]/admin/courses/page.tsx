import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from './_components/AdminCourseCard';
import { EmptyState } from '@/components/general/EmptyState';
import { Suspense } from 'react';
import {
  AdminCourseType,
  adminGetCourses,
} from '@/app/s/[subdomain]/data/admin/admin-get-courses';
import { checkPlanStatus } from '@/lib/subscription';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Crown } from 'lucide-react';
import { requireAdmin } from '../../data/admin/require-admin';
import { prisma } from '@/lib/db';
import { getTranslations } from 'next-intl/server';

export default async function CoursesPage() {
  const t = await getTranslations('AdminCoursesPage');
  const { user } = await requireAdmin();
  const plan = await checkPlanStatus();
  const courseCount = await prisma.course.count({ where: { userId: user.id } });

  const canCreateCourse = plan.planName === 'PRO' || courseCount < 1;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{t('title')}</h1>

        {canCreateCourse ? (
          <Link className={buttonVariants()} href='/admin/courses/create'>
            {t('createCourse')}
          </Link>
        ) : (
          <Button disabled title={t('upgradeTooltip')}>
            {t('createCourse')}
          </Button>
        )}
      </div>

      {!canCreateCourse && (
        <Alert>
          <Crown className='h-4 w-4' />
          <AlertTitle>{t('limitReached')}</AlertTitle>
          <AlertDescription>
            {t.rich('limitDescription', {
              upgradeLink: (chunks) => (
                <Link
                  href='/admin/settings/billing'
                  className='ml-1 font-bold underline'
                >
                  {chunks}
                </Link>
              ),
            })}
          </AlertDescription>
        </Alert>
      )}

      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}

async function RenderCourses() {
  const t = await getTranslations('AdminCoursesPage.emptyState');
  const data = await adminGetCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        title={t('title')}
        description={t('description')}
        buttonText={t('button')}
        href='/admin/courses/create'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
      {data.map((course: AdminCourseType) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
