import 'server-only';
import { requireUser } from './require-user';
import { prisma } from '@/lib/db';

export async function getEnrolledCourses() {
  const session = await requireUser();

  const user = session?.user;

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
