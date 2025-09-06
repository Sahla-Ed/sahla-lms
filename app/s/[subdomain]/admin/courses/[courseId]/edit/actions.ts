'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  chapterSchema,
  ChapterSchemaType,
  getCourseSchema,
  ZodValidationKeys,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
  // codeSubmissionSchema,
  // CodeSubmissionType,
} from '@/lib/zodSchemas';

import { revalidatePath } from 'next/cache';
import { getLocale, getTranslations } from 'next-intl/server';

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'ZodValidation' });

  const tNotifications = await getTranslations('EditCourseForm.notifications');
  const courseSchema = getCourseSchema((key) => t(key as ZodValidationKeys));

  try {
    const result = courseSchema.safeParse(data);

    if (!result.success) {
      const firstError = Object.values(
        result.error.flatten().fieldErrors,
      )[0]?.[0];
      return {
        status: 'error',
        message: firstError || 'Invalid data',
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
      message: tNotifications('success'),
    };
  } catch (error) {
    console.error('Failed to update course:', error);
    return {
      status: 'error',
      message: tNotifications('error'),
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string,
): Promise<ApiResponse> {
  const t = await getTranslations('CourseStructure.notifications');
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
      message: t('reorderLessonsSuccess'),
    };
  } catch {
    return {
      status: 'error',
      message: t('reorderLessonsError'),
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[],
): Promise<ApiResponse> {
  const t = await getTranslations('CourseStructure.notifications');
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
      message: t('reorderChaptersSuccess'),
    };
  } catch {
    return {
      status: 'error',
      message: t('reorderChaptersError'),
    };
  }
}

export async function createChapter(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  const t = await getTranslations('NewChapterModal.notifications');
  try {
    const result = chapterSchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: t('invalidData'),
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
          tenantId: user.tenantId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: 'success',
      message: t('success'),
    };
  } catch {
    return {
      status: 'error',
      message: t('error'),
    };
  }
}

export async function createLesson(
  values: LessonSchemaType,
): Promise<ApiResponse> {
  const { user } = await requireAdmin();
  const session = await requireUser();
  const t = await getTranslations('NewLessonModal.notifications');
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
          tenantId: user.tenantId,
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
            tenantId: session?.tenantId ?? '',
            language: language,
            starterCode: starterCode,
            instructions: result.data.codingInstructions || '',
          },
        });
      }
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    let successMessage = '';
    switch (result.data.type) {
      case 'QUIZ':
        successMessage = t('successQuiz');
        break;
      case 'CODING':
        successMessage = t('successCoding');
        break;
      default:
        successMessage = t('successVideo');
    }
    return {
      status: 'success',
      message: successMessage,
      data: { lessonId: lessonId! },
    };
  } catch {
    return {
      status: 'error',
      message: t('error'),
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
  const t = await getTranslations('DeleteLesson.notifications');
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
        message: t('chapterNotFound'),
      };
    }

    const lessons = chapterWithLessons.lessons;

    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonToDelete) {
      return {
        status: 'error',
        message: t('lessonNotFound'),
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
      message: t('success'),
    };
  } catch {
    return {
      status: 'error',
      message: t('error'),
    };
  }
}

export async function updateCodingExercise({
  lessonId,
  title,
  description,
  language,
  starterCode,
  instructions,
}: {
  lessonId: string;
  title: string;
  description?: string;
  language: string;
  starterCode: string;
  instructions?: string;
}): Promise<ApiResponse> {
  // const { user } = await requireAdmin();
  try {
    // Verify the lesson exists and belongs to the user's tenant
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
        //FIXME:this was patched before presention
        // tenantId: user.tenantId,
        type: 'CODING',
      },
      include: {
        codingExercise: true,
      },
    });

    if (!lesson) {
      return {
        status: 'error',
        message: 'Coding lesson not found',
      };
    }
    // if (user.tenantId === null) {
    //   return {
    //     status: 'error',
    //     message: 'tenant id not found  ',
    //   };
    // }

    await prisma.$transaction(async (tx) => {
      // Update lesson basic information
      await tx.lesson.update({
        where: { id: lessonId },
        data: {
          title: title,
          description: description,
        },
      });

      // Update or create coding exercise
      if (lesson.codingExercise.length > 0) {
        // Update existing coding exercise
        await tx.codingExercise.update({
          where: {
            lessonId: lessonId,
            //FIXME:this was patched before presention
            // tenantId: user?.tenantId
          },
          data: {
            language: language,
            starterCode: starterCode,
            instructions: instructions || '',
          },
        });
      } else {
        // Create new coding exercise
        await tx.codingExercise.create({
          data: {
            lessonId: lessonId,
            //FIXME:this was patched before presention
            // tenantId: user?.tenantId ?? '',
            language: language,
            starterCode: starterCode,
            instructions: instructions || '',
          },
        });
      }
    });

    return {
      status: 'success',
      message: 'Coding exercise updated successfully',
    };
  } catch (error) {
    console.error('Failed to update coding exercise:', error);
    return {
      status: 'error',
      message: 'Failed to update coding exercise',
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
  const t = await getTranslations('DeleteChapter.notifications');
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
        message: t('courseNotFound'),
      };
    }

    const chapters = courseWithChapters.chapter;
    const chapterToDelete = chapters.find((chap) => chap.id === chapterId);

    if (!chapterToDelete) {
      return {
        status: 'error',
        message: t('chapterNotFound'),
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
      message: t('success'),
    };
  } catch {
    return {
      status: 'error',
      message: t('error'),
    };
  }
}
