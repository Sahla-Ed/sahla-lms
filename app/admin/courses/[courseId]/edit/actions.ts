'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
} from '@/lib/zodSchemas';
import { revalidatePath } from 'next/cache';
import { checkCoursePermission } from '@/app/data/course/permission-check';

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(courseId, 'course', 'update');

    const result = courseSchema.safeParse(data);
    if (!result.success) {
      return { status: 'error', message: 'Invalid data' };
    }

    await prisma.course.update({
      where: { id: courseId },
      data: { ...result.data },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    revalidatePath('/admin/courses');

    return { status: 'success', message: 'Course updated successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to update Course',
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(courseId, 'lesson', 'update');
    if (!lessons || lessons.length === 0) {
      return {
        status: 'error',
        message: 'No lessons provided for reordering.',
      };
    }

    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: { id: lesson.id, chapterId: chapterId },
        data: { position: lesson.position },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return { status: 'success', message: 'Lessons reordered successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to reorder lessons.',
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[],
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(courseId, 'lesson', 'update');
    if (!chapters || chapters.length === 0) {
      return {
        status: 'error',
        message: 'No chapters provided for reordering.',
      };
    }

    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: { id: chapter.id, courseId: courseId },
        data: { position: chapter.position },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return { status: 'success', message: 'Chapters reordered successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to reorder chapters',
    };
  }
}

export async function createChapter(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(values.courseId, 'lesson', 'create');
    const result = chapterSchema.safeParse(values);

    if (!result.success) {
      return { status: 'error', message: 'Invalid Data' };
    }

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: { courseId: result.data.courseId },
        select: { position: true },
        orderBy: { position: 'desc' },
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

    return { status: 'success', message: 'Chapter created successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to create chapter',
    };
  }
}

export async function createLesson(
  values: LessonSchemaType,
): Promise<ApiResponse> {
  try {
    await checkCoursePermission(values.courseId, 'lesson', 'create');
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return { status: 'error', message: 'Invalid Data' };
    }

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: { chapterId: result.data.chapterId },
        select: { position: true },
        orderBy: { position: 'desc' },
      });

      await tx.lesson.create({
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
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return { status: 'success', message: 'Lesson created successfully' };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to create lesson',
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
  try {
    await checkCoursePermission(courseId, 'lesson', 'delete');
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        lessons: {
          orderBy: { position: 'asc' },
          select: { id: true },
        },
      },
    });

    if (!chapterWithLessons) {
      return { status: 'error', message: 'Chapter not Found' };
    }

    await prisma.$transaction([
      prisma.lesson.delete({
        where: {
          id: lessonId,
          chapterId: chapterId,
        },
      }),
      ...chapterWithLessons.lessons
        .filter((lesson) => lesson.id !== lessonId)
        .map((lesson, index) =>
          prisma.lesson.update({
            where: { id: lesson.id },
            data: { position: index + 1 },
          }),
        ),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Lesson deleted and positions reordered successfully',
    };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to delete lesson',
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
  try {
    await checkCoursePermission(courseId, 'lesson', 'delete');
    const courseWithChapters = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        chapter: {
          orderBy: { position: 'asc' },
          select: { id: true },
        },
      },
    });

    if (!courseWithChapters) {
      return { status: 'error', message: 'Course not Found' };
    }

    await prisma.$transaction([
      prisma.chapter.delete({
        where: {
          id: chapterId,
        },
      }),
      ...courseWithChapters.chapter
        .filter((chap) => chap.id !== chapterId)
        .map((chap, index) =>
          prisma.chapter.update({
            where: { id: chap.id },
            data: { position: index + 1 },
          }),
        ),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapter deleted and positions reordered successfully',
    };
  } catch (e) {
    const error = e as Error;
    return {
      status: 'error',
      message: error.message || 'Failed to delete chapter',
    };
  }
}
