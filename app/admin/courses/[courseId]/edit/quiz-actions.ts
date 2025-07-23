// ./app/admin/courses/[courseId]/edit/quiz-actions.ts
'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  questionSchema,
  QuestionSchemaType,
  quizQuestionSchema,
  QuizQuestionSchemaType,
} from '@/lib/zodSchemas';
import { revalidatePath } from 'next/cache';
import { checkCoursePermission } from '@/app/data/course/permission-check';
import { requireUser } from '@/app/data/user/require-user';

export async function createQuestion(
  data: QuestionSchemaType,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(data.courseId, 'quiz', 'create');
    const result = questionSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data' };
    }
    await prisma.question.create({ data: result.data });
    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    return { status: 'success', message: 'Question created successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to create question',
    };
  }
}

export async function updateQuestion(
  questionId: string,
  data: QuestionSchemaType,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(data.courseId, 'quiz', 'update');
    const result = questionSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data' };
    }
    await prisma.question.update({
      where: { id: questionId },
      data: {
        text: result.data.text,
        type: result.data.type,
        options: result.data.options,
        answer: result.data.answer,
        explanation: result.data.explanation,
      },
    });
    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    return { status: 'success', message: 'Question updated successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to update question',
    };
  }
}

export async function deleteQuestion(
  questionId: string,
  courseId: string,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(courseId, 'quiz', 'delete');
    await prisma.question.delete({ where: { id: questionId } });
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { status: 'success', message: 'Question deleted successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to delete question',
    };
  }
}

export async function updateQuizQuestions(
  data: QuizQuestionSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(courseId, 'quiz', 'update');
    const result = quizQuestionSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data' };
    }

    await prisma.$transaction(async (tx) => {
      if (typeof result.data.timer === 'number' || result.data.timer === null) {
        await tx.lesson.update({
          where: { id: result.data.lessonId },
          data: { timer: result.data.timer },
        });
      }

      await tx.lessonQuestion.deleteMany({
        where: { lessonId: result.data.lessonId },
      });

      if (result.data.questionIds.length > 0) {
        await tx.lessonQuestion.createMany({
          data: result.data.questionIds.map((questionId, index) => ({
            lessonId: result.data.lessonId,
            questionId,
            position: index + 1,
          })),
        });
      }
    });

    return {
      status: 'success',
      message: 'Quiz questions updated successfully',
    };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to update quiz questions',
    };
  }
}

export async function getCourseQuestions(courseId: string) {
  await requireUser();

  const questions = await prisma.question.findMany({
    where: { courseId },
    orderBy: { createdAt: 'desc' },
  });

  return questions;
}
