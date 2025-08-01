import { getCourseSidebarData } from '@/app/s/[subdomain]/data/course/get-course-sidebar-data';
import { redirect } from 'next/navigation';

interface iAppProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseSlugRoute({ params }: iAppProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  // Find the first incomplete lesson
  let firstIncompleteLesson = null;
  let firstLesson = null;
  for (const chapter of course.course.chapter) {
    for (const lesson of chapter.lessons) {
      if (!firstLesson) firstLesson = lesson;
      const isCompleted =
        lesson.lessonProgress &&
        lesson.lessonProgress.length > 0 &&
        lesson.lessonProgress[0].completed;
      if (!isCompleted && !firstIncompleteLesson) {
        firstIncompleteLesson = lesson;
      }
    }
  }

  if (firstIncompleteLesson) {
    redirect(`/dashboard/${slug}/${firstIncompleteLesson.id}`);
  } else if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className='flex h-full items-center justify-center text-center'>
      <h2 className='mb-2 text-2xl font-bold'>No lessons available</h2>
      <p className='text-muted-foreground'>
        This course does not have any lessons yet!
      </p>
    </div>
  );
}
