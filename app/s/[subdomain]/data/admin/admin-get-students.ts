import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';

export async function adminGetStudents() {
  const { user: adminUser } = await requireAdmin();

  const students = await prisma.user.findMany({
    where: {
      tenantId: adminUser.tenantId,
      role: {
        not: 'admin',
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: {
        select: {
          enrollment: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return students;
}

export type AdminStudentListType = Awaited<ReturnType<typeof adminGetStudents>>;
