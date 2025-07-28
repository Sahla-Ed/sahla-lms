import 'server-only';
import { cache } from 'react';
import prismaUnscoped from './db-unscoped'; // <-- IMPORT THE UNSCOPED CLIENT

export const getTenantIdFromSlug = cache(
  async (slug: string | null): Promise<string | null> => {
    if (!slug) {
      return null;
    }

    // Use the unscoped client for this specific query.
    const tenant = await prismaUnscoped.tenants.findUnique({
      where: {
        slug,
      },
      select: {
        tenantId: true,
      },
    });

    return tenant?.tenantId ?? null;
  },
);
