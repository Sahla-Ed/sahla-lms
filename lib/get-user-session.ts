import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

/**
 * @returns {Promise<User | null>}
 */
export const getUserSession = cache(async () => {
  try {
    const host = Object.fromEntries(await headers()).host;
    const subdomain = await extractSubdomain(undefined, host);
    const tenantId = await getTenantIdFromSlug(subdomain);

    const session = await auth(tenantId ?? '').api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error('Failed to get user session:', error);
    return null;
  }
});

/**
 * @returns {Promise<string | null>}
 */
export const getUserRole = cache(async () => {
  const user = await getUserSession();
  return user ? user.role : null;
});
