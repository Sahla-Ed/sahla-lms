'use server';

import 'server-only';
import { prisma } from '@/lib/db';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export type CourseForModeration = Awaited<
  ReturnType<typeof getCourseForModeration>
>;

export type CourseCommentsForModeration = Awaited<
  ReturnType<typeof getCourseCommentsForModeration>
>;

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
  revalidatePath(`/admin/courses/.*`, 'layout');
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
  revalidatePath(`/admin/courses/.*`, 'layout');
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
  revalidatePath(`/admin/courses/.*`, 'layout');
}

export const getCourseCommentsForModeration = cache(
  async (courseId: string) => {
    const lessonsWithComments = await prisma.lesson.findMany({
      where: {
        Chapter: {
          courseId: courseId,
        },
        comments: {
          some: {},
        },
      },
      select: {
        id: true,
        title: true,
        comments: {
          where: {
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
        },
      },
    });

    return lessonsWithComments;
  },
);

export const getCourseForModeration = cache(async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      chapter: {
        orderBy: { position: 'asc' },
        select: {
          id: true,
          title: true,
          lessons: {
            orderBy: { position: 'asc' },
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return course;
});
