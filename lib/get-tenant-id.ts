import 'server-only';
import { cache } from 'react';
import { prisma } from './db';

export const getTenantIdFromSlug = cache(
  async (slug: string | null): Promise<string | null> => {
    if (!slug) {
      return null;
    }

    const tenant = await prisma.tenants.findUnique({
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
