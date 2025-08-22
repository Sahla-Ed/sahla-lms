'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '../../data/admin/require-admin';
import { ApiResponse } from '@/lib/types';

export async function markMessageAsRead(messageId: string): Promise<ApiResponse> {
  try {
    const { user } = await requireAdmin();

    await prisma.contactMessage.update({
      where: {
        id: messageId,
        tenantId: user.tenantId, // Ensure admin can only update messages in their own tenant
      },
      data: {
        isRead: true,
      },
    });

    revalidatePath('/admin/messages');
    return { status: 'success', message: 'Message marked as read.' };
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return { status: 'error', message: 'Failed to update message.' };
  }
}
