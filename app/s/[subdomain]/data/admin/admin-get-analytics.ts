import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';

export async function getKpiStats() {
  const { user } = await requireAdmin();

  const [
    totalUsers,
    totalCourses,
    activeEnrollments,
    pendingEnrollments,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count({
      where: { tenantId: user.tenantId, role: { not: 'admin' } },
    }),
    prisma.course.count({ where: { tenantId: user.tenantId } }),
    prisma.enrollment.count({
      where: { status: 'Active', tenantId: user.tenantId },
    }),
    prisma.enrollment.count({
      where: { status: 'Pending', tenantId: user.tenantId },
    }),
    prisma.enrollment.aggregate({
      _sum: { amount: true },
      where: { status: 'Active', tenantId: user.tenantId },
    }),
  ]);

  return {
    totalUsers,
    totalCourses,
    totalEnrollments: activeEnrollments,
    pendingEnrollments,
    totalRevenue: (totalRevenue._sum.amount ?? 0) / 100,
  };
}

export async function getTopPerformingCourses() {
  const { user } = await requireAdmin();

  const courses = await prisma.course.findMany({
    where: {
      tenantId: user.tenantId,
      status: 'Published',
    },
    select: {
      title: true,
      _count: {
        select: {
          enrollment: {
            where: { status: 'Active' },
          },
        },
      },
    },
    orderBy: {
      enrollment: {
        _count: 'desc',
      },
    },
    take: 5,
  });

  return courses.map((course) => ({
    name: course.title,
    enrollments: course._count.enrollment,
  }));
}

export async function getRecentEnrollments() {
  const { user } = await requireAdmin();

  return prisma.enrollment.findMany({
    where: {
      status: 'Active',
      tenantId: user.tenantId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    select: {
      id: true,
      createdAt: true,
      User: {
        select: {
          name: true,
          email: true,
        },
      },
      Course: {
        select: {
          title: true,
        },
      },
    },
  });
}
