'use server';

import { prisma } from '@/lib/db';
import { requireUser } from './require-user';
import { User } from '@/lib/generated/prisma';

/**
 * Fetches all users from the database.
 * This is a Server Action and can be called from Client Components.
 * This action is restricted to users with 'admin' or 'instructor' roles.
 * @returns A promise that resolves to an array of users.
 */
export async function getUsers(): Promise<User[]> {
  const session = await requireUser();

  const isSiteAdmin = session?.user.role === 'admin';
  const isInstructor = session?.user.role === 'instructor';

  if (!isSiteAdmin && !isInstructor) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users;
  } catch (error) {
    console.error('Failed to get users:', error);
    return [];
  }
}
