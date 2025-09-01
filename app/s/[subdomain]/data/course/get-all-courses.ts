import { prisma } from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { getSubdomain } from '@/lib/subdomain';
import { headers } from 'next/headers';
import 'server-only';

export interface CourseFilters {
  q?: string;
  category?: string;
}

export async function getAllCourses(filters: CourseFilters = {}) {
  const host = Object.fromEntries(await headers()).host;
  const subdomain = getSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);
  const { q, category } = filters;

  // --- START DEBUGGING ---
  console.log('--- [getAllCourses] Debugging ---');
  console.log(`Tenant ID: ${tenantId}`);
  console.log(`Search Query (q): "${q}"`);
  console.log(`Category Filter: "${category}"`);
  // --- END DEBUGGING ---

  const whereClause: Prisma.CourseWhereInput = {
    status: 'Published',
    tenantId: tenantId,
  };

  // 1. Filter by search query (q)
  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
      { smallDescription: { contains: q, mode: 'insensitive' } } // تحسين للبحث
    ];
  }

  // 2. Filter by specific category
  if (category) {
    whereClause.category = category;
  }

  // --- START DEBUGGING ---
  console.log('Prisma WHERE clause:', JSON.stringify(whereClause, null, 2));
  // --- END DEBUGGING ---
  
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

  // --- START DEBUGGING ---
  console.log(`Found ${data.length} courses.`);
  console.log('---------------------------------');
  // --- END DEBUGGING ---

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
