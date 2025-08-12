import { NextRequest, NextResponse } from 'next/server';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { getSubdomain } from '@/lib/subdomain';
import { protocol } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  const subdomain = getSubdomain(request);
  const tenantId = await getTenantIdFromSlug(subdomain);
  const newHost = ` ${protocol}://${request.headers.get('host')}`;
  console.log(newHost);
  const loginUrl = new URL('/auth/sign-in', newHost);
  if (!token || !tenantId) {
    loginUrl.searchParams.set('error', 'Invalid transfer request.');
    return NextResponse.redirect(loginUrl);
  }
  try {
    const response = NextResponse.redirect(
      new URL('/admin/settings/tenant', newHost),
    );
    response.headers.append('Set-Cookie', token);
    return response;
  } catch (error) {
    console.error('Session transfer error:', error);
    loginUrl.searchParams.set('error', 'Could not complete session transfer.');
    return NextResponse.redirect(loginUrl);
  }
}
