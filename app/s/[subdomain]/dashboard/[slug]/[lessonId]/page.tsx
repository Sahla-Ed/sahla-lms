import { getLessonContent } from '@/app/s/[subdomain]/data/course/get-lesson-content';
import { CourseContent } from './_components/CourseContent';
import { Suspense } from 'react';
import { QuizPlayer } from './_components/QuizPlayer';
import { CodingPlayground } from './_components/CodingPlayground';
import { LessonSkeleton } from './_components/LessonSkeleton';
import { getComments } from './comment-actions';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';

type Params = Promise<{ lessonId: string }>;

export default async function LessonContentPage({
  params,
}: {
  params: Params;
}) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const [data, comments] = await Promise.all([
    getLessonContent(lessonId),
    getComments(lessonId),
  ]);

  const session = await requireUser();
  const userId = session?.id || '';

  if (data.type === 'QUIZ') {
    return <QuizPlayer data={data} />;
  }

  if (data.type === 'CODING') {
    return <CodingPlayground data={data} userId={userId} />;
  }
  return <CourseContent data={data} comments={comments} />;
}
