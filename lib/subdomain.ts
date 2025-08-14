import { type NextRequest } from 'next/server';
import { rootDomain } from './utils';

export function getSubdomain(
  request?: NextRequest,
  host?: string,
): string | null {
  if (!host) {
    if (!request) return null;
    host = request.headers.get('host') || '';
  }
  const hostname = host.split(':')[0]; // Strip port

  // Local development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0]; // sub.localhost -> sub
    }
    return null;
  }

  // Vercel preview URLs
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  const rootDomainFormatted = rootDomain.split(':')[0];

  // General subdomain check
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}
