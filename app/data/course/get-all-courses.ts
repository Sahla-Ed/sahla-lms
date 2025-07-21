import { prisma } from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma';
import 'server-only';

export interface CourseFilters {
  q?: string;
  category?: string;
}

export async function getAllCourses(filters: CourseFilters = {}) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const { q, category } = filters;

  const whereClause: Prisma.CourseWhereInput = {
    status: 'Published',
  };

  // 1. Filter by search query (q)
  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
    ];
  }

  // 2. Filter by specific category
  if (category) {
    whereClause.category = category;
  }

  const data = await prisma.course.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      id: true,
      level: true,
      duration: true,
      category: true,
    },
  });

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
