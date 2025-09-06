'use client';

import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { useTransition } from 'react';
import { enrollInCourseAction } from '../actions';
import { toast } from 'sonner';
import { Loader2, PlayCircle, Edit } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface EnrollmentButtonProps {
  courseId: string;
  courseSlug: string;
  isEnrolled: boolean;
  isAdmin: boolean;
}

export function EnrollmentButton({
  courseId,
  courseSlug,
  isEnrolled,
  isAdmin,
}: EnrollmentButtonProps) {
  const [pending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const t = useTranslations('PublicCourseCard.buttons');
  const tEnroll = useTranslations('EnrollmentButton');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleEnroll = () => {
    if (!session) {
      router.push(`/auth/sign-in?redirectTo=/courses/${courseSlug}`);
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId),
      );

      if (error) {
        toast.error(tEnroll('error'));
        return;
      }

      if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  };

  if (isAdmin) {
    return (
      <Button asChild size='lg' className='w-full'>
        <Link
          href={`/admin/courses/${courseId}/edit`}
          className={cn('flex', { 'flex-row-reverse': isRTL })}
        >
          <Edit className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
          {t('manageCourse')}
        </Link>
      </Button>
    );
  }

  if (isEnrolled) {
    return (
      <Button asChild size='lg' className='w-full'>
        <Link
          href={`/dashboard/${courseSlug}`}
          className={cn('flex', { 'flex-row-reverse': isRTL })}
        >
          <PlayCircle className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
          {t('startLearning')}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={pending}
      size='lg'
      className='w-full'
    >
      {pending ? (
        <>
          <Loader2
            className={cn('size-4 animate-spin', isRTL ? 'ml-2' : 'mr-2')}
          />
          {tEnroll('processing')}
        </>
      ) : (
        tEnroll('enrollNow')
      )}
    </Button>
  );
}
