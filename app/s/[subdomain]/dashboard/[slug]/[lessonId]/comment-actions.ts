'use server';

import 'server-only';
import { prisma } from '@/lib/db';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { revalidatePath } from 'next/cache';

export type CommentWithUserAndReplies = Awaited<
  ReturnType<typeof getComments>
>[0];

export async function getComments(lessonId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      lessonId: lessonId,
      parentId: null,
    },
    include: {
      user: {
        select: { id: true, name: true, image: true, role: true },
      },
      replies: {
        include: {
          user: {
            select: { id: true, name: true, image: true, role: true },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return comments;
}

export async function addComment(
  lessonId: string,
  text: string,
  parentId: string | null = null,
) {
  const user = await requireUser();
  if (!user) {
    throw new Error('You must be logged in to comment.');
  }

  if (!text.trim()) {
    throw new Error('Comment cannot be empty.');
  }

  await prisma.comment.create({
    data: {
      text,
      lessonId,
      userId: user.id,
      parentId,
      tenantId: user.tenantId,
    },
  });

  revalidatePath(`/dashboard/.*`, 'layout');
}

export async function updateComment(commentId: string, newText: string) {
  const user = await requireUser();
  if (!user) throw new Error('Not authenticated');

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  if (!comment) throw new Error('Comment not found');

  const canUpdate = comment.userId === user.id || user.role === 'admin';
  if (!canUpdate) throw new Error('Not authorized to update this comment');

  if (!newText.trim()) throw new Error('Comment cannot be empty.');

  await prisma.comment.update({
    where: { id: commentId },
    data: { text: newText },
  });

  revalidatePath(`/dashboard/.*`, 'layout');
}

export async function deleteComment(commentId: string) {
  const user = await requireUser();
  if (!user) throw new Error('Not authenticated');

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  if (!comment) throw new Error('Comment not found');

  const canDelete = comment.userId === user.id || user.role === 'admin';
  if (!canDelete) throw new Error('Not authorized to delete this comment');

  await prisma.comment.delete({
    where: { id: commentId },
  });

  revalidatePath(`/dashboard/.*`, 'layout');
}
