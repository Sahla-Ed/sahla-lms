'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';

import { prisma } from '@/lib/db';

import { ApiResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  const { user } = await requireAdmin();

  try {
    await prisma.course.delete({
      where: {
        id: courseId,
        tenantId: user.tenantId,
      },
    });

    revalidatePath('/admin/courses');

    return {
      status: 'success',
      message: 'Course deleted successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'Failed to delete Course!',
    };
  }
}
