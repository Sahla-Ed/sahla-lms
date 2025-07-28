import { adminGetStudentAnalytics } from '@/app/s/[subdomain]/data/admin/admin-get-student-analytics';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DollarSign, BookOpen } from 'lucide-react';

export default async function StudentDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const student = await adminGetStudentAnalytics(params.userId);

  // Helper function to calculate progress for a single course
  const getCourseProgress = (enrollment: (typeof student.enrollment)[0]) => {
    // Flatten all lesson IDs for the specific course
    const allLessonIdsInCourse = enrollment.Course.chapter.flatMap((chapter) =>
      chapter.lessons.map((lesson) => lesson.id),
    );
    const totalLessons = allLessonIdsInCourse.length;

    // Filter the student's total progress to only include lessons from this course
    const completedLessonsForCourse = student.lessonProgress.filter((lp) =>
      allLessonIdsInCourse.includes(lp.lessonId),
    ).length;

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessonsForCourse / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLessons: completedLessonsForCourse,
      progressPercentage,
    };
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-16 w-16'>
          {/* Use a placeholder if the student image is null */}
          <AvatarImage
            src={student.image ?? `https://avatar.vercel.sh/${student.email}`}
            alt={student.name}
          />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='text-3xl font-bold'>{student.name}</h1>
          <p className='text-muted-foreground'>{student.email}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Spent</CardTitle>
            <DollarSign className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${student.totalSpent.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Enrollments</CardTitle>
            <BookOpen className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {student.enrollment.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {student.enrollment.length === 0 ? (
            <p className='text-muted-foreground py-8 text-center'>
              This student is not enrolled in any courses.
            </p>
          ) : (
            <div className='space-y-4'>
              {student.enrollment.map((enrollment) => {
                const { totalLessons, completedLessons, progressPercentage } =
                  getCourseProgress(enrollment);
                return (
                  <div key={enrollment.Course.id} className='space-y-2'>
                    <h3 className='font-semibold'>{enrollment.Course.title}</h3>
                    <Progress value={progressPercentage} />
                    <p className='text-muted-foreground text-xs'>
                      {completedLessons} of {totalLessons} lessons completed (
                      {progressPercentage}%)
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
