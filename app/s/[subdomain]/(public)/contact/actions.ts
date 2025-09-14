'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { getSubdomain } from '@/lib/subdomain';
import { headers } from 'next/headers';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'A valid phone number is required'),
  role: z.string().min(1, 'Please select a role'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export async function submitContactForm(
  values: z.infer<typeof contactFormSchema>,
): Promise<ApiResponse> {
  const validation = contactFormSchema.safeParse(values);
  if (!validation.success) {
    return { status: 'error', message: 'Invalid form data.' };
  }

  const host = Object.fromEntries(await headers()).host;
  const subdomain = await getSubdomain(undefined, host);
  const tenantId = await getTenantIdFromSlug(subdomain);

  if (!tenantId) {
    return { status: 'error', message: 'Could not identify the platform.' };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        ...validation.data,
        tenantId: tenantId,
      },
    });

    return {
      status: 'success',
      message: "We've received your message and will be in touch soon!",
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
