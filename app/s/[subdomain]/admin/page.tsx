import { Suspense } from 'react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';


import { buttonVariants } from '@/components/ui/button';
import { ChartAreaInteractive } from '@/components/sidebar/chart-area-interactive';
import { TrialBanner } from './_components/TrialBanner';
import { AdminWelcomeToast } from './_components/AdminWelcomeToast';
import { DashboardStats, StatsSkeleton } from './_components/DashboardStats';
import { RecentCourses, RecentCoursesSkeleton } from './_components/RecentCourses';


import { adminGetEnrollmentStats } from '../data/admin/admin-get-enrollment-stats';
import { requireAdmin } from '../data/admin/require-admin';
import { getTenantSettings } from '../data/admin/get-tenant-settings';



export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'AdminDashboardMetadata' });
  const tenant = await getTenantSettings();
  const title = t('title', { tenantName: tenant.name });
  return { title };
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
      
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('welcomeMessage', { username: displayName })}
        </h1>
        <p className="text-muted-foreground">
          {t('welcomeDescription')}
        </p>
      </div>

      <TrialBanner />
      
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
        <Suspense fallback={<RecentCoursesSkeleton />}>
          <RecentCourses />
        </Suspense>
      </div>
    </div>
  );
}