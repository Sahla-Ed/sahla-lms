'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  FileText,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Code,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CourseForAdminSidebar {
  id: string;
  title: string;
  chapter: {
    id: string;
    title: string;
    position: number;
    lessons: {
      id: string;
      title: string;
      type: 'VIDEO' | 'QUIZ' | 'CODING';
    }[];
  }[];
}

interface AdminCourseSidebarProps {
  course: CourseForAdminSidebar;
}

export function AdminCourseSidebar({ course }: AdminCourseSidebarProps) {
  const params = useParams<{ lessonId: string }>();
  const currentLessonId = params.lessonId;
  const t = useTranslations('AdminLessonPreview.sidebar');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className='flex h-full flex-col' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='border-border border-b p-4'>
        <Link
          href={`/admin/courses/${course.id}/edit`}
          className='text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2 text-sm font-semibold'
        >
          {isRTL ? <ArrowRight className='size-4' /> : <ArrowLeft className='size-4' />}
          {t('backButton')}
        </Link>
        <h1 className='truncate text-base leading-tight font-bold'>
          {course.title}
        </h1>
        <p className='text-muted-foreground mt-1 truncate text-xs'>
          {t('header')}
        </p>
      </div>

      <div className={cn('flex-1 space-y-3 overflow-y-auto py-4', isRTL ? 'pl-4' : 'pr-4')}>
        {course.chapter.map((chapter) => (
          <Collapsible key={chapter.id} defaultOpen={true}>
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='flex h-auto w-full items-center justify-start gap-2 p-3 text-left'
              >
                <div className='shrink-0'>
                  <ChevronDown className='text-primary size-4' />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-semibold'>
                    {chapter.position}: {chapter.title}
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className={cn('mt-1 space-y-1 border-r-2 pr-6', isRTL ? 'border-l-0 border-r-2 pr-6' : 'border-r-0 border-l-2 pl-6')}>
              {chapter.lessons
                .map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/admin/lessons/${lesson.id}`}
                    className={`block rounded-md p-2 text-sm font-medium transition-colors ${currentLessonId === lesson.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                  >
                    <div className='flex items-center gap-2'>
                      {lesson.type === 'VIDEO' && <FileText className='size-4 shrink-0' />}
                      {lesson.type === 'QUIZ' && <HelpCircle className='size-4 shrink-0' />}
                      {lesson.type === 'CODING' && <Code className='size-4 shrink-0' />}
                      <span className='truncate'>{lesson.title}</span>
                    </div>
                  </Link>
                ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
