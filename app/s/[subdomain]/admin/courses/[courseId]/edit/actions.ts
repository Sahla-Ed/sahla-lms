'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
  // codeSubmissionSchema,
  // CodeSubmissionType,
} from '@/lib/zodSchemas';
import { revalidatePath } from 'next/cache';

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();

  try {
    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid data',
      };
    }
    if (result.data.status === 'Published') {
      const courseWithLessons = await prisma.course.findUnique({
        where: { id: courseId, tenantId: user.tenantId },
        include: {
          chapter: {
            include: {
              lessons: {
                where: { type: 'QUIZ' },
                include: { _count: { select: { questions: true } } },
              },
            },
          },
        },
      });

      const emptyQuizzes = courseWithLessons?.chapter
        .flatMap((c) => c.lessons)
        .filter((l) => l._count.questions === 0);

      if (emptyQuizzes && emptyQuizzes.length > 0) {
        return {
          status: 'error',
          message: `Cannot publish. The following quizzes have no questions: ${emptyQuizzes.map((q) => q.title).join(', ')}`,
        };
      }
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.id,
        tenantId: user.tenantId,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: 'success',
      message: 'Course updated successfully',
    };
  } catch (error) {
    console.error('Failed to update course:', error);
    return {
      status: 'error',
      message: 'Failed to update Course',
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: 'error',
        message: 'No lessons provided for reordering.',
      };
    }

    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
          tenantId: user.tenantId,
        },
        data: {
          position: lesson.position,
        },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: 'success',
      message: 'Lessons reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to reorder lessons.',
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[],
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: 'error',
        message: 'No chapters provided for reordering.',
      };
    }

    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
          tenantId: user.tenantId,
        },
        data: {
          position: chapter.position,
        },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapters reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to reorder chapters',
    };
  }
}

export async function createChapter(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    const result = chapterSchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid Data',
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId: result.data.courseId,
          tenantId: user.tenantId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      });

      await tx.chapter.create({
        data: {
          title: result.data.name,
          courseId: result.data.courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapter created successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create chapter',
    };
  }
}

export async function createLesson(
  values: LessonSchemaType,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid Data',
      };
    }

    //  let newLesson;
    let lessonId: string;
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId: result.data.chapterId,
          tenantId: user.tenantId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      });

      const lesson = await tx.lesson.create({
        data: {
          title: result.data.name,
          description: result.data.description,
          videoKey: result.data.videoKey,
          thumbnailKey: result.data.thumbnailKey,
          chapterId: result.data.chapterId,
          type: result.data.type,
          position: (maxPos?.position ?? 0) + 1,
        },
      });

      // Create coding exercise if lesson type is CODING
      if (result.data.type === 'CODING') {
        const language = result.data.codingLanguage || 'web';
        let starterCode = '';

        if (language === 'web') {
          // For web development, combine HTML, CSS, and JavaScript
          const htmlCode = result.data.htmlStarterCode || '';
          const cssCode = result.data.cssStarterCode || '';
          const jsCode = result.data.jsStarterCode || '';

          starterCode = JSON.stringify({
            html: htmlCode,
            css: cssCode,
            javascript: jsCode,
          });
        } else {
          // For server-side languages
          starterCode = result.data.serverStarterCode || '';
        }

        await tx.codingExercise.create({
          data: {
            lessonId: lesson.id,
            language: language,
            starterCode: starterCode,
            instructions: result.data.codingInstructions || '',
          },
        });
      }
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: 'success',
      message: 'Lesson created successfully',
      data: { lessonId: lessonId! },
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create lesson',
    };
  }
}

export async function deleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        tenantId: user.tenantId,
      },
      select: {
        lessons: {
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });

    if (!chapterWithLessons) {
      return {
        status: 'error',
        message: 'Chapter not Found',
      };
    }

    const lessons = chapterWithLessons.lessons;

    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonToDelete) {
      return {
        status: 'error',
        message: 'Lesson not found in the chapter.',
      };
    }

    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);

    const updates = remainingLessons.map((lesson, index) => {
      return prisma.lesson.update({
        where: {
          id: lesson.id,

          tenantId: user.tenantId,
        },
        data: { position: index + 1 },
      });
    });

    await prisma.$transaction([
      ...updates,
      prisma.lesson.delete({
        where: {
          id: lessonId,
          chapterId: chapterId,
          tenantId: user.tenantId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Lesson deleted and positions reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete lesson',
    };
  }
}

export async function deleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  try {
    const courseWithChapters = await prisma.course.findUnique({
      where: {
        id: courseId,

        tenantId: user.tenantId,
      },
      select: {
        chapter: {
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });

    if (!courseWithChapters) {
      return {
        status: 'error',
        message: 'Course not Found',
      };
    }

    const chapters = courseWithChapters.chapter;
    const chapterToDelete = chapters.find((chap) => chap.id === chapterId);

    if (!chapterToDelete) {
      return {
        status: 'error',
        message: 'Chapter not found in the Course.',
      };
    }

    const remainingChapters = chapters.filter((chap) => chap.id !== chapterId);

    const updates = remainingChapters.map((chap, index) => {
      return prisma.chapter.update({
        where: { id: chap.id, tenantId: user.tenantId },
        data: { position: index + 1 },
      });
    });

    await prisma.$transaction([
      ...updates,
      prisma.chapter.delete({
        where: {
          tenantId: user.tenantId,
          id: chapterId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapter deleted and positions reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete chapter',
    };
  }
}
