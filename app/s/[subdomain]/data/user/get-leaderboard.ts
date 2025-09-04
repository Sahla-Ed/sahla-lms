import 'server-only';
import { prisma } from '@/lib/db';
import { requireUser } from './require-user';

export async function getLeaderboard() {
  const session = await requireUser();

  if (!session?.tenantId) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      tenantId: session.tenantId, 
      role: { not: 'admin' },
  
      xp: {
        gt: 0,
      },
      // --------------------
    },
    orderBy: {
      xp: 'desc',
    },
    take: 10,
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
    },
  });

  return users;
}