import { type NextRequest, NextResponse } from 'next/server';
import { extractSubdomain } from '@/lib/utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Block access to admin page from subdomains
    // if (pathname.startsWith('/admin')) {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }

    // For the root path on a subdomain, rewrite to the subdomain page
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${pathname}`, request.url),
    );
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|[\\w-]+\\.\\w+).*)'],
};
