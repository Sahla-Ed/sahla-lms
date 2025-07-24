import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { extractSubdomain } from '@/lib/subdomain';

export const GET = async (req: Request) => {
  const { GET: originalGET } = toNextJsHandler(
    auth((await extractSubdomain(req)) ?? '').handler,
  );
  return originalGET(req);
};

export const POST = async (req: Request) => {
  const { POST: originalPOST } = toNextJsHandler(
    auth((await extractSubdomain(req)) ?? '').handler,
  );
  return originalPOST(req);
};
