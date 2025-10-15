import { type NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from '@/lib/subdomain';

const locales = ['en', 'ar'];
const defaultLocale = 'ar';

// Cache for tenant languages to avoid repeated API calls
const tenantLanguageCache = new Map<string, string>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map<string, number>();

/**
 * Get tenant language from cache or return default
 * @param {string} subdomain - The tenant's slug.
 * @returns {string} The tenant's default language code ('en', 'ar') or default locale.
 */
function getTenantLanguageFromCache(subdomain: string): string {
  const now = Date.now();
  const cacheTime = cacheTimestamps.get(subdomain);

  // Check if cache is still valid
  if (cacheTime && now - cacheTime < CACHE_TTL) {
    return tenantLanguageCache.get(subdomain) || defaultLocale;
  }

  // Cache expired or doesn't exist, return default
  return defaultLocale;
}

/**
 * Set tenant language in cache
 * @param {string} subdomain - The tenant's slug.
 * @param {string} language - The language code.
 */
function setTenantLanguageCache(subdomain: string, language: string): void {
  tenantLanguageCache.set(subdomain, language);
  cacheTimestamps.set(subdomain, Date.now());
}

/**
 * Fetch tenant language in background to populate cache
 * @param {string} subdomain - The tenant's slug.
 * @param {URL} requestUrl - The original request URL to construct the full API path.
 */
async function fetchTenantLanguageInBackground(
  subdomain: string,
  requestUrl: URL,
): Promise<void> {
  const apiUrl = new URL(
    `/api/tenant-settings?slug=${subdomain}`,
    requestUrl.origin,
  );

  fetch(apiUrl.toString())
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`API call failed with status: ${response.status}`);
    })
    .then((data) => {
      if (data.defaultLanguage && locales.includes(data.defaultLanguage)) {
        setTenantLanguageCache(subdomain, data.defaultLanguage);
        console.log(
          `[Middleware] Cached tenant language: ${data.defaultLanguage} for subdomain: ${subdomain}`,
        );
      }
    })
    .catch((error) => {
      console.error(
        '[Middleware] Failed to fetch tenant settings in background:',
        error,
      );
    });
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname, search } = request.nextUrl;
  const subdomain = getSubdomain(request);

  let locale: string = defaultLocale;

  if (subdomain) {
    // Use cached tenant language instead of making API calls
    locale = getTenantLanguageFromCache(subdomain);

    if (
      !tenantLanguageCache.has(subdomain) ||
      (cacheTimestamps.get(subdomain) &&
        Date.now() - cacheTimestamps.get(subdomain)! > CACHE_TTL)
    ) {
      // Make API call in background to populate cache for next time
      fetchTenantLanguageInBackground(subdomain, request.nextUrl);
    }

    console.log(
      `[Middleware] Using tenant language: ${locale} for subdomain: ${subdomain}`,
    );
  } else {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
      locale = cookieLocale;
    } else {
      const acceptLanguage = request.headers.get('accept-language') ?? '';
      locale =
        locales.find((l) => acceptLanguage.startsWith(l)) || defaultLocale;
    }
  }

  requestHeaders.set('X-Locale', locale);

  if (subdomain) {
    requestHeaders.set('x-pathname', pathname);
    const normalizedPathname =
      pathname === '/' ? '' : pathname.replace(/\/$/, '');

    const newUrl = new URL(
      `/s/${subdomain}${normalizedPathname}${search}`,
      request.url,
    );

    return NextResponse.rewrite(newUrl, {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    '/((?!api/tenant-settings|api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.[\\w]{2,}).*)',
  ],
};
