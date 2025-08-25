'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma';
import { getTranslations } from 'next-intl/server';

const slugSchema = z.object({
  slug: z
    .string()
    .min(3, 'URL must be at least 3 characters long')
    .regex(
      /^[a-z0-9-]+$/,
      'URL can only contain lowercase letters, numbers, and hyphens',
    ),
});

const tenantAndAdminSchema = z.object({
  platformName: z
    .string()
    .min(3, 'platform name must be at least 3 characters long'),
  slug: z
    .string()
    .min(3, 'URL must be at least 3 characters long')
    .regex(
      /^[a-z0-9-]+$/,
      'URL can only contain lowercase letters, numbers, and hyphens',
    ),
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  language: z.enum(['en', 'ar']),
});

export async function checkSlugAvailability(
  slug: string,
): Promise<{ available: boolean; message?: string }> {
  const t = await getTranslations('SahlaPlatform.StartPage');

  const validation = slugSchema.safeParse({ slug });
  if (!validation.success) {
    return { available: false, message: validation.error.message };
  }

  const existingTenant = await prisma.tenants.findUnique({
    where: { slug: validation.data.slug },
  });

  if (existingTenant) {
    return {
      available: false,
      message: t('serverMessages.slugTaken'),
    };
  }

  return { available: true };
}

export async function createTenantAndAdmin(
  values: z.infer<typeof tenantAndAdminSchema>,
): Promise<ApiResponse & { slug?: string }> {
  const t = await getTranslations('SahlaPlatform.StartPage');
  const validation = tenantAndAdminSchema.safeParse(values);
  if (!validation.success) {
    return { status: 'error', message: validation.error.message };
  }

  const { platformName, slug, name, email, password, language } =
    validation.data;

  try {
    const newTenantId = uuidv4();

    await prisma.$transaction(
      async (tx) => {
        const existingTenant = await tx.tenants.findUnique({ where: { slug } });
        if (existingTenant) {
          throw new Error(t('serverMessages.slugTaken'));
        }

        const { user: newAdmin } = await auth().api.signUpEmail({
          body: {
            name,
            email,
            password,
          },
        });

        if (!newAdmin) {
          throw new Error('Failed to create the admin user account.');
        }

        await tx.tenants.create({
          data: {
            tenantId: newTenantId,
            name: platformName,
            slug,
            logo: ``,
            userId: newAdmin.id,
            data: {},
            defaultLanguage: language,
          },
        });

        await tx.user.update({
          where: { id: newAdmin.id },
          data: {
            role: 'admin',
            tenantId: newTenantId,
          },
        });

        await tx.account.updateMany({
          where: { userId: newAdmin.id },
          data: { tenantId: newTenantId },
        });
      },
      {
        timeout: 15000,
      },
    );

    return {
      status: 'success',
      message: t('serverMessages.creationSuccess'),
      slug: slug,
    };
  } catch (error) {
    let errorMessage = t('serverMessages.creationError');
    if (error instanceof Error) {
      if (error.message.includes('taken')) {
        errorMessage = t('serverMessages.slugTaken');
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        errorMessage = t('serverMessages.emailExists');
      } else {
        errorMessage = error.message;
      }
    }
    console.error('Failed to create tenant and admin:', error);
    return {
      status: 'error',
      message: errorMessage,
    };
  }
}