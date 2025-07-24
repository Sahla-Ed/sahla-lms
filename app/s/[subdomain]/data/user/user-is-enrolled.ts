import 'server-only';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { headers } from 'next/headers';
import { extractSubdomain } from '@/lib/subdomain';

export async function checkIfCourseBought(courseId: string): Promise<boolean> {
  const host = Object.fromEntries(await headers()).host;
  const tenantId = await extractSubdomain(undefined, host);
  const session = await auth(tenantId ?? '').api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return false;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        courseId: courseId,
        userId: session.user.id,
      },
    },
    select: {
      status: true,
    },
  });

  return enrollment?.status === 'Active' ? true : false;
}
