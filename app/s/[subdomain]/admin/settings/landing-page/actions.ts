'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { Data } from '@measured/puck';
import { revalidatePath } from 'next/cache';

export async function saveLandingPageData(data: Data): Promise<ApiResponse> {
  const { user } = await requireAdmin();

  try {
    await prisma.tenants.update({
      where: { tenantId: user.tenantId as string },
      data: {
        landingPageData: data,
      },
    });

    revalidatePath(`/`);
    return { status: 'success', message: 'Data saved successfully!' };
  } catch (error) {
    console.error('Failed to save landing page data:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred.',
    };
  }
}
