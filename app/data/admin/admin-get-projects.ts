'use server';

import { prisma } from '@/lib/db';
import { requireUser } from '../user/require-user';

/**
 * Fetches all projects from the database.
 * This action is restricted to users with 'admin' or 'instructor' roles.
 * @returns A promise that resolves to an array of projects.
 */
export async function getProjectsForAdmin() {
  const session = await requireUser();

  const isSiteAdmin = session?.user.role === 'admin';
  const isInstructor = session?.user.role === 'instructor';

  if (!isSiteAdmin && !isInstructor) {
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
    console.error('Failed to get projects:', error);
    return [];
  }
}
