import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';

export async function getContactMessages() {
  const { user } = await requireAdmin();

  const messages = await prisma.contactMessage.findMany({
    where: {
      tenantId: user.tenantId ?? '',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return messages;
}
