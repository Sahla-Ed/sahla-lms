import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { getSubdomain } from './lib/subdomain';

export default getRequestConfig(async () => {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('X-Locale') || 'ar';

  const host = requestHeaders.get('host') || '';
  const subdomain = getSubdomain(undefined, host);

  const messageFileName = subdomain
    ? `tenant-${locale}.json`
    : `sahla-${locale}.json`;

  console.log(
    `[i18n] Loading messages for locale "${locale}" from "${messageFileName}"`,
  );

  try {
    const messages = (await import(`./messages/${messageFileName}`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(
      `[i18n] Could not load messages from ${messageFileName}. Falling back to default.`,
    );
    // Fallback to a default message file if the specific one doesn't exist
    return {
      locale,
      messages: (await import(`./messages/sahla-ar.json`)).default,
    };
  }
});

// Export a static version for ISR pages
export async function getStaticMessages(locale: string, subdomain?: string) {
  const messageFileName = subdomain
    ? `tenant-${locale}.json`
    : `sahla-${locale}.json`;

  try {
    const messages = (await import(`./messages/${messageFileName}`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(
      `[i18n] Could not load messages from ${messageFileName}. Falling back to default.`,
    );
    return {
      locale,
      messages: (await import(`./messages/sahla-ar.json`)).default,
    };
  }
}
