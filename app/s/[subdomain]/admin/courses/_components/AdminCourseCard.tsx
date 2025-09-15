'use client';

import { AdminCourseType } from '@/app/s/[subdomain]/data/admin/admin-get-courses';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash2,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface iAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
  const t = useTranslations('AdminCourseCard');
  const tEnums = useTranslations('CourseEnums');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className='group relative gap-0 py-0'>
      {/* absolute dropdown */}
      <div className={`absolute top-2 z-10 ${isRTL ? 'left-2' : 'right-2'}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='secondary'
              size='icon'
              aria-label={t('moreActions')}
            >
              <MoreVertical className='size-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align={isRTL ? 'start' : 'end'}
            className='w-48'
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${data.id}/edit`}
                style={{
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                <Pencil className={`size-4 ${isRTL ? 'ml-2' : 'ms-2'}`} />
                {t('editCourse')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={`/courses/${data.slug}`}
                style={{
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                <Eye className={`size-4 ${isRTL ? 'ml-2' : 'ms-2'}`} />
                {t('preview')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${data.id}/delete`}
                style={{
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                <Trash2
                  className={`text-destructive size-4 ${isRTL ? 'ml-2' : 'ms-2'}`}
                />
                {t('deleteCourse')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={thumbnailUrl}
        alt={t('thumbnailAlt')}
        width={600}
        height={400}
        className='aspect-video h-full w-full rounded-t-lg object-cover'
      />

      <CardContent className='p-4'>
        <Link
          href={`/admin/courses/${data.id}/edit`}
          className='group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors hover:underline'
        >
          {data.title}
        </Link>

        <p className='text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight'>
          {data.smallDescription}
        </p>

        <div className='mt-4 flex items-center gap-x-5'>
          <div className='flex items-center gap-x-2'>
            <TimerIcon className='text-primary bg-primary/10 size-6 rounded-md p-1' />
            <p className='text-muted-foreground text-sm'>
              {data.duration}
              {t('hoursAbr')}
            </p>
          </div>
          <div className='flex items-center gap-x-2'>
            <School className='text-primary bg-primary/10 size-6 rounded-md p-1' />
            <p className='text-muted-foreground text-sm'>
              {tEnums(`levels.${data.level}`)}
            </p>
          </div>
        </div>

        <Link
          className={buttonVariants({
            className: 'mt-4 w-full',
          })}
          href={`/admin/courses/${data.id}/edit`}
        >
          {t('editCourse')}{' '}
          <ArrowRight className={cn('size-4', { 'rotate-180': isRTL })} />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className='group relative gap-0 py-0'>
      <div className='absolute top-2 right-2 z-10 flex items-center gap-2'>
        <Skeleton className='h-6 w-16 rounded-full' />
        <Skeleton className='size-8 rounded-md' />
      </div>
      <div className='relative h-fit w-full'>
        <Skeleton className='aspect-video h-[250px] w-full rounded-t-lg object-cover' />
      </div>
      <CardContent className='p-4'>
        <Skeleton className='mb-2 h-6 w-3/4 rounded' />
        <Skeleton className='mb-4 h-4 w-full rounded' />
        <div className='mt-4 flex items-center gap-x-5'>
          <div className='flex items-center gap-x-2'>
            <Skeleton className='size-6 rounded-md' />
            <Skeleton className='h-4 w-10 rounded' />
          </div>
          <div className='flex items-center gap-x-2'>
            <Skeleton className='size-6 rounded-md' />
            <Skeleton className='h-4 w-10 rounded' />
          </div>
        </div>

        <Skeleton className='mt-4 h-10 w-full rounded' />
      </CardContent>
    </Card>
  );
}
