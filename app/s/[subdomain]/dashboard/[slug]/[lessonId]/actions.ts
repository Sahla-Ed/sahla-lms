'use server';

import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { codeSubmissionSchema, CodeSubmissionType } from '@/lib/zodSchemas';

export async function markLessonComplete(
  lessonId: string,
  slug: string,
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session?.id as string,
          lessonId: lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId: lessonId,
        userId: session?.id as string,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: 'success',
      message: 'Progress updated',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to mark lesson as complete',
    };
  }
}

export async function markLessonIncomplete(
  lessonId: string,
  slug: string,
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session?.id as string,
          lessonId: lessonId,
        },
      },
      update: {
        completed: false,
      },
      create: {
        lessonId: lessonId,
        userId: session?.id as string,
        completed: false,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: 'success',
      message: 'Progress updated (marked as incomplete)',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to mark lesson as incomplete',
    };
  }
}

export async function submitCode(
  submissionData: CodeSubmissionType,
  slug: string,
  executionStatus: string,
): Promise<ApiResponse> {
  try {
    const result = codeSubmissionSchema.safeParse(submissionData);
    const session = await requireUser();

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid submission data',
      };
    }

    // Get user's current attempt number
    const previousAttempts = await prisma.codingSubmission.count({
      where: {
        userId: result.data.userId,
        lessonId: result.data.lessonId,
        tenantId: session?.tenantId ?? '',
      },
    });

    // Create submission
    await prisma.codingSubmission.create({
      data: {
        userId: result.data.userId,
        tenantId: session?.tenantId ?? '',
        lessonId: result.data.lessonId,
        language: result.data.language ?? 'JavaScript',
        submissionType:
          result.data.submissionType === 'Web' ? 'Web' : 'Programming',
        code: result.data.code ?? '',
        htmlCode: result.data.htmlCode ?? '',
        cssCode: result.data.cssCode ?? '',
        jsCode: result.data.jsCode ?? '',
        attemptNumber: previousAttempts + 1,
        status: executionStatus,
        output: null,
        score: 0,
        passed: executionStatus === 'Accepted',
      },
    });

    revalidatePath(`/dashboard/${slug}/${result.data.lessonId}`);

    return {
      status: 'success',
      message: 'Code submitted successfully!',
    };
  } catch (error) {
    console.error('Failed to submit code:', error);
    return {
      status: 'error',
      message: 'Failed to submit code',
    };
  }
}

// Get user's submissions for a lesson
export async function getUserSubmissions(lessonId: string, userId: string) {
  try {
    const session = await requireUser();
    const submissions = await prisma.codingSubmission.findMany({
      where: { lessonId, userId, tenantId: session?.tenantId ?? '' },
      orderBy: { attemptNumber: 'desc' },
      take: 5, // Get last 5 attempts
    });

    //Get lesson details
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, tenantId: session?.tenantId ?? '' },
      select: { lessonProgress: true },
    });

    // check if any of the submissions is passed
    const isPassed = submissions.some((submission) => submission.passed);
    //check if lesson's lessonProgress length is 0, create lesson progress
    if (!lesson?.lessonProgress.length) {
      await prisma.lessonProgress.create({
        data: {
          lessonId,
          userId,
          tenantId: session?.tenantId ?? '',
          completed: isPassed,
        },
      });
    }

    //if lessonProgress[0] not set as completed, set leson as completed
    if (isPassed && !lesson?.lessonProgress[0]?.completed) {
      await prisma.lesson.update({
        where: { id: lessonId, tenantId: session?.tenantId },
        data: {
          lessonProgress: {
            updateMany: {
              where: { userId: userId },
              data: { completed: true },
            },
          },
        },
      });
    } else if (!isPassed && lesson?.lessonProgress[0]?.completed) {
      await prisma.lesson.update({
        where: { id: lessonId, tenantId: session?.tenantId },
        data: {
          lessonProgress: {
            updateMany: {
              where: { userId: userId },
              data: { completed: false },
            },
          },
        },
      });
    }

    return submissions;
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return [];
  }
}

// Get user's latest submission for code initialization
export async function getLatestUserSubmission(
  lessonId: string,
  userId: string,
) {
  try {
    const session = await requireUser();
    const latestSubmission = await prisma.codingSubmission.findFirst({
      where: { lessonId, userId, tenantId: session?.tenantId ?? '' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        language: true,
        submissionType: true,
        code: true,
        htmlCode: true,
        cssCode: true,
        jsCode: true,
        createdAt: true,
        attemptNumber: true,
      },
    });

    return latestSubmission;
  } catch (error) {
    console.error('Failed to fetch latest submission:', error);
    return null;
  }
}
