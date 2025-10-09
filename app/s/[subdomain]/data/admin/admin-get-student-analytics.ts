import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';
import { notFound } from 'next/navigation';

export async function adminGetStudentAnalytics(userId: string) {
  const { user: adminUser } = await requireAdmin();

  // 1. Fetch the student, ensuring they belong to the admin's tenant.
  const student = await prisma.user.findFirst({
    where: {
      id: userId,
      tenantId: adminUser.tenantId, // Security: Scope the search to the current tenant.
      role: { not: 'admin' },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
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
                  lessons: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      // Fetch all of the student's completed lessons for progress calculation.
      lessonProgress: {
        where: { completed: true },
        select: {
          lessonId: true,
        },
      },
      // Fetch quiz attempts for potential future analytics.
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

  // If no student is found (or they aren't in this tenant), show a 404 page.
  if (!student) {
    notFound();
  }

  // 2. Calculate the total amount the student has spent.
  const totalSpentResult = await prisma.enrollment.aggregate({
    _sum: { amount: true },
    where: { userId: student.id, status: 'Active' },
  });
  const totalSpent = (totalSpentResult._sum.amount ?? 0) / 100;

  // 3. Return the combined data.
  // The progress calculation logic is now handled in the page component,
  // keeping this function focused on fetching data.
  return { ...student, totalSpent };
}

// Export the return type for use in the page component.
export type StudentAnalyticsData = Awaited<
  ReturnType<typeof adminGetStudentAnalytics>
>;
