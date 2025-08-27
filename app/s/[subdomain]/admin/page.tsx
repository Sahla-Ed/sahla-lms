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
import { adminGetDashboardStats } from '../data/admin/admin-get-dashboard-stats';
import { requireAdmin } from '../data/admin/require-admin';


interface DashboardStatsProps {
  t: Awaited<ReturnType<typeof getTranslations<'AdminDashboard'>>>;
}

async function DashboardStats({ t }: DashboardStatsProps) {
  const stats = await adminGetDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatCard title={t('kpi.totalStudents.title')} value={stats.totalCustomers} description={t('kpi.totalStudents.description')} Icon={Users} />
    <StatCard title={t('kpi.activeStudents.title')} value={stats.activeStudents} description={t('kpi.activeStudents.description')} Icon={Activity} />
    <StatCard title={t('kpi.newEnrollments.title')} value={stats.newEnrollments} description={t('kpi.newEnrollments.description')} Icon={ShoppingCart} />
    <StatCard title={t('kpi.revenueThisMonth.title')} value={`$${stats.totalRevenue.toFixed(2)}`} description={t('kpi.revenueThisMonth.description')} Icon={DollarSign} />
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
  const { user } = await requireAdmin();
  const displayName = user.name || user.email.split('@')[0];
  const enrollmentData = await adminGetEnrollmentStats();
  const t = await getTranslations('AdminIndexPage');
  const tDashboard = await getTranslations('AdminDashboard');


  return (
    <div className="space-y-6">
      <AdminWelcomeToast />
      <TrialBanner />


      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('welcomeMessage', { username: displayName })}
        </h1>
        <p className="text-muted-foreground">
          {t('welcomeDescription')}
        </p>
      </div>
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats t={tDashboard} /> 
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
  const t = await getTranslations('AdminIndexPage');
    const data = await adminGetRecentCourses();
    if (data.length === 0) {
      return (
        <EmptyState
        title={t('emptyState.title')}
        description={t('emptyState.description')}
        buttonText={t('emptyState.buttonText')}
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