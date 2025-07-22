'use server';

import 'server-only';
import { requireUser } from '../user/require-user';
import { prisma } from '@/lib/db';

export async function checkCourseCompletion(courseId: string) {
  const user = await requireUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapter: {
        include: {
          lessons: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error('Course not found');
  }

  const totalLessons = course.chapter.reduce(
    (acc, chap) => acc + chap.lessons.length,
    0,
  );

  if (totalLessons === 0) {
    return { isCompleted: false, totalLessons: 0, completedLessons: 0 };
  }

  const completedLessonsCount = await prisma.lessonProgress.count({
    where: {
      userId: user.id,
      completed: true,
      Lesson: {
        Chapter: {
          courseId: courseId,
        },
      },
    },
  });

  return {
    isCompleted: completedLessonsCount === totalLessons,
    totalLessons,
    completedLessons: completedLessonsCount,
  };
}

export async function issueCertificate(courseId: string) {
  const user = await requireUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { isCompleted } = await checkCourseCompletion(courseId);
  if (!isCompleted) {
    throw new Error('Course is not completed yet.');
  }

  const existingCertificate = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  });

  if (existingCertificate) {
    return existingCertificate;
  }

  const newCertificate = await prisma.certificate.create({
    data: {
      userId: user.id,
      courseId: courseId,
    },
  });

  return newCertificate;
}
