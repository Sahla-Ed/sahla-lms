import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { getSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const subdomain = getSubdomain(req);
  const tenantId = await getTenantIdFromSlug(subdomain);

  const { GET: originalGET } = toNextJsHandler(auth(tenantId ?? '').handler);
  return originalGET(req);
};

export const POST = async (req: NextRequest) => {
  const subdomain = getSubdomain(req);
  const tenantId = await getTenantIdFromSlug(subdomain);

  const { POST: originalPOST } = toNextJsHandler(auth(tenantId ?? '').handler);
  return originalPOST(req);
};
