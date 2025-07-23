'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { z } from 'zod';
import { requireUser } from '@/app/data/user/require-user';
import { revalidatePath } from 'next/cache';

const projectSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().optional(),
});

async function checkProjectPermissions() {
  const session = await requireUser();
  if (!session) {
    throw new Error('Not authenticated');
  }

  const isSiteAdmin = session.user.role === 'admin';
  const isInstructor = session.user.role === 'instructor';

  if (!isSiteAdmin && !isInstructor) {
    throw new Error('You do not have permission to perform this action.');
  }
}

export async function updateProject(
  projectId: string,
  data: unknown,
): Promise<ApiResponse> {
  try {
    await checkProjectPermissions();

    const result = projectSchema.safeParse(data);
    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid data provided.',
      };
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        name: result.data.name,
        description: result.data.description,
      },
    });

    revalidatePath('/admin/projects');
    return {
      status: 'success',
      message: 'Project updated successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to update project.',
    };
  }
}

export async function deleteProject(projectId: string): Promise<ApiResponse> {
  try {
    await checkProjectPermissions();

    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath('/admin/projects');
    return {
      status: 'success',
      message: 'Project deleted successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to delete project.',
    };
  }
}
