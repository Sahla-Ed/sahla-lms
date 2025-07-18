"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  questionSchema,
  QuestionSchemaType,
  quizQuestionSchema,
  QuizQuestionSchemaType,
} from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

export async function createQuestion(
  data: QuestionSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const result = questionSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.question.create({
      data: {
        courseId: result.data.courseId,
        text: result.data.text,
        type: result.data.type,
        options: result.data.options || [],
        answer: result.data.answer,
        explanation: result.data.explanation,
      },
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Question created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create question",
    };
  }
}

export async function updateQuestion(
  questionId: string,
  data: QuestionSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const result = questionSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.question.update({
      where: { id: questionId },
      data: {
        text: result.data.text,
        type: result.data.type,
        options: result.data.options || [],
        answer: result.data.answer,
        explanation: result.data.explanation,
      },
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Question updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update question",
    };
  }
}

export async function deleteQuestion(
  questionId: string,
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    await prisma.question.delete({
      where: { id: questionId },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Question deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete question",
    };
  }
}

export async function updateQuizQuestions(
  data: QuizQuestionSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const result = quizQuestionSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    // Update timer if provided
    if (typeof result.data.timer === "number" || result.data.timer === null) {
      await prisma.lesson.update({
        where: { id: result.data.lessonId },
        data: { timer: result.data.timer },
      });
    }

    // Delete existing question associations
    await prisma.lessonQuestion.deleteMany({
      where: { lessonId: result.data.lessonId },
    });

    // Create new question associations
    if (result.data.questionIds.length > 0) {
      await prisma.lessonQuestion.createMany({
        data: result.data.questionIds.map((questionId, index) => ({
          lessonId: result.data.lessonId,
          questionId,
          position: index + 1,
        })),
      });
    }

    return {
      status: "success",
      message: "Quiz questions updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update quiz questions",
    };
  }
}

export async function getCourseQuestions(courseId: string) {
  await requireAdmin();

  const questions = await prisma.question.findMany({
    where: { courseId },
    orderBy: { createdAt: "desc" },
  });

  return questions;
}
