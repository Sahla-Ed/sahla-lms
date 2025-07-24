'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, HelpCircle, Play, Lock } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    type: 'VIDEO' | 'QUIZ';
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
  quizFailed?: boolean;
  isLocked: boolean;
}

export function LessonItem({
  lesson,
  slug,
  isActive,
  completed,
  quizFailed,
  isLocked,
}: iAppProps) {
  const href = isLocked ? '#' : `/dashboard/${slug}/${lesson.id}`;

  const linkContent = (
    <div className='flex w-full min-w-0 items-center gap-2.5'>
      <div className='shrink-0'>
        {isLocked ? (
          <Lock className='text-muted-foreground size-5' />
        ) : completed && !quizFailed ? (
          <div className='flex size-5 items-center justify-center rounded-full bg-green-600 dark:bg-green-500'>
            <Check className='size-3 text-white' />
          </div>
        ) : quizFailed ? (
          <div className='flex size-5 items-center justify-center rounded-full bg-red-600 dark:bg-red-500'>
            <svg
              className='size-3 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        ) : lesson.type === 'QUIZ' ? (
          <HelpCircle
            className={cn(
              'size-5',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          />
        ) : (
          <div
            className={cn(
              'bg-background flex size-5 items-center justify-center rounded-full border-2',
              isActive
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-muted-foreground/60',
            )}
          >
            <Play
              className={cn(
                'size-2.5 fill-current',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
            />
          </div>
        )}
      </div>

      <div className='min-w-0 flex-1 text-left'>
        <p
          className={cn(
            'truncate text-sm font-medium',
            completed && !quizFailed
              ? 'text-green-800 dark:text-green-200'
              : quizFailed
                ? 'text-red-800 dark:text-red-200'
                : isActive
                  ? 'text-primary font-semibold'
                  : 'text-foreground',
          )}
        >
          {lesson.position}. {lesson.title}
        </p>
        {completed && !quizFailed && (
          <p className='text-[10px] font-medium text-green-700 dark:text-green-300'>
            Completed
          </p>
        )}
        {quizFailed && (
          <p className='text-[10px] font-medium text-red-700 dark:text-red-300'>
            Try again?
          </p>
        )}
        {isActive && !completed && !quizFailed && (
          <p className='text-primary font-mediums text-[10px]'>
            Currently Watching
          </p>
        )}
      </div>
    </div>
  );

  const lessonComponent = (
    <Link
      href={href}
      aria-disabled={isLocked}
      onClick={(e) => {
        if (isLocked) e.preventDefault();
      }}
      className={buttonVariants({
        variant: completed && !quizFailed ? 'secondary' : 'outline',
        className: cn(
          'h-auto w-full justify-start p-2.5 transition-all',
          completed &&
            !quizFailed &&
            'border-green-300 bg-green-100 text-green-800 hover:bg-green-200 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50',
          quizFailed &&
            'border-red-300 bg-red-100 text-red-800 hover:bg-red-200 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50',
          isActive &&
            !completed &&
            !quizFailed &&
            'bg-primary/10 dark:bg-primary/20 border-primary/50 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary',
          isLocked && 'cursor-not-allowed opacity-50',
        ),
      })}
    >
      {linkContent}
    </Link>
  );

  if (isLocked) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{lessonComponent}</TooltipTrigger>
          <TooltipContent>
            <p>Complete the previous lesson to unlock</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return lessonComponent;
}
