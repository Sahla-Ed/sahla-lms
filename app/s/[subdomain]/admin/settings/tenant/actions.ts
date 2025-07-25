'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';

const settingsSchema = z.object({
  name: z.string().min(3, 'platform name is required'),
  slug: z.string().min(3, 'URL slug is required'),
  logo: z.string().optional(),
  logoDark: z.string().optional(),
});

type UpdateResponse = ApiResponse & {
  newSlug?: string;
  transferToken?: string;
};

export async function updateTenantSettings(
  values: z.infer<typeof settingsSchema>,
): Promise<UpdateResponse> {
  const { session, user } = await requireAdmin();

  const validation = settingsSchema.safeParse(values);
  if (!validation.success) {
    return { status: 'error', message: validation.error.message };
  }
  if (user.role !== 'admin') {
    return { status: 'error', message: 'admin only action' };
  }

  const { slug: newSlug, ...dataToUpdate } = validation.data;
  let slugHasChanged = false;

  try {
    const currentTenant = await prisma.tenants.findUnique({
      //@ts-ignore
      where: { tenantId: session.tenantId },
      select: { slug: true },
    });

    if (!currentTenant) {
      return { status: 'error', message: 'Tenant not found.' };
    }

    if (currentTenant.slug !== newSlug) {
      const existingTenant = await prisma.tenants.findUnique({
        where: { slug: newSlug },
      });
      if (existingTenant) {
        return {
          status: 'error',
          message: 'This platform URL is already taken.',
        };
      }
      slugHasChanged = true;
    }

    await prisma.tenants.update({
      //@ts-ignore
      where: { tenantId: session.tenantId },
      data: {
        ...dataToUpdate,
        slug: newSlug,
      },
    });
    //TODO:solve the flash issue caused by invalid current subdomain
    revalidatePath('/admin/settings/tenant');

    if (slugHasChanged) {
      return {
        status: 'success',
        message: 'Settings updated successfully! Redirecting...',
        newSlug: newSlug,
        transferToken: session.token,
      };
    }

    return { status: 'success', message: 'Settings updated successfully!' };
  } catch (error) {
    console.error('Failed to update tenant settings:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
