import { Suspense } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Users, Activity, ShoppingCart, DollarSign } from 'lucide-react';


import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartAreaInteractive } from '@/components/sidebar/chart-area-interactive';
import { EmptyState } from '@/components/general/EmptyState';
import { AdminCourseCard, AdminCourseCardSkeleton } from './courses/_components/AdminCourseCard';
import { TrialBanner } from './_components/TrialBanner';
import { AdminWelcomeToast } from './_components/AdminWelcomeToast';
import { StatCard } from './_components/StatCard';


import { adminGetRecentCourses } from '../data/admin/admin-get-recent-courses';
import { adminGetEnrollmentStats } from '../data/admin/admin-get-enrollment-stats';
import { AdminCourseType } from '../data/admin/admin-get-courses';
import { adminGetDashboardStats } from '../data/admin/admin-get-dashboard-stats'; // <-- استيراد الدالة الجديدة


async function DashboardStats() {
  const stats = await adminGetDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Students" value={stats.totalCustomers} description="Users enrolled in courses" Icon={Users} />
      <StatCard title="Active Students" value={stats.activeStudents} description="Last 30 days" Icon={Activity} />
      <StatCard title="New Enrollments" value={stats.newEnrollments} description="Last 30 days" Icon={ShoppingCart} />
      <StatCard title="Revenue This Month" value={`$${stats.totalRevenue.toFixed(2)}`} description="Total sales this month" Icon={DollarSign} />
    </div>
  );
}


function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
    </div>
  );
}


export default async function AdminIndexPage() {
  const enrollmentData = await adminGetEnrollmentStats();
  const t = await getTranslations('AdminIndexPage');

  return (
    <div className="space-y-6">
      <AdminWelcomeToast />
      <TrialBanner />


      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <ChartAreaInteractive data={enrollmentData} />

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{t('recentCoursesTitle')}</h2>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href='/admin/courses'
          >
            {t('viewAllCoursesButton')}
          </Link>
        </div>
        <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </div>
  );
}


async function RenderRecentCourses() {
    const data = await adminGetRecentCourses();
    if (data.length === 0) {
      return (
        <EmptyState
          buttonText='Create new Course'
          description='you dont have any courses. create some to see them here'
          title='You dont have any courses yet!'
          href='/admin/courses/create'
        />
      );
    }
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {data.map((course: AdminCourseType) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    );
}
  
function RenderRecentCoursesSkeletonLayout() {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, index) => (
          <AdminCourseCardSkeleton key={index} />
        ))}
      </div>
    );
}