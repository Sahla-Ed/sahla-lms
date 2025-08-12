'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { checkPlanStatus } from '@/lib/subscription';
import { ApiResponse } from '@/lib/types';
import { courseSchema, CourseSchemaType } from '@/lib/zodSchemas';
import { Prisma } from '@/lib/generated/prisma';

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

    const existingCourse = await prisma.course.findUnique({
      where: { slug: validation.data.slug },
    });

    if (existingCourse) {
      return {
        status: 'error',
        message:
          'A course with this slug already exists. Please choose a unique slug.',
      };
    }

    const { fileKey, ...restOfData } = validation.data;
    const stripeProduct = await stripe.products.create({
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
          : 'https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg',
        userId: user.id as string,
        stripePriceId: stripeProduct.default_price as string,
        tenantId: user.tenantId,
      },
    });

    return { status: 'success', message: 'Course created successfully!' };
  } catch (e) {
    console.error('Error creating course:', e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          status: 'error',
          message:
            'A course with this slug already exists. Please choose a different one.',
        };
      }
    }

    if (
      e instanceof Error &&
      'type' in e &&
      e.type === 'StripeInvalidRequestError'
    ) {
      return { status: 'error', message: `Stripe error: ${e.message}` };
    }

    return {
      status: 'error',
      message: 'An unexpected error occurred on the server.',
    };
  }
}
