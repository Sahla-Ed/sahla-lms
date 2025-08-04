'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma';

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
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function checkSlugAvailability(
  slug: string,
): Promise<{ available: boolean; message?: string }> {
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
      message: 'This platform URL is already taken. Please choose another.',
    };
  }

  return { available: true };
}

export async function createTenantAndAdmin(
  values: z.infer<typeof tenantAndAdminSchema>,
): Promise<ApiResponse & { slug?: string }> {
  const validation = tenantAndAdminSchema.safeParse(values);
  if (!validation.success) {
    return { status: 'error', message: validation.error.message };
  }

  const { platformName, slug, name, email, password } = validation.data;

  try {
    const newTenantId = uuidv4();
    console.log('Generated new tenant ID:', newTenantId);

    await prisma.$transaction(
      async (tx) => {
        console.log('Starting transaction for tenant creation.');

        // 1. Re-check slug availability inside transaction to prevent race conditions
        const existingTenant = await tx.tenants.findUnique({ where: { slug } });
        console.log(
          'Checked slug availability. Existing tenant:',
          existingTenant,
        );

        if (existingTenant) {
          console.error('Slug is already taken:', slug);
          throw new Error('This platform URL is already taken.');
        }

        console.log('Slug is available. Proceeding to create admin user.');
        const { user: newAdmin } = await auth(newTenantId).api.signUpEmail({
          body: {
            name,
            email,
            password,
          },
        });

        if (!newAdmin) {
          console.error('Failed to create admin user account.');
          // throw new Error('Failed to create admin user account.');
        }

        console.log('Admin user created successfully. Admin ID:', newAdmin);

        await tx.user.update({
          where: { id: newAdmin.id },
          data: { role: 'admin' },
        });
        console.log('Updated user role to admin for user ID:', newAdmin.id);

        await tx.tenants.create({
          data: {
            tenantId: newTenantId,
            name: platformName,
            slug,
            logo: ``,
            userId: newAdmin.id,
            data: {},
          },
        });
        console.log('Tenant created successfully with slug:', slug);
      },
      {
        timeout: 15000,
      },
    );
    return {
      status: 'success',
      message: 'Your platform and admin account have been created!',
      slug: slug,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error instanceof Error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        errorMessage =
          'An account with this email already exists for this platform.';
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
