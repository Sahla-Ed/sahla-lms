import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCards, KpiSkeleton } from './_components/KpiCards';
import { EnrollmentChart } from './_components/EnrollmentChart';
import { TopCourses } from './_components/TopCourses';
import { RecentEnrollments } from './_components/RecentEnrollments';

export default function AnalyticsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Analytics</h1>
      </div>
      {/* KPIs */}
      <Suspense fallback={<KpiSkeleton />}>
        <KpiCards />
      </Suspense>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Enrollment Chart */}
        <div className='lg:col-span-2'>
          <Suspense
            fallback={
              <Card>
                <CardContent className='bg-muted h-[400px] animate-pulse rounded-lg' />
              </Card>
            }
          >
            <EnrollmentChart />
          </Suspense>
        </div>
        {/* Top Courses Chart */}
        <div className='lg:col-span-1'>
          <Suspense
            fallback={
              <Card>
                <CardContent className='bg-muted h-[400px] animate-pulse rounded-lg' />
              </Card>
            }
          >
            <TopCourses />
          </Suspense>
        </div>
      </div>

      {/* Recent Enrollments Table */}
      <Suspense
        fallback={
          <Card>
            <CardContent className='bg-muted h-[300px] animate-pulse rounded-lg' />
          </Card>
        }
      >
        <RecentEnrollments />
      </Suspense>
    </div>
  );
}
