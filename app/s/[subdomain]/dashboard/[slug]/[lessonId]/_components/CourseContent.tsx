'use client';

import { LessonContentType } from '@/app/s/[subdomain]/data/course/get-lesson-content';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { BookIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { markLessonComplete } from '../actions';
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/use-confetti';
import { useRouter } from 'next/navigation';
import { CommentWithUserAndReplies } from '../comment-actions';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Player } from '@/components/player/player';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface iAppProps {
  data: LessonContentType;
  comments: CommentWithUserAndReplies[];
  isAdminView?: boolean;
}

function VideoPlayer({
  thumbnailKey,
  videoKey,
  title,
  noVideoText,
}: {
  thumbnailKey: string;
  videoKey: string;
  title: string;
  noVideoText: string;
}) {
  const videoUrl = useConstructUrl(videoKey);
  const thumbnailUrl = useConstructUrl(thumbnailKey);

  if (!videoKey) {
    return (
      <div className='bg-muted flex aspect-video flex-col items-center justify-center rounded-lg'>
        <BookIcon className='text-primary mx-auto mb-4 size-16' />
        <p className='text-muted-foreground'>{noVideoText}</p>
      </div>
    );
  }

  return (
    <div className='relative aspect-video overflow-hidden rounded-lg bg-black'>
      <Player
        src={videoUrl}
        coverSrc={thumbnailUrl}
        coverAlt={`${title} cover`}
      />
    </div>
  );
}

export function CourseContent({
  data,
  comments,
  isAdminView = false,
}: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const router = useRouter();
  const t = useTranslations('CourseContent');

  const isCompleted =
    data.lessonProgress.length > 0 && data.lessonProgress[0].completed;

  const handleMarkComplete = () => {
    if (isCompleted || pending) return;

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug),
      );

      if (error) {
        toast.error(t('notifications.error'));
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        triggerConfetti();
        router.refresh();
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className='bg-background flex h-full flex-col pl-6'>
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ''}
        videoKey={data.videoKey ?? ''}
        title={data.title}
        noVideoText={t('videoPlayer.noVideoMessage')}
      />

      {!isAdminView && (
        <div className='border-b py-4'>
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted || pending}
            className={cn(
              'transition-all',
              isCompleted &&
                'cursor-not-allowed bg-green-600 hover:bg-green-600',
            )}
          >
            {pending ? (
              <Loader2 className='mr-2 size-4 animate-spin' />
            ) : (
              <CheckCircle className='mr-2 size-4' />
            )}
            {isCompleted ? t('buttons.completed') : t('buttons.markComplete')}
          </Button>
        </div>
      )}

      <div className='space-y-3 pt-3'>
        <h1 className='text-foreground text-3xl font-bold tracking-tight'>
          {data.title}
        </h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
      <div className='mt-8 flex-grow overflow-y-auto border-t pt-6 pr-6 pb-6'>
        <h2 className='mb-4 text-2xl font-bold'>
          {t('comments.title', { count: comments.length })}
        </h2>
        <div className='space-y-6'>
          <CommentForm lessonId={data.id} />
          <CommentList comments={comments} lessonId={data.id} />
        </div>
      </div>
    </div>
  );
}
