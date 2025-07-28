'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { checkPlanStatus } from '@/lib/subscription';
import { ApiResponse } from '@/lib/types';
import { courseSchema, CourseSchemaType } from '@/lib/zodSchemas';

export async function CreateCourse(
  values: CourseSchemaType,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();

  const plan = await checkPlanStatus();
  const courseCount = await prisma.course.count({
    where: { userId: user.id },
  });

  const canCreateCourse = plan.planName === 'PRO' || courseCount < 1;

  if (!canCreateCourse) {
    return {
      status: 'error',
      message:
        'You have reached your plan limit. Please upgrade to Pro to create more courses.',
    };
  }
  try {
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return { status: 'error', message: 'Invalid Form Data' };
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
        userId: user.id as string,
        stripePriceId: data.default_price as string,
        tenantId: user.tenantId,
      },
    });

    return { status: 'success', message: 'Course created succesfully' };
  } catch (e) {
    console.log(e);
    return { status: 'error', message: 'Failed to create course' };
  }
}
