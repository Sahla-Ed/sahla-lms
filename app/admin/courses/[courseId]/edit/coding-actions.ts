'use server';

import { requireAdmin } from '@/app/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';

export async function createCodingExercise(
  lessonId: string,
  data: {
    language: string;
    starterCode: string;
    testCases?: string;
    solutionCode?: string;
    instructions?: string;
    timeLimit?: number;
  },
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    // Create coding exercise linked to lesson
    await prisma.codingExercise.create({
      data: {
        lessonId,
        language: data.language,
        starterCode: data.starterCode,
        testCases: data.testCases ? JSON.parse(data.testCases) : undefined,
        solutionCode: data.solutionCode,
        instructions: data.instructions,
        timeLimit: data.timeLimit,
      },
    });

    return {
      status: 'success',
      message: 'Coding exercise created',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Failed to create coding exercise',
    };
  }
}

export async function updateCodingExercise(
  exerciseId: string,
  data: {
    language?: string;
    starterCode?: string;
    testCases?: string;
    solutionCode?: string;
    instructions?: string;
    timeLimit?: number;
  },
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    await prisma.codingExercise.update({
      where: { id: exerciseId },
      data: {
        language: data.language,
        starterCode: data.starterCode,
        testCases: data.testCases ? JSON.parse(data.testCases) : undefined,
        solutionCode: data.solutionCode,
        instructions: data.instructions,
        timeLimit: data.timeLimit,
      },
    });

    return {
      status: 'success',
      message: 'Coding exercise updated',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Failed to update coding exercise',
    };
  }
}

export async function deleteCodingExercise(
  exerciseId: string,
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    await prisma.codingExercise.delete({
      where: { id: exerciseId },
    });

    return {
      status: 'success',
      message: 'Coding exercise deleted',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Failed to delete coding exercise',
    };
  }
}

// export async function createCodingSubmission(
//   exerciseId: string,
//   userId: string,
//   code: string,
// ): Promise<ApiResponse> {
//   await requireAdmin();
//   try {
//     const submission = await prisma.codingSubmission.create({
//       data: {
//         exerciseId,
//         userId,
//         code,
//       },
//     });

//     return {
//       status: 'success',
//       message: 'Coding submission created',
//       data: submission,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 'error',
//       message: 'Failed to create coding submission',
//     };
//   }
// }

// export async function updateCodingSubmission(
//   submissionId: string,
//   code: string,
// ): Promise<ApiResponse> {
//   await requireAdmin();
//   try {
//     const submission = await prisma.codingSubmission.update({
//       where: { id: submissionId },
//       data: { code },
//     });

//     return {
//       status: 'success',
//       message: 'Coding submission updated',
//       data: submission,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 'error',
//       message: 'Failed to update coding submission',
//     };
//   }
// }

// export async function deleteCodingSubmission(
//   submissionId: string,
// ): Promise<ApiResponse> {
//   await requireAdmin();
//   try {
//     await prisma.codingSubmission.delete({
//       where: { id: submissionId },
//     });

//     return {
//       status: 'success',
//       message: 'Coding submission deleted',
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 'error',
//       message: 'Failed to delete coding submission',
//     };
//   }
// }
