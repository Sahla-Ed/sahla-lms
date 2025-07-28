import { type NextRequest, NextResponse } from 'next/server';
import { extractSubdomain } from '@/lib/subdomain';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = await extractSubdomain(request);

  if (subdomain) {
    // Rewrite requests for a subdomain to the /s/[subdomain] directory.
    // The validation of whether the subdomain (tenant) exists will happen
    // in the layout or page component, which can access the database.
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${pathname}`, request.url),
    );
  }

  // On the root domain, allow normal access.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|[\\w-]+\\.\\w+).*)'],
};
