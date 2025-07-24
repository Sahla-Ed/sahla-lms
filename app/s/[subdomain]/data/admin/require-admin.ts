import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { extractSubdomain } from '@/lib/subdomain';

export const requireAdmin = cache(async (shouldRedirect = true) => {
  const host = Object.fromEntries(await headers()).host;
  const tenantId = await extractSubdomain(undefined, host);
  const session = await auth(tenantId ?? '').api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/auth/login');
  }

  if (session.user.role !== 'admin') {
    return redirect('/not-admin');
  }

  return session;
});
