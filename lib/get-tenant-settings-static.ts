import 'server-only';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';

/**
 * Get tenant settings by slug without using headers
 * This can be used for static generation
 */
export async function getTenantSettingsBySlug(slug: string) {
  const tenantId = (await getTenantIdFromSlug(slug)) ?? '';

  if (!tenantId) {
    notFound();
  }

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
      defaultLanguage: true,
    },
  });

  if (!tenant) {
    notFound();
  }

  return tenant;
}

/**
 * Get all tenant slugs for static generation
 */
export async function getAllTenantSlugs() {
  const tenants = await prisma.tenants.findMany({
    select: {
      slug: true,
    },
  });

  return tenants.map((tenant) => tenant.slug);
}
