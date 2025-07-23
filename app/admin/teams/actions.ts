'use server';

import { auth } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { headers } from 'next/headers';

const teamSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
});

export async function createTeam(data: unknown): Promise<ApiResponse> {
  const result = teamSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 'error',
      message: 'Invalid data provided.',
    };
  }

  try {
    const team = await auth.api.createOrganization({
      body: {
        name: result.data.name,
        slug: result.data.slug,
      },
      headers: await headers(),
    });

    revalidatePath('/admin/teams');

    return {
      status: 'success',
      message: 'Team created successfully',
      data: team,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Failed to create team.',
    };
  }
}

export async function getTeams() {
  try {
    const teams = await auth.api.listOrganizations({
      headers: await headers(),
    });
    return teams;
  } catch (error) {
    console.error(error);
    return [];
  }
}
