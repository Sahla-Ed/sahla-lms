import 'server-only';
import { requireUser } from './require-user';
import { prisma } from '@/lib/db';

export async function getEnrolledCourses() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user?.id as string,
      status: 'Active',
    },
    select: {
      Course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user?.id as string,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];

export async function getContinueLearningCourse() {
  const user = await requireUser();
  if (!user) return null;

  const latestEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.id,
      status: 'Active',
    },
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      lastAccessedLessonId: true,
      Course: {
        select: {
          title: true,
          slug: true,
          fileKey: true,
          chapter: {
            orderBy: { position: 'asc' },
            select: {
              lessons: {
                orderBy: { position: 'asc' },
                select: {
                  id: true,
                  lessonProgress: {
                    where: { userId: user.id },
                    select: { completed: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return latestEnrollment;
}
