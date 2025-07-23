import 'server-only';
import { requireUser } from '../user/require-user';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function getCourseSidebarData(slug: string) {
  const session = await requireUser();

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      fileKey: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      chapter: {
        orderBy: {
          position: 'asc',
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: 'asc',
            },
            select: {
              id: true,
              title: true,
              type: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: session?.id,
                },
                select: {
                  completed: true,
                  lessonId: true,
                  id: true,
                },
              },
              attempts: {
                where: {
                  userId: session?.id,
                },
                orderBy: {
                  completedAt: 'desc',
                },
                take: 1,
                select: {
                  score: true,
                  completedAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session?.id as string,
        courseId: course.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== 'Active') {
    return notFound();
  }
  
  let previousLessonCompleted = true;
  const chaptersWithLockState = course.chapter.map(chapter => ({
    ...chapter,
    lessons: chapter.lessons.map(lesson => {
      const isCompleted = lesson.lessonProgress.some(p => p.completed);
      const isLocked = !previousLessonCompleted;

      if (!isLocked) {
        previousLessonCompleted = isCompleted;
      }

      return { ...lesson, isLocked };
    }),
  }));

  const courseWithLockState = { ...course, chapter: chaptersWithLockState };

  const certificate = await prisma.certificate.findUnique({
    where: {
      userId_courseId: {
        userId: session?.id as string,
        courseId: course.id,
      },
    },
  });

  return {
    course: courseWithLockState,
    hasCertificate: !!certificate,
  };
}


export type CourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;