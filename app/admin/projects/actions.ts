'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { z } from 'zod';
import { requireUser } from '@/app/data/user/require-user';

const projectSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().optional(),
});

export async function createProject(data: unknown): Promise<ApiResponse> {
  const session = await requireUser();
  if (!session) {
    return {
      status: 'error',
      message: 'Not authenticated',
    };
  }

  const hasPermission =
    session.user.role === 'admin' || session.user.role === 'instructor';

  if (!hasPermission) {
    return {
      status: 'error',
      message: 'You do not have permission to create projects.',
    };
  }

  const result = projectSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 'error',
      message: 'Invalid data provided.',
    };
  }

  try {
    const project = await prisma.project.create({
      data: {
        name: result.data.name,
        description: result.data.description,
      },
    });

    return {
      status: 'success',
      message: 'Project created successfully',
      data: project,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 'error',
      message: 'Failed to create project.',
    };
  }
}

export async function getProjects() {
  const session = await requireUser();
  if (!session) {
    return [];
  }

  const hasPermission =
    session.user.role === 'admin' || session.user.role === 'instructor';

  if (!hasPermission) {
    return [];
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return projects;
  } catch (error) {
    console.log(error);

    return [];
  }
}
