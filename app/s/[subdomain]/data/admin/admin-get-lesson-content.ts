import 'server-only';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { requireAdmin } from './require-admin';

export async function adminGetLessonContent(lessonId: string) {
  const { user } = await requireAdmin();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      type: true,
      timer: true,
      questions: {
        select: {
          question: {
            select: {
              id: true,
              text: true,
              answer: true,
              type: true,
              options: true,
              explanation: true,
            },
          },
        },
        orderBy: { position: 'asc' },
      },
      Chapter: {
        select: {
          courseId: true,
          Course: {
            select: {
              slug: true,
            },
          },
        },
      },
      codingExercise: {
        select: {
          id: true,
          language: true,
          starterCode: true,
          instructions: true,
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  const latestQuizAttempt = await prisma.quizAttempt.findFirst({
    where: {
      userId: user.id,
      lessonId,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
    orderBy: {
      completedAt: 'desc',
    },
  });

  return { ...lesson, latestQuizAttempt, lessonProgress: [] };
}
