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

  // 1. Verify the event is genuinely from Stripe
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

  // 2. Handle the 'checkout.session.completed' event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    console.log('Webhook received metadata:', metadata);

    // A. Check if this was for a Pro Upgrade
    if (metadata?.upgrade === 'pro' && metadata.userId) {
      console.log(`Processing Pro Upgrade for userId: ${metadata.userId}`);
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
    }

    // B. Check if this was for a Course Enrollment
    else if (metadata?.courseId && metadata.userId && metadata.enrollmentId) {
      console.log(
        `Processing Course Enrollment for enrollmentId: ${metadata.enrollmentId}`,
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
    } else {
      console.warn(
        'Webhook received checkout.session.completed with unrecognized metadata:',
        metadata,
      );
    }
  }

  // 3. Acknowledge receipt of the event
  return new Response(null, { status: 200 });
}
