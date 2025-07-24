import { headers } from 'next/headers';
import { rootDomain } from './utils';
import { getTenantIdFromSlug } from './get-tenant-id';

export async function extractSubdomain(
  request?: Request,
  host?: string,
): Promise<string | null> {
  if (!host) {
    request ?? Object.fromEntries(await headers());
    host = request?.headers.get('host') || '';
  }
  const hostname = host.split(':')[0];

  // Local development environment
  if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = host.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  const rootDomainFormatted = rootDomain.split(':')[0];

  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}
