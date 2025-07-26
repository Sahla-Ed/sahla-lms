import { prisma } from '@/lib/db';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { extractSubdomain } from '@/lib/subdomain';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const host = Object.fromEntries(await headers()).host;
    const subdomain = await extractSubdomain(undefined, host);
    const tenantId = (await getTenantIdFromSlug(subdomain)) ?? '';
    const data = await prisma.tenants.findFirst({
      where: {
        tenantId: tenantId,
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to get config for this tenant' },
      { status: 500 },
    );
  }
}

// export type  = Awaited<ReturnType<typeof getTenantConfig>>;
