import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";


export async function getKpiStats() {
  await requireAdmin();

  const [totalUsers, totalCourses, totalEnrollments, totalRevenue] =
    await Promise.all([
      prisma.user.count({ where: { role: { not: "admin" } } }),
      prisma.course.count(),
      prisma.enrollment.count({ where: { status: "Active" } }),
      prisma.enrollment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "Active",
        },
      }),
    ]);

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue: (totalRevenue._sum.amount ?? 0) / 100,
  };
}


export async function getTopPerformingCourses() {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      title: true,
      _count: {
        select: {
          enrollment: {
            where: { status: "Active" },
          },
        },
      },
    },
    orderBy: {
      enrollment: {
        _count: "desc",
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
  await requireAdmin();
  return prisma.enrollment.findMany({
    where: {
      status: "Active",
    },
    orderBy: {
      createdAt: "desc",
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