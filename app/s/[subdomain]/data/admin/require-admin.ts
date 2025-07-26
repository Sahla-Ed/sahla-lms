import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

export const requireAdmin = cache(async (shouldRedirect = true) => {
  const host = Object.fromEntries(await headers()).host;
  const subdomain = await extractSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);

  const session = await auth(tenantId ?? '').api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (shouldRedirect) {
      return redirect('/auth/login');
    }
    throw new Error('Unauthenticated');
  }

  if (session.user.role !== 'admin') {
    if (shouldRedirect) {
      return redirect('/not-admin');
    }
    throw new Error('Unauthorized: User is not an admin.');
  }

  return { session: session.session, user: session.user };
});
