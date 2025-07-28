import 'server-only';
import { prisma } from './db';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';

export type PlanStatus = {
  planName: 'FREE' | 'PRO';
};

export async function checkPlanStatus(): Promise<PlanStatus> {
  const { user } = await requireAdmin();

  const tenant = await prisma.tenants.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      plan: true,
    },
  });

  if (tenant?.plan === 'PRO') {
    return { planName: 'PRO' };
  }

  return { planName: 'FREE' };
}
