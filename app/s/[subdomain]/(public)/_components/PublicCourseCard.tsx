import { PublicCourseType } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { useLocale, useTranslations } from 'next-intl';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey!);
  const t = useTranslations('PublicCourseCard');
  const tEnums = useTranslations('CourseEnums');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  

  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === 'admin';
  return (
    <Card className='group relative overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
      <div className='relative overflow-hidden'>
        <Image
          width={600}
          height={300}
          className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
          src={thumbnailUrl}
          alt={t('alt')} 
        />
        <Badge className='bg-background text-primary absolute top-3 right-3 border-0 shadow-lg backdrop-blur-sm'>
          {tEnums(`levels.${data.level}`)}
        </Badge>
      </div>

      <CardContent className='space-y-4 p-6' dir={isRTL ? 'rtl' : 'ltr'}>
        <Link
          className='hover:text-primary line-clamp-2 block text-lg font-bold transition-colors duration-200'
          href={`/courses/${data.slug}`}
        >
          {data.title}
        </Link>
        <p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'>
          {data.smallDescription}
        </p>
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span className='font-medium'>{data.duration}{t('hours')}</span>
          </div>
          <div className='flex items-center gap-1'>
            <BookOpen className='h-4 w-4' />
            <span className='font-medium'>{tEnums(`categories.${data.category}`)}</span>
          </div>
        </div>

        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({
            className:
              'group/btn from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 relative w-full overflow-hidden rounded-xl border-0 bg-gradient-to-r py-3 shadow-lg transition-all duration-500 hover:shadow-xl',
          })}
        >
          <span className='relative z-10 flex items-center justify-center gap-2 font-medium'>
            {isAdmin ? t('buttons.manageCourse') : t('buttons.startLearning')}
            <ArrowRight className={cn('h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1', {
              'rotate-180 group-hover/btn:-translate-x-1': isRTL,
            })} />
          </span>
          <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100' />
        </Link>
      </CardContent>
    </Card>
  );
}


export function PublicCourseCardSkeleton() {
  return (
    <Card className='overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-white/5'>
      {/* Image Skeleton */}
      <div className='relative'>
        <Skeleton className='h-48 w-full' />
        <div className='absolute top-3 right-3'>
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
      </div>

      <CardContent className='space-y-4 p-6'>
        {/* Title Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-3/4' />
        </div>

        {/* Description Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-2/3' />
        </div>

        {/* Course Info Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-8' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className='h-10 w-full rounded-lg' />
      </CardContent>
    </Card>
  );
}
