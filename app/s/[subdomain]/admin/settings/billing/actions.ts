'use server';

import { auth } from '@/lib/auth';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { extractSubdomain } from '@/lib/subdomain';
import { protocol } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';

export async function createCheckoutSession(planName: string, annual: boolean) {
  const host = Object.fromEntries(await headers()).host;
  const subdomain = await extractSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);
  const { user } = await requireAdmin();

  const baseUrl = `${protocol}://${host}`;
  const successUrl = `${baseUrl}/admin/settings/billing?success=true`;
  const cancelUrl = `${baseUrl}/admin/settings/billing`;

  const res = await authClient.subscription.upgrade({
    plan: planName,
    annual,
    referenceId: user.id,
    successUrl,
    cancelUrl,
  });
  console.log(JSON.stringify(res, null, 2));
  if (res.data?.url) {
    redirect(res.data?.url);
  }

  // if (url) {
  //   redirect(url);
  // }
}

export async function createBillingPortalSession() {
  const host = Object.fromEntries(await headers()).host;
  const subdomain = await extractSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);
  const { user } = await requireAdmin();

  const baseUrl = `${protocol}://${host}`;
  const returnUrl = `${baseUrl}/admin/settings/billing`;

  const res = await authClient.subscription.cancel({
    referenceId: user.id,
    returnUrl,
  });
  console.log(JSON.stringify(res, null, 2));
  if (res.data?.url) {
    redirect(res.data?.url);
  }
}
