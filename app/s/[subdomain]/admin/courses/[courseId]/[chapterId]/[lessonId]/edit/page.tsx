import { adminGetLesson } from '@/app/s/[subdomain]/data/admin/admin-get-lesson';
import { QuizForm } from './_components/QuizForm';
import { LessonForm } from '../_components/LessonForm';
import CodingForm from './_components/CodingForm';
import { checkPlanStatus } from '@/lib/subscription';

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonEditPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const [lesson, planStatus] = await Promise.all([
    adminGetLesson(lessonId),
    checkPlanStatus(),
  ]);

  if (lesson.type === 'QUIZ') {
    return (
      <QuizForm
        lesson={lesson}
        chapterId={chapterId}
        courseId={courseId}
        planName={planStatus.planName}
      />
    );
  } else if (lesson.type === 'CODING') {
    return (
      <CodingForm lesson={lesson} chapterId={chapterId} courseId={courseId} />
    );
  }

  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
}
