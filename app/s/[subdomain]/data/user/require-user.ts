import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { extractSubdomain } from '@/lib/subdomain';

export const requireUser = cache(
  async (shouldRedirect = true, tenantId = '') => {
    const host = Object.fromEntries(await headers()).host;
    tenantId ?? (await extractSubdomain(undefined, host));
    const session = await auth(tenantId).api.getSession({
      headers: await headers(),
    });

    if (!session) {
      if (shouldRedirect) {
        return redirect('/auth/login');
      }
      return null;
    }

    return session.user;
  },
);
