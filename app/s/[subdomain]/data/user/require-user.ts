import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

export const requireUser = cache(async (shouldRedirect = true) => {
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
    return null;
  }

  return session.user;
});
