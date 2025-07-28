'use server';

import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';
import { ApiResponse } from '@/lib/types';
import { protocol } from '@/lib/utils';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse | never> {
  // 1. Authenticate the user and get their session.
  const sessionUser = await requireUser();
  if (!sessionUser) {
    // This will redirect to login if the user is not authenticated.
    return { status: 'error', message: 'Unauthorized' };
  }

  // 2. Construct a complete base URL for Stripe redirects.
  const baseUrl = env.VERCEL_BRANCH_URL
    ? `https://${env.VERCEL_BRANCH_URL}`
    : `${protocol}://localhost:3000`;

  let checkoutUrl: string | null = null;

  try {
    // 3. Fetch the full user record from the database to get the stripeCustomerId.
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      throw new Error('Authenticated user not found in database.');
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true, slug: true },
    });

    if (!course || course.price === null) {
      return { status: 'error', message: 'Course not found or has no price.' };
    }
    if (course.price === 0) {
      return {
        status: 'error',
        message: 'This course is free and cannot be purchased.',
      };
    }

    // 4. Find or create a Stripe Customer for the user.
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    // 5. Use a database transaction to create the pending enrollment and Stripe session.
    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: courseId } },
        select: { status: true, id: true },
      });

      if (existingEnrollment?.status === 'Active') {
        redirect(`/courses/${course.slug}`);
        return { checkoutUrl: null };
      }

      const priceInCents = Math.round(course.price * 100);
      let enrollment;

      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: { id: existingEnrollment.id },
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
            tenantId: sessionUser.tenantId, // Ensure tenantId is set
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
        success_url: `${baseUrl}/payment/success`,
        cancel_url: `${baseUrl}/courses/${course.slug}`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
        },
      });

      if (!checkoutSession.url) {
        throw new Error('Could not create Stripe Checkout session.');
      }

      return { checkoutUrl: checkoutSession.url };
    });

    if (result.checkoutUrl) {
      checkoutUrl = result.checkoutUrl;
    } else {
      return { status: 'success', message: 'User already enrolled.' };
    }
  } catch (error) {
    console.error('Enrollment Action Error:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return {
        status: 'error',
        message: error.message || 'A payment system error occurred.',
      };
    }
    return {
      status: 'error',
      message: 'Failed to enroll in course. Please try again.',
    };
  }

  redirect(checkoutUrl);
}
