'use client';

import { LessonContentType } from '@/app/data/course/get-lesson-content';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { BookIcon, CheckCircle } from 'lucide-react';
import { useTransition } from 'react';
import { markLessonComplete, markLessonIncomplete } from '../actions';
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/use-confetti';
import { useRouter } from 'next/navigation';
interface iAppProps {
  data: LessonContentType;
}

export function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const router = useRouter();

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    if (!videoKey) {
      return (
        <div className='bg-muted flex aspect-video flex-col items-center justify-center rounded-lg'>
          <BookIcon className='text-primary mx-auto mb-4 size-16' />
          <p className='text-muted-foreground'>
            This lesson does not have a video yet
          </p>
        </div>
      );
    }

    return (
      <div className='relative aspect-video overflow-hidden rounded-lg bg-black'>
        <video
          className='h-full w-full object-cover'
          controls
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type='video/mp4' />
          <source src={videoUrl} type='video/webm' />
          <source src={videoUrl} type='video/ogg' />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  function onToggleCompletion(isCurrentlyComplete: boolean) {
    startTransition(async () => {
      const action = isCurrentlyComplete
        ? markLessonIncomplete
        : markLessonComplete;
      const { data: result, error } = await tryCatch(
        action(data.id, data.Chapter.Course.slug),
      );

      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        if (!isCurrentlyComplete) triggerConfetti();
        router.refresh();
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className='bg-background flex h-full flex-col pl-6'>
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ''}
        videoKey={data.videoKey ?? ''}
      />

      <div className='border-b py-4'>
        {data.lessonProgress.length > 0 && data.lessonProgress[0].completed ? (
          <Button
            variant='outline'
            className='bg-green-500/10 text-green-500 hover:text-green-600'
            onClick={() => onToggleCompletion(true)}
            disabled={pending}
          >
            <CheckCircle className='mr-2 size-4 text-green-500' />
            Mark as Incomplete
          </Button>
        ) : (
          <Button
            variant='outline'
            onClick={() => onToggleCompletion(false)}
            disabled={pending}
          >
            <CheckCircle className='mr-2 size-4 text-green-500' />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className='space-y-3 pt-3'>
        <h1 className='text-foreground text-3xl font-bold tracking-tight'>
          {data.title}
        </h1>

        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
