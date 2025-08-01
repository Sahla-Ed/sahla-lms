/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EnrolledCourseType } from '@/app/s/[subdomain]/data/user/get-enrolled-courses';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useConstructUrl } from '@/hooks/use-construct-url';
import { useCourseProgress } from '@/hooks/use-course-progress';

import Image from 'next/image';
import Link from 'next/link';

interface iAppProps {
  data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.Course.fileKey!);
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.Course as any });
  return (
    <Card className='group relative gap-0 py-0'>
      <Badge className='absolute top-2 right-2 z-10'>{data.Course.level}</Badge>

      <Image
        width={600}
        height={400}
        className='aspect-video h-full w-full rounded-t-xl object-cover'
        src={thumbnailUrl}
        alt='Thumbail Image of Course'
      />

      <CardContent className='p-4'>
        <Link
          className='group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors hover:underline'
          href={`/dashboard/${data.Course.slug}`}
        >
          {data.Course.title}
        </Link>
        <p className='text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight'>
          {data.Course.smallDescription}
        </p>

        <div className='mt-5 space-y-4'>
          <div className='mb-1 flex justify-between text-sm'>
            <p>Progress:</p>
            <p className='font-medium'>{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className='h-1.5' />

          <p className='text-muted-foreground mt-1 text-xs'>
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={buttonVariants({ className: 'mt-4 w-full' })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}
