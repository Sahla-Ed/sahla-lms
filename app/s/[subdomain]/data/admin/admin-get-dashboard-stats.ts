import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';

export async function adminGetDashboardStats() {
  const { user } = await requireAdmin();
  const tenantId = user.tenantId;

  if (!tenantId) {
    throw new Error('Tenant not found for the current admin.');
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const [totalCustomers, activeStudents, newEnrollments, revenueData] =
    await Promise.all([
      prisma.user.count({
        where: {
          tenantId: tenantId,
          role: 'user',
          enrollment: { some: { status: 'Active' } },
        },
      }),

      prisma.user.count({
        where: {
          tenantId: tenantId,
          role: 'user',
          enrollment: { some: { status: 'Active' } },
          // last_activity: { gte: thirtyDaysAgo }
        },
      }),

      prisma.enrollment.count({
        where: {
          tenantId: tenantId,
          status: 'Active',
          createdAt: { gte: thirtyDaysAgo },
        },
      }),

      prisma.enrollment.aggregate({
        _sum: { amount: true },
        where: {
          tenantId: tenantId,
          status: 'Active',
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

  const totalRevenue = (revenueData._sum.amount || 0) / 100;

  return {
    totalCustomers,
    activeStudents,
    newEnrollments,
    totalRevenue,
  };
}
