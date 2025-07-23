'use server';

import { courseSchema, CourseSchemaType } from '@/lib/zodSchemas';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/app/data/user/require-user';
import { Course } from '@/lib/generated/prisma';

export async function createCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  const session = await requireUser();
  if (!session) {
    return {
      status: 'error',
      message: 'Not authenticated',
    };
  }

  const isSiteAdmin = session.user.role === 'admin';
  const isInstructor = session.user.role === 'instructor';

  if (!isSiteAdmin && !isInstructor) {
    return {
      status: 'error',
      message: 'You do not have permission to create a course.',
    };
  }

  try {
    const validation = courseSchema.safeParse(data);
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form Data',
      };
    }
    const { fileKey, projectId, ...restOfData } = validation.data;

    const result = await prisma.$transaction(async (tx) => {
      const product = await stripe.products.create({
        name: validation.data.title,
        description: validation.data.smallDescription,
        default_price_data: {
          currency: 'usd',
          unit_amount: validation.data.price * 100,
        },
      });

      const courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> & {
        instructors?: { connect: { id: string } };
      } = {
        ...restOfData,
        projectId: projectId!,
        fileKey: fileKey
          ? fileKey
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
        userId: session.user.id,
        stripePriceId: product.default_price as string,
      };

      if (isInstructor) {
        courseData.instructors = {
          connect: { id: session.user.id },
        };
      }

      const newCourse = await tx.course.create({
        data: courseData,
      });

      return newCourse;
    });

    revalidatePath('/admin/courses');
    return {
      status: 'success',
      message: 'Course created successfully',
      data: result,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 'error',
      message: 'Something went wrong',
    };
  }
}
