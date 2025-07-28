import { getTopPerformingCourses } from '@/app/s/[subdomain]/data/admin/admin-get-analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TopCoursesChart } from './TopCoursesChart';

export async function TopCourses() {
  const topCourses = await getTopPerformingCourses();

  const coursesWithEnrollments = topCourses.filter(
    (course) => course.enrollments > 0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>Based on number of enrollments.</CardDescription>
      </CardHeader>
      <CardContent>
        {coursesWithEnrollments.length === 0 ? (
          <div className='text-muted-foreground flex h-[350px] items-center justify-center py-8 text-center'>
            <p>No course enrollment data to display yet.</p>
          </div>
        ) : (
          <TopCoursesChart data={coursesWithEnrollments} />
        )}
      </CardContent>
    </Card>
  );
}
