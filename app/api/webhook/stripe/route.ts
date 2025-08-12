import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

// Utility function to get subscription period dates
function getSubscriptionPeriod(subscription: Stripe.Subscription) {
  const firstItem = subscription.items?.data?.[0];
  if (firstItem?.current_period_start && firstItem?.current_period_end) {
    return {
      periodStart: new Date(firstItem.current_period_start * 1000),
      periodEnd: new Date(firstItem.current_period_end * 1000),
    };
  }
  return {
    periodStart: new Date(0), // Fallback to epoch if no valid period
    periodEnd: new Date(0),
  };
}

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

  // --- Main Webhook Logic ---
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;
      const userId = metadata?.userId;

      if (!userId) {
        console.error('Webhook Error: No userId in checkout session metadata');
        return new Response('Webhook Error: Missing userId', { status: 400 });
      }

      if (session.mode === 'subscription') {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
          { expand: ['items.data'] },
        );

        const { periodStart, periodEnd } = getSubscriptionPeriod(subscription);

        await prisma.subscription.create({
          data: {
            id: subscription.id,
            referenceId: userId,
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            plan: 'PRO',
            periodStart,
            periodEnd,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });

        await prisma.tenants.updateMany({
          where: { userId: userId },
          data: { plan: 'PRO' },
        });
        console.log(`Successfully upgraded tenant for user ${userId} to PRO.`);
      } else if (session.mode === 'payment') {
        if (metadata?.courseId && metadata.enrollmentId) {
          console.log(
            `Processing Course Enrollment for enrollmentId: ${metadata.enrollmentId}`,
          );
          await prisma.enrollment.update({
            where: { id: metadata.enrollmentId },
            data: { status: 'Active' },
          });
          console.log(
            `Successfully activated enrollment ${metadata.enrollmentId}.`,
          );
        } else {
          console.warn(
            'Webhook received a one-time payment session without course metadata.',
          );
        }
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      if (!invoice.id) {
        console.error('Webhook Error: Invoice ID is missing');
        return new Response('Webhook Error: Missing invoice ID', {
          status: 400,
        });
      }

      // Expand invoice lines to get detailed line item data
      try {
        const expandedInvoice = await stripe.invoices.retrieve(invoice.id, {
          expand: ['lines.data'],
        });

        // Find the first subscription-related line item
        const subscriptionLine = expandedInvoice.lines.data.find(
          (line) => line.subscription !== null,
        );
        if (subscriptionLine) {
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionLine.subscription as string,
            { expand: ['items.data'] },
          );

          const { periodStart, periodEnd } =
            getSubscriptionPeriod(subscription);

          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: subscription.status,
              periodStart,
              periodEnd,
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
          console.log(`Subscription ${subscription.id} renewed.`);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        console.error(
          `Failed to retrieve invoice or subscription: ${errorMessage}`,
        );
        return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const { periodStart, periodEnd } = getSubscriptionPeriod(subscription);

      const updatedSubscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: subscription.status,
          periodStart,
          periodEnd,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });

      if (
        subscription.status !== 'active' &&
        subscription.status !== 'trialing'
      ) {
        await prisma.tenants.updateMany({
          where: { userId: updatedSubscription.referenceId },
          data: { plan: 'FREE' },
        });
        console.log(
          `Downgraded tenant for user ${updatedSubscription.referenceId} to FREE.`,
        );
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
