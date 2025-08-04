import { type NextRequest, NextResponse } from 'next/server';
import { extractSubdomain } from '@/lib/subdomain';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = await extractSubdomain(request);

  if (subdomain) {
    // Check if the tenant exists using our now-reliable function.
    const tenantId = await getTenantIdFromSlug(subdomain);

    if (!tenantId) {
      // If not, redirect to a clear error page on the main domain.
      // This prevents the app from trying to render a layout that will fail.
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    // If the tenant exists, proceed with the rewrite as before.
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${pathname}`, request.url),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|not-found).*)'],
  runtime: 'nodejs',
};
