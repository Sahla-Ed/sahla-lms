'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
}

interface LessonItemForPublicProps {
  lesson: Lesson;
  chapterIndex: number;
  lessonIndex: number;
  canAccess: boolean;
  courseSlug: string;
}

export function LessonItemForPublic({
  lesson,
  chapterIndex,
  lessonIndex,
  canAccess,
  courseSlug,
}: LessonItemForPublicProps) {
  const t = useTranslations('LessonItemForPublic');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const lessonNumber = `${chapterIndex + 1}.${lessonIndex + 1}`;

  const content = (
    <div
      className={cn(
        'group/lesson flex items-center gap-4 rounded-lg p-4 transition-all duration-200',
        canAccess
          ? 'hover:bg-accent/50 hover:border-border/50 cursor-pointer'
          : 'cursor-not-allowed opacity-70',
        isRTL && 'flex-row-reverse',
      )}
    >
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
          canAccess
            ? 'border-primary/20 bg-primary/10 group-hover/lesson:border-primary/40'
            : 'border-gray-300 bg-gray-100',
        )}
      >
        {canAccess ? (
          <PlayCircle className='text-primary size-4' />
        ) : (
          <Lock className='text-muted-foreground size-4' />
        )}
      </div>
      <div className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
        <p
          className={cn(
            'text-sm font-medium transition-colors',
            canAccess ? 'group-hover/lesson:text-primary' : '',
          )}
        >
          {lessonNumber} - {lesson.title}
        </p>
      </div>
      {!canAccess && (
        <Badge variant='outline' className='text-xs'>
          {t('locked')}
        </Badge>
      )}
    </div>
  );

  if (canAccess) {
    return (
      <Link href={`/dashboard/${courseSlug}/${lesson.id}`}>{content}</Link>
    );
  }

  return content;
}
