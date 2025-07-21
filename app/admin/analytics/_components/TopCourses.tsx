import { getTopPerformingCourses } from '@/app/data/admin/admin-get-analytics';
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>Based on number of enrollments.</CardDescription>
      </CardHeader>
      <CardContent>
        <TopCoursesChart data={topCourses} />
      </CardContent>
    </Card>
  );
}
