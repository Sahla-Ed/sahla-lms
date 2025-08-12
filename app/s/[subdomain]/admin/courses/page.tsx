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
import { Terminal } from 'lucide-react';
import { requireAdmin } from '../../data/admin/require-admin';
import { prisma } from '@/lib/db';

export default async function CoursesPage() {
  const { user } = await requireAdmin();
  const plan = await checkPlanStatus();
  const courseCount = await prisma.course.count({ where: { userId: user.id } });

  const canCreateCourse = plan.planName === 'PRO' || courseCount < 1;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Your Courses</h1>

        {canCreateCourse ? (
          <Link className={buttonVariants()} href='/admin/courses/create'>
            Create Course
          </Link>
        ) : (
          <Button disabled title='Upgrade to create more courses'>
            Create Course
          </Button>
        )}
      </div>

      {!canCreateCourse && (
        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Free Plan Limit Reached</AlertTitle>
          <AlertDescription>
            You can only create 1 course on the Free plan.
            <Link
              href='/admin/settings/billing'
              className='ml-1 font-bold underline'
            >
              Upgrade to Pro
            </Link>{' '}
            to create unlimited courses.
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
  const data = await adminGetCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        title='No courses found'
        description='Create a new course to get started'
        buttonText='Create Course'
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
