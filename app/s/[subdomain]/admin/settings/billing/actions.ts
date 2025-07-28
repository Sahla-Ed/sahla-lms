'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { protocol } from '@/lib/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const PRO_PLAN_PRICE_ID = 'price_1RpiDnIzJqhYU7tdZK7d43rO';

export async function createProUpgradeCheckoutSession() {
  const { user: sessionUser } = await requireAdmin();
  const host = Object.fromEntries(await headers()).host;

  const baseUrl = `${protocol}://${host}`;
  const successUrl = `${baseUrl}/admin/settings/billing?upgrade=success`;
  const cancelUrl = `${baseUrl}/admin/settings/billing`;

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    throw new Error('User not found in database.');
  }

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

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'payment',
    line_items: [
      {
        price: PRO_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: user.id,
      upgrade: 'pro',
    },
  });

  if (!checkoutSession.url) {
    throw new Error('Could not create Stripe checkout session.');
  }

  redirect(checkoutSession.url);
}
