import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const signature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata?.upgrade === 'pro' && metadata.userId) {
      console.log(`Webhook received: Pro Upgrade for user ${metadata.userId}`);
      try {
        await prisma.tenants.updateMany({
          where: { userId: metadata.userId },
          data: { plan: 'PRO' },
        });
        console.log(
          `Successfully upgraded tenant for user ${metadata.userId} to PRO.`,
        );
      } catch (error) {
        console.error(
          `Database error during Pro Upgrade for user ${metadata.userId}:`,
          error,
        );
        return new Response('Webhook handler failed during database update', {
          status: 500,
        });
      }
    } else if (metadata?.courseId && metadata.userId && metadata.enrollmentId) {
      console.log(
        `Webhook received: Course Enrollment for user ${metadata.userId} in course ${metadata.courseId}`,
      );
      try {
        await prisma.enrollment.update({
          where: { id: metadata.enrollmentId },
          data: { status: 'Active' },
        });
        console.log(
          `Successfully activated enrollment ${metadata.enrollmentId}.`,
        );
      } catch (error) {
        console.error(
          `Database error during course enrollment for enrollment ${metadata.enrollmentId}:`,
          error,
        );
        return new Response('Webhook handler failed during database update', {
          status: 500,
        });
      }
    }
  }

  return new Response(null, { status: 200 });
}
