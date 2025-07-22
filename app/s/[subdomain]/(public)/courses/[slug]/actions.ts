'use server';

import { requireUser } from '@/app/data/user/require-user';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';
import { ApiResponse } from '@/lib/types';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse | never> {
  const user = await requireUser();

  let checkoutUrl: string | null = null;

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });

    if (!course || course.price === null) {
      return {
        status: 'error',
        message: 'Course not found or has no price.',
      };
    }

    if (course.price === 0) {
      return {
        status: 'error',
        message: 'This course is free, use a different enrollment method.',
      };
    }
    if (!user) redirect('/');
    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      if (existingEnrollment?.status === 'Active') {
        redirect(`/courses/${course.slug}`);
        return {
          status: 'success',
          message: 'You are already enrolled in this Course',
        };
      }

      let enrollment;
      const priceInCents = Math.round(course.price * 100);

      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            amount: priceInCents,
            status: 'Pending',
            updatedAt: new Date(),
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            amount: priceInCents,
            status: 'Pending',
          },
        });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: priceInCents,
              product_data: {
                name: course.title,
                description: `Enrollment for ${course.title}`,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${env.VERCEL_BRANCH_URL ? 'https://' + env.VERCEL_BRANCH_URL : 'localhost:3000'}/payment/success`,
        cancel_url: `${env.VERCEL_BRANCH_URL ? 'https://' + env.VERCEL_BRANCH_URL : 'localhost:3000'}/courses/${course.slug}`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
        },
      });

      if (!checkoutSession.url) {
        throw new Error('Could not create Stripe Checkout session.');
      }

      return {
        checkoutUrl: checkoutSession.url,
      };
    });

    if (result.checkoutUrl) {
      checkoutUrl = result.checkoutUrl;
    } else {
      throw new Error(result.message || 'Failed to create checkout session.');
    }
  } catch (error) {
    console.error('Enrollment Action Error:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return {
        status: 'error',
        message:
          error.message || 'Payment system error. Please try again later.',
      };
    }

    return {
      status: 'error',
      message: 'Failed to enroll in course. Please try again.',
    };
  }

  redirect(checkoutUrl);
}
