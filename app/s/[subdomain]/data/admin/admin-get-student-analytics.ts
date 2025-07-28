import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';
import { notFound } from 'next/navigation';

export async function adminGetStudentAnalytics(userId: string) {
  const { user: adminUser } = await requireAdmin();

  const student = await prisma.user.findFirst({
    where: {
      id: userId,
      tenantId: adminUser.tenantId, // Ensure the student belongs to the admin's tenant
      role: { not: 'admin' },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      enrollment: {
        where: { status: 'Active' },
        select: {
          createdAt: true,
          Course: {
            select: {
              id: true,
              title: true,
              chapter: {
                select: {
                  _count: {
                    select: { lessons: true },
                  },
                },
              },
            },
          },
        },
      },
      lessonProgress: {
        where: { completed: true },
        select: {
          lessonId: true,
        },
      },
      quizAttempts: {
        select: {
          score: true,
          lessonId: true,
          completedAt: true,
        },
        orderBy: {
          completedAt: 'desc',
        },
      },
    },
  });

  if (!student) {
    return notFound();
  }

  // Calculate total lessons and completed lessons for each course
  const coursesWithProgress = student.enrollment.map((enrollment) => {
    const totalLessons = enrollment.Course.chapter.reduce(
      (sum, chap) => sum + chap._count.lessons,
      0,
    );
    const completedLessons = student.lessonProgress.length; // This is a simplification; a more precise count would be needed per course
    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      ...enrollment,
      totalLessons,
      completedLessons,
      progressPercentage,
    };
  });

  // Calculate total spending
  const totalSpentResult = await prisma.enrollment.aggregate({
    _sum: { amount: true },
    where: { userId: student.id, status: 'Active' },
  });
  const totalSpent = (totalSpentResult._sum.amount ?? 0) / 100;

  return { ...student, coursesWithProgress, totalSpent };
}

export type StudentAnalyticsData = Awaited<
  ReturnType<typeof adminGetStudentAnalytics>
>;
