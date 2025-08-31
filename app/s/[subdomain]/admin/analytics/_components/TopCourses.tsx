import { getTopPerformingCourses } from '@/app/s/[subdomain]/data/admin/admin-get-analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TopCoursesChart } from './TopCoursesChart';
import { getTranslations } from 'next-intl/server';

type TFunction = Awaited<ReturnType<typeof getTranslations<'AnalyticsPage'>>>;

export async function TopCourses({ t }: { t: TFunction }) {
  const topCourses = await getTopPerformingCourses();

  const coursesWithEnrollments = topCourses.filter(
    (course) => course.enrollments > 0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('topCourses.title')}</CardTitle>
        <CardDescription>{t('topCourses.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {coursesWithEnrollments.length === 0 ? (
          <div className='text-muted-foreground flex h-[350px] items-center justify-center py-8 text-center'>
            <p>{t('topCourses.emptyState')}</p>
          </div>
        ) : (
          <TopCoursesChart data={coursesWithEnrollments} />
        )}
      </CardContent>
    </Card>
  );
}
