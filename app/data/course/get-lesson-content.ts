import "server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../user/require-user";

export async function getLessonContent(lessonId: string) {
  const session = await requireUser();

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
      lessonProgress: {
        where: {
          userId: session?.id as string,
        },
        select: {
          completed: true,
          lessonId: true,
        },
      },
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
        orderBy: { position: "asc" },
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
    },
  });

  if (!lesson) {
    return notFound();
  }
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session?.id as string,
        courseId: lesson.Chapter.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return notFound();
  }
  // Fetch latest quiz attempt for this lesson and user
  const latestQuizAttempt = await prisma.quizAttempt.findFirst({
    where: {
      userId: session?.id as string,
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
      completedAt: "desc",
    },
  });
  return { ...lesson, latestQuizAttempt };
}

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
