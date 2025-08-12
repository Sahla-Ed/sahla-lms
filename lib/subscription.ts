import { prisma } from './db';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';

export type PlanStatus = {
  planName: 'FREE' | 'PRO';
  status: string | null;
  periodEnd: Date | null;
};

export async function checkPlanStatus(): Promise<PlanStatus> {
  const { user } = await requireAdmin();

  const subscription = await prisma.subscription.findFirst({
    where: {
      referenceId: user.id,
    },
    orderBy: {
      periodStart: 'desc',
    },
  });

  if (!subscription) {
    return { planName: 'FREE', status: null, periodEnd: null };
  }

  const isActive =
    (subscription.status === 'active' || subscription.status === 'trialing') &&
    subscription.periodEnd &&
    subscription.periodEnd.getTime() > Date.now();

  if (isActive) {
    return {
      planName: 'PRO',
      status: subscription.status,
      periodEnd: subscription.periodEnd,
    };
  }

  return {
    planName: 'FREE',
    status: subscription.status,
    periodEnd: subscription.periodEnd,
  };
}
