import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

export const requireUser = async (shouldRedirect = true) => {
  const headersList = Object.fromEntries(await headers());
  const host = headersList.host;
  const origin = headersList['x-pathname'];
  const subdomain = await extractSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);

  const session = await auth(tenantId ?? '').api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (shouldRedirect) {
      return redirect(`/auth/sign-in?redirectTo=${origin}`);
    }
    return null;
  }

  return session.user;
};
