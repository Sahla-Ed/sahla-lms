import { adminGetLesson } from '@/app/data/admin/admin-get-lesson';
import { QuizForm } from './_components/QuizForm';
import { LessonForm } from '../_components/LessonForm';

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonEditPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  if (lesson.type === 'QUIZ') {
    return (
      <QuizForm lesson={lesson} chapterId={chapterId} courseId={courseId} />
    );
  }

  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
}
