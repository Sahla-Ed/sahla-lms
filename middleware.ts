import { type NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from '@/lib/subdomain';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Create a mutable copy of the request headers to modify them
  const requestHeaders = new Headers(request.headers);

  //  Check for a locale preference in the 'NEXT_LOCALE' cookie first
  let locale = request.cookies.get('NEXT_LOCALE')?.value;

  //  If no cookie is found, fallback to the 'accept-language' header from the browser
  if (!locale) {
    const acceptLanguage = request.headers.get('accept-language') ?? '';
    locale = locales.find((l) => acceptLanguage.startsWith(l)) || defaultLocale;
  }

  // Set a custom header 'X-Locale' with the determined locale.
  requestHeaders.set('X-Locale', locale);

  const { pathname } = request.nextUrl;
  const subdomain = getSubdomain(request);

  if (subdomain) {
    // Rewrite requests for a subdomain to the /s/[subdomain] directory.
    // The validation of whether the subdomain (tenant) exists will happen
    // in the layout or page component, which can access the database.

    // Add the original pathname to the same headers object
    requestHeaders.set('x-pathname', pathname);

    const normalizedPathname =
      pathname === '/' ? '' : pathname.replace(/\/$/, '');

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Subdomain: ${subdomain}, Rewritten URL: /s/${subdomain}${normalizedPathname}`,
      );
    }

    // Rewrite the URL, passing the modified headers that now contain both locale and pathname info
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${normalizedPathname}`, request.url),
      {
        request: {
          headers: requestHeaders,
        },
      },
    );
  }

  // On the root domain, allow normal access but pass the modified headers
  // This ensures the 'X-Locale' header is present for your main 'sahla' platform.
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api/webhook/stripe|_next|.*\\.[\\w]{2,}).*)'],
};
