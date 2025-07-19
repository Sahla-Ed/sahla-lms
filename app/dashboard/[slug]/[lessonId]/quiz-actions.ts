"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function submitQuizAttempt(data: {
  lessonId: string;
  answers: Record<string, string>;
  score: number;
  timeElapsed: number;
}): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    // Delete previous attempts and their user answers
    const previousAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: session?.id as string,
        lessonId: data.lessonId,
      },
      select: { id: true },
    });
    if (previousAttempts.length > 0) {
      const attemptIds = previousAttempts.map((a) => a.id);
      await prisma.userAnswer.deleteMany({
        where: { attemptId: { in: attemptIds } },
      });
      await prisma.quizAttempt.deleteMany({
        where: { id: { in: attemptIds } },
      });
    }

    // Create quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session?.id as string,
        lessonId: data.lessonId,
        score: data.score,
        completedAt: new Date(),
        timeElapsed: data.timeElapsed,
      },
    });

    // Create user answers
    const userAnswers = Object.entries(data.answers).map(
      ([questionId, answer]) => ({
        attemptId: attempt.id,
        questionId,
        answer,
        isCorrect: false, // Will be updated below
      })
    );

    // Get correct answers to determine if user answers are correct
    const questions = await prisma.question.findMany({
      where: {
        id: { in: Object.keys(data.answers) },
      },
      select: {
        id: true,
        answer: true,
      },
    });

    // Update isCorrect field for each answer
    const updatedUserAnswers = userAnswers.map((userAnswer) => {
      const question = questions.find((q) => q.id === userAnswer.questionId);
      return {
        ...userAnswer,
        isCorrect: question ? userAnswer.answer === question.answer : false,
      };
    });

    // Create all user answers
    await prisma.userAnswer.createMany({
      data: updatedUserAnswers,
    });

    // Mark lesson as completed
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session?.id as string,
          lessonId: data.lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: session?.id as string,
        lessonId: data.lessonId,
        completed: true,
      },
    });

    // Get course slug for revalidation
    const lesson = await prisma.lesson.findUnique({
      where: { id: data.lessonId },
      select: {
        Chapter: {
          select: {
            Course: {
              select: { slug: true },
            },
          },
        },
      },
    });

    if (lesson?.Chapter?.Course?.slug) {
      revalidatePath(`/dashboard/${lesson.Chapter.Course.slug}`);
    }

    return {
      status: "success",
      message: "Quiz submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return {
      status: "error",
      message: "Failed to submit quiz",
    };
  }
}

export async function getQuizAttempt(lessonId: string) {
  const session = await requireUser();

  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      userId: session?.id as string,
      lessonId,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
    orderBy: {
      completedAt: "desc",
    },
  });

  return attempt;
}
