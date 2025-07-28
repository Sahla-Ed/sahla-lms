import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCards, KpiSkeleton } from './_components/KpiCards';
import { EnrollmentChart } from './_components/EnrollmentChart';
import { TopCourses } from './_components/TopCourses';
import { RecentEnrollments } from './_components/RecentEnrollments';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { checkPlanStatus } from '@/lib/subscription';

export default async function AnalyticsPage() {
  const plan = await checkPlanStatus();
  const isProOrEnterprise = plan.planName === 'PRO';

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Analytics</h1>
      </div>

      <Suspense fallback={<KpiSkeleton />}>
        <KpiCards />
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
                <TopCourses />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<SkeletonCard height='300px' />}>
            <RecentEnrollments />
          </Suspense>
        </>
      ) : (
        <UpgradeNotice
          title='Unlock Advanced Analytics'
          description='Gain deeper insights into course performance, student engagement, and revenue trends by upgrading to a Pro plan.'
        />
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

const UpgradeNotice = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card className='flex flex-col items-center justify-center p-8 text-center'>
    <div className='bg-muted mb-4 rounded-full p-3'>
      <Lock className='text-muted-foreground h-8 w-8' />
    </div>
    <h3 className='text-xl font-bold'>{title}</h3>
    <p className='text-muted-foreground mt-2 max-w-md'>{description}</p>
    <Button asChild className='mt-6'>
      <Link href='/admin/settings/billing'>Upgrade to Pro</Link>
    </Button>
  </Card>
);
