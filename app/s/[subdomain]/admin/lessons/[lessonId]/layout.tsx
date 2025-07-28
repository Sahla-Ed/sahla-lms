import { ReactNode } from 'react';
import { prisma } from '@/lib/db';
import { AdminCourseSidebar } from './_components/AdminCourseSidebar';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';

export const dynamic = 'force-dynamic';

interface AdminLessonLayoutProps {
  params: Promise<{ lessonId: string }>;
  children: ReactNode;
}

export default async function AdminLessonLayout({
  children,
  params,
}: AdminLessonLayoutProps) {
  const { lessonId } = await params;
  await requireAdmin();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { Chapter: { select: { courseId: true } } },
  });

  if (!lesson?.Chapter?.courseId) {
    return notFound();
  }

  const courseId = lesson.Chapter.courseId;

  const courseForSidebar = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      fileKey: true,
      duration: true,
      level: true,
      category: true,
      chapter: {
        orderBy: { position: 'asc' },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: { position: 'asc' },
            select: {
              id: true,
              title: true,
              type: true,
              position: true,
            },
          },
        },
      },
    },
  });

  if (!courseForSidebar) {
    return notFound();
  }

  const courseDataForSidebar = {
    ...courseForSidebar,
    chapter: courseForSidebar.chapter.map((chap) => ({
      ...chap,
      lessons: chap.lessons.map((les) => ({
        ...les,
        description: null,
        lessonProgress: [],
        attempts: [],
        isLocked: false,
      })),
    })),
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col sm:flex-row'>
      <div className='border-border max-h-screen w-full shrink-0 overflow-y-auto sm:sticky sm:top-0 sm:w-80 sm:border-r md:w-72 lg:w-80'>
        <AdminCourseSidebar course={courseDataForSidebar} />
      </div>
      <div className='min-w-0 flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
