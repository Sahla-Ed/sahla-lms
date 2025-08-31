'use server';

import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { lessonSchema, LessonSchemaType } from '@/lib/zodSchemas';
import { getTranslations } from 'next-intl/server';

export async function updateLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  await requireAdmin();
  const t = await getTranslations('LessonForm.notifications');

  try {
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid data',
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: result.data.name,
        description: result.data.description,
        thumbnailKey: result.data.thumbnailKey,
        videoKey: result.data.videoKey,
      },
    });

    return {
      status: 'success',
      message: t('updateSuccess'),
    };
  } catch {
    return {
      status: 'error',
      message: t('updateError'),
    };
  }
}
