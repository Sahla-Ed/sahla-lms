import { type NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from '@/lib/subdomain';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = getSubdomain(request);

  if (subdomain) {
    // Rewrite requests for a subdomain to the /s/[subdomain] directory.
    // The validation of whether the subdomain (tenant) exists will happen
    // in the layout or page component, which can access the database.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);
    const normalizedPathname =
      pathname === '/' ? '' : pathname.replace(/\/$/, '');
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Subdomain: ${subdomain}, Rewritten URL: /s/${subdomain}${normalizedPathname}`,
      );
    }
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${normalizedPathname}`, request.url),
      { headers: requestHeaders },
    );
  }

  // On the root domain, allow normal access.
  return NextResponse.next();
}
// exclude the Stripe webhook API route.
export const config = {
  matcher: ['/((?!api/webhook/stripe|_next|.*\\.[\\w]{2,}).*)'],
};
