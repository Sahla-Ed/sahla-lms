import 'server-only';
import { prisma } from '@/lib/db';
import { requireAdmin } from './require-admin';
import { cache } from 'react';

export const getSubscription = cache(async () => {
  const { user } = await requireAdmin();

  const subscription = await prisma.subscription.findUnique({
    //FIXME:this should return the right subscription with refrenceid
    where: {
      id: user.id,
    },
  });

  return subscription;
});
