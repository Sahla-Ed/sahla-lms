import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats, StatsSkeleton } from '../_components/DashboardStats';
import { EnrollmentChart } from './_components/EnrollmentChart';
import { TopCourses } from './_components/TopCourses';
import { RecentEnrollments } from './_components/RecentEnrollments';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { checkPlanStatus } from '@/lib/subscription';
import { getTranslations } from 'next-intl/server';


type TFunction = Awaited<ReturnType<typeof getTranslations<'AnalyticsPage'>>>;

export default async function AnalyticsPage() {
  const plan = await checkPlanStatus();
  const isProOrEnterprise = plan.planName === 'PRO';
  
  const t = await getTranslations('AnalyticsPage');
  const tDashboard = await getTranslations('AdminDashboard');

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{t('header.title')}</h1>
      </div>

      <Suspense fallback={<StatsSkeleton />}>

        <DashboardStats t={tDashboard} /> 
      </Suspense>

      {isProOrEnterprise ? (
        <>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <Suspense fallback={<SkeletonCard />}>
                <EnrollmentChart />
              </Suspense>
            </div>
            <div className='lg:col-span-1'>
              <Suspense fallback={<SkeletonCard />}>
                <TopCourses t={t} />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<SkeletonCard height='300px' />}>
            <RecentEnrollments t={t} />
          </Suspense>
        </>
      ) : (

        <UpgradeNotice t={t} />
      )}
    </div>
  );
}

const SkeletonCard = ({ height = '400px' }: { height?: string }) => (
  <Card>
    <CardContent
      className='bg-muted animate-pulse rounded-lg'
      style={{ height }}
    />
  </Card>
);


const UpgradeNotice = ({ t }: { t: TFunction }) => (
  <Card className='flex flex-col items-center justify-center p-8 text-center'>
    <div className='bg-muted mb-4 rounded-full p-3'>
      <Lock className='text-muted-foreground h-8 w-8' />
    </div>

    <h3 className='text-xl font-bold'>{t('upgradeNotice.title')}</h3>
    <p className='text-muted-foreground mt-2 max-w-md'>
      {t('upgradeNotice.description')}
    </p>
    <Button asChild className='mt-6'>
      <Link href='/admin/settings/billing'>{t('upgradeNotice.button')}</Link>
    </Button>
  </Card>
);