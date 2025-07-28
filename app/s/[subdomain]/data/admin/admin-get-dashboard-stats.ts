import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';

export async function adminGetDashboardStats() {
  // Get the current admin user to access their tenantId
  const { user } = await requireAdmin();

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Total Signups - count of all non-admin users *in this tenant*
      prisma.user.count({
        where: {
          tenantId: user.tenantId,
          role: { not: 'admin' },
        },
      }),

      // Total Customers - count of distinct users *in this tenant* who have active enrollments
      prisma.user.count({
        where: {
          tenantId: user.tenantId, // Filter users by tenant first
          enrollment: {
            some: { status: 'Active' }, // Then check if they have any enrollments
          },
        },
      }),

      // Total Courses - count of all courses *in this tenant*
      prisma.course.count({
        where: {
          tenantId: user.tenantId,
        },
      }),

      // Total Lessons - count of all lessons *in this tenant*
      prisma.lesson.count({
        where: {
          tenantId: user.tenantId,
        },
      }),
    ]);

  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
