'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { z } from 'zod';
import { requireUser } from '@/app/data/user/require-user';
import { revalidatePath } from 'next/cache';
import { checkCoursePermission } from '@/app/data/course/permission-check';

const instructorSchema = z.object({
  courseId: z.string().uuid(),
  userId: z.string().uuid(),
});

const assistantSchema = z.object({
  courseId: z.string().uuid(),
  assistantId: z.string().uuid(),
  permissions: z.record(z.string(), z.array(z.string())),
});

export async function addInstructor(data: unknown): Promise<ApiResponse> {
  try {
    const result = instructorSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data provided.' };
    }
    const { courseId, userId } = result.data;

    await checkCoursePermission(courseId, 'course', 'assign_instructor');

    await prisma.course.update({
      where: { id: courseId },
      data: { instructors: { connect: { id: userId } } },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { status: 'success', message: 'Instructor added successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to add instructor.',
    };
  }
}

export async function removeInstructor(data: unknown): Promise<ApiResponse> {
  try {
    const result = instructorSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data provided.' };
    }
    const { courseId, userId } = result.data;

    await checkCoursePermission(courseId, 'course', 'assign_instructor');

    await prisma.course.update({
      where: { id: courseId },
      data: { instructors: { disconnect: { id: userId } } },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { status: 'success', message: 'Instructor removed successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to remove instructor.',
    };
  }
}

export async function getInstructors(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { instructors: true },
    });
    return course?.instructors || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addAssistant(data: unknown): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    const result = assistantSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data provided.' };
    }
    const { courseId, assistantId, permissions } = result.data;

    await checkCoursePermission(courseId, 'course', 'assign_assistant');

    await prisma.courseAssistant.create({
      data: {
        courseId,
        assistantId,
        permissions,
        assignedById: session?.user.id as string,
      },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { status: 'success', message: 'Assistant added successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to add assistant.',
    };
  }
}

export async function removeAssistant(
  assistantInstanceId: string,
  courseId: string,
): Promise<ApiResponse> {
  await requireUser();

  try {
    await checkCoursePermission(courseId, 'course', 'assign_assistant');

    await prisma.courseAssistant.delete({
      where: { id: assistantInstanceId },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { status: 'success', message: 'Assistant removed successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to remove assistant.',
    };
  }
}

export async function getAssistants(courseId: string) {
  try {
    const assistants = await prisma.courseAssistant.findMany({
      where: { courseId },
      include: { assistant: true },
    });
    return assistants;
  } catch (error) {
    console.log(error);
    return [];
  }
}
