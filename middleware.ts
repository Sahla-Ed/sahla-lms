
import { type NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from '@/lib/subdomain';

const locales = ['en', 'ar'];
const defaultLocale = 'ar';
/**
* This function is called by the middleware to avoid direct database access from the Edge runtime.
 * @param {string} subdomain - The tenant's slug.
 * @param {URL} requestUrl - The original request URL to construct the full API path.
 * @returns {Promise<string | null>} The tenant's default language code ('en', 'ar') or null if not found.
 */
async function fetchTenantLanguage(subdomain: string, requestUrl: URL): Promise<string | null> {
  // Construct the full, absolute URL to the internal API route.
  const apiUrl = new URL(`/api/tenant-settings?slug=${subdomain}`, requestUrl.origin);
  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      console.error(`[Middleware] API call failed with status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.defaultLanguage || null;
  } catch (error) {
    console.error('[Middleware] Failed to fetch tenant settings:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const subdomain = getSubdomain(request);

  let locale: string = defaultLocale;

  if (subdomain) {
    const tenantLanguage = await fetchTenantLanguage(subdomain, request.nextUrl);
    
    if (tenantLanguage && locales.includes(tenantLanguage)) {
      locale = tenantLanguage;
      console.log(`[Middleware] Using tenant language from API: ${locale}`);
    } else {
      console.warn(`[Middleware] Could not fetch or invalid language for tenant "${subdomain}", using default: ${defaultLocale}`);
    }
  } else {

    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
      locale = cookieLocale;
    } else {
      const acceptLanguage = request.headers.get('accept-language') ?? '';
      locale = locales.find((l) => acceptLanguage.startsWith(l)) || defaultLocale;
    }
  }
  
  requestHeaders.set('X-Locale', locale);

  if (subdomain) {
    requestHeaders.set('x-pathname', pathname);
    const normalizedPathname = pathname === '/' ? '' : pathname.replace(/\/$/, '');
    
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${normalizedPathname}`, request.url),
      { request: { headers: requestHeaders } },
    );
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    '/((?!api/tenant-settings|api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.[\\w]{2,}).*)' 
  ],
};