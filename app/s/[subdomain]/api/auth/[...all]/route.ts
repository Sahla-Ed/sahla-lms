import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

export const GET = async (req: Request) => {
  const subdomain = await extractSubdomain(req);
  const tenantId = await getTenantIdFromSlug(subdomain);
  
  const { GET: originalGET } = toNextJsHandler(
    auth(tenantId ?? '').handler,
  );
  return originalGET(req);
};

export const POST = async (req: Request) => {
  const subdomain = await extractSubdomain(req);
  const tenantId = await getTenantIdFromSlug(subdomain);

  const { POST: originalPOST } = toNextJsHandler(
    auth(tenantId ?? '').handler,
  );
  return originalPOST(req);
};
