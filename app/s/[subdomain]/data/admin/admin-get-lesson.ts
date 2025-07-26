import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';
import { notFound } from 'next/navigation';

export async function adminGetLesson(id: string) {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      videoKey: true,
      thumbnailKey: true,
      description: true,
      id: true,
      position: true,
      type: true,
      timer: true,
      questions: {
        select: {
          question: true,
          questionId: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
      codingExercise: {
        select: {
          id: true,
          language: true,
          starterCode: true,
          instructions: true,
          solutionCode: true,
          testCases: true,
          timeLimit: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;
