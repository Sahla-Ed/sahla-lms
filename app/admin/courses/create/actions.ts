'use server';

import { requireAdmin } from '@/app/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { ApiResponse } from '@/lib/types';
import { courseSchema, CourseSchemaType } from '@/lib/zodSchemas';

export async function CreateCourse(
  values: CourseSchemaType,
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form Data',
      };
    }
    const { fileKey, ...restOfData } = validation.data;
    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: 'usd',
        unit_amount: validation.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        ...restOfData,
        fileKey: fileKey
          ? fileKey
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
        userId: session?.user.id as string,
        stripePriceId: data.default_price as string,
      },
    });

    return {
      status: 'success',
      message: 'Course created succesfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create course',
    };
  }
}
