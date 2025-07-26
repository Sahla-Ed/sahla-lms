import 'server-only';

import { prisma } from '@/lib/db';
// import { requireAdmin } from './require-admin';
import { notFound } from 'next/navigation';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { extractSubdomain } from '@/lib/subdomain';
import { headers } from 'next/headers';

export async function getTenantSettings() {
  const host = Object.fromEntries(await headers()).host;
  const subdomain = await extractSubdomain(undefined, host);
  const tenantId = (await getTenantIdFromSlug(subdomain)) ?? '';
  //TODO: research if we should protect this
  // const { session } = await requireAdmin();

  const tenant = await prisma.tenants.findUnique({
    where: {
      tenantId: tenantId,
    },
    select: {
      name: true,
      slug: true,
      logo: true,
      logoDark: true,
      theme: true,
      data: true,
      landingPageData: true,
    },
  });

  if (!tenant) {
    notFound();
  }

  return tenant;
}
