import { getLessonContent } from '@/app/data/course/get-lesson-content';
import { CourseContent } from './_components/CourseContent';
import { Suspense } from 'react';
import { QuizPlayer } from './_components/QuizPlayer';
import { CodingPlayground } from './_components/CodingPlayground';
import { LessonSkeleton } from './_components/LessonSkeleton';

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
  const data = await getLessonContent(lessonId);

  if (data.type === 'QUIZ') {
    return <QuizPlayer data={data} />;
  }
  if (data.type === 'CODING') {
    return <CodingPlayground />;
  }
  return <CourseContent data={data} />;
}
