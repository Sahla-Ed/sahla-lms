import { EmptyState } from '@/components/general/EmptyState';
import { getAllCourses } from '../data/course/get-all-courses';
import { getEnrolledCourses } from '../data/user/get-enrolled-courses';
import { PublicCourseCard } from '../(public)/_components/PublicCourseCard';
import { CourseProgressCard } from './_components/CourseProgressCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { requireUser } from '../data/user/require-user'; 
import {
  IconBook,
  IconPlayerPlay,
  IconStar,
  IconTrophy,
  IconChartBar,
} from '@tabler/icons-react';
import { BookOpen, PlayCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { WelcomeToast } from './_components/WelcomeToast';
import { getLocale, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const [courses, enrolledCourses, t, locale, user] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
    getTranslations('UserDashboardPage'),
    getLocale(),
    requireUser(), 
  ]);
  const displayName = user?.name || user?.email.split('@')[0] || '';
  const isRTL = locale === 'ar';

  const totalLessons = enrolledCourses.reduce(
    (total, enrollment) => total + enrollment.Course.chapter.reduce((chapterTotal, chapter) => chapterTotal + chapter.lessons.length, 0), 0
  );

  const totalChapters = enrolledCourses.reduce(
    (total, enrollment) => total + enrollment.Course.chapter.length, 0
  );

  const availableCourses = courses.filter(
    (course) => !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id),
  );

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0' dir={isRTL ? 'rtl' : 'ltr'}>
        <WelcomeToast />
      <div className='mb-6 flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
            <IconStar className={cn('size-3', isRTL ? 'ml-1' : 'mr-1')} />
            {t('welcome.badge')}
          </Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('welcome.title', { username: displayName })}
        </h1>
        <p className='text-muted-foreground'>{t('welcome.description')}</p>
      </div>

      <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'><div className='flex items-center justify-between'><div><p className='text-muted-foreground text-sm font-medium'>{t('stats.enrolled')}</p><p className='text-2xl font-bold'>{enrolledCourses.length}</p></div><div className='bg-primary/10 rounded-lg p-2'><BookOpen className='text-primary size-4' /></div></div></CardContent>
        </Card>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'><div className='flex items-center justify-between'><div><p className='text-muted-foreground text-sm font-medium'>{t('stats.lessons')}</p><p className='text-2xl font-bold'>{totalLessons}</p></div><div className='rounded-lg bg-green-500/10 p-2'><PlayCircle className='size-4 text-green-600' /></div></div></CardContent>
        </Card>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'><div className='flex items-center justify-between'><div><p className='text-muted-foreground text-sm font-medium'>{t('stats.chapters')}</p><p className='text-2xl font-bold'>{totalChapters}</p></div><div className='rounded-lg bg-blue-500/10 p-2'><TrendingUp className='size-4 text-blue-600' /></div></div></CardContent>
        </Card>
      </div>

      <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm md:col-span-4'>
          <CardContent className='p-6'>
            <div className='mb-4 flex items-center gap-2'><IconPlayerPlay className='text-primary size-5' /><h3 className='text-lg font-semibold'>{t('learning.continue')}</h3></div>
            {enrolledCourses.length === 0 ? (
              <div className='py-8 text-center'><EmptyState title={t('learning.emptyTitle')} description={t('learning.emptyDescription')} buttonText={t('learning.emptyButton')} href='/courses'/></div>
            ) : (
              <div className='space-y-4'>
                {enrolledCourses.slice(0, 3).map((course) => {
                  const courseLessons = course.Course.chapter.reduce((total, chapter) => total + chapter.lessons.length, 0);
                  return (
                    <div key={course.Course.id} className='hover:bg-accent/50 flex items-center gap-4 rounded-lg p-4 transition-colors'>
                      <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'><IconBook className='text-primary size-5' /></div>
                      <div className='flex-1'><h4 className='font-medium'>{course.Course.title}</h4><p className='text-muted-foreground text-sm'>{t('learning.lessonsAvailable', { count: courseLessons })}</p></div>
                      <div className={cn('text-right', isRTL && 'text-left')}><p className='text-sm font-medium'>{t('learning.chapters', { count: course.Course.chapter.length })}</p><Link className='text-muted-foreground text-xs transition hover:text-amber-700' href={`/dashboard/${course.Course.slug}`}>{t('learning.readyToStart')}</Link></div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm md:col-span-3'>
          <CardContent className='p-6'>
            <div className='mb-4 flex items-center gap-2'><IconChartBar className='text-primary size-5' /><h3 className='text-lg font-semibold'>{t('statsCard.title')}</h3></div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'><span className='text-muted-foreground text-sm'>{t('statsCard.enrolled')}</span><span className='font-medium'>{enrolledCourses.length}</span></div>
              <div className='flex items-center justify-between'><span className='text-muted-foreground text-sm'>{t('statsCard.available')}</span><span className='font-medium'>{availableCourses.length}</span></div>
              <div className='space-y-3 pt-4'>
                <div className='flex items-center justify-between'><div className='flex items-center gap-2'><div className='bg-primary h-2 w-2 rounded-full' /><span className='text-sm'>{t('statsCard.totalLessons')}</span></div><span className='text-sm font-medium'>{totalLessons}</span></div>
                <div className='flex items-center justify-between'><div className='flex items-center gap-2'><div className='h-2 w-2 rounded-full bg-blue-500' /><span className='text-sm'>{t('statsCard.totalChapters')}</span></div><span className='text-sm font-medium'>{totalChapters}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='bg-card/50 border-border/50 mb-6 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='mb-6 flex items-center justify-between'><div className='flex items-center gap-2'><IconBook className='text-primary size-5' /><h3 className='text-lg font-semibold'>{t('myCourses.title')}</h3></div><Badge variant='secondary' className='bg-primary/10 text-primary'>{t('myCourses.enrolledBadge', { count: enrolledCourses.length })}</Badge></div>
          {enrolledCourses.length === 0 ? (
            <div className='py-8 text-center'><EmptyState title={t('learning.emptyTitle')} description={t('learning.emptyDescription')} buttonText={t('learning.emptyButton')} href='/courses' /></div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{enrolledCourses.map((course) => (<CourseProgressCard key={course.Course.id} data={course} />))}</div>
          )}
        </CardContent>
      </Card>
      <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='mb-6 flex items-center justify-between'><div className='flex items-center gap-2'><IconTrophy className='text-primary size-5' /><h3 className='text-lg font-semibold'>{t('availableCourses.title')}</h3></div><Badge variant='secondary' className='bg-green-500/10 text-green-600'>{t('availableCourses.availableBadge', { count: availableCourses.length })}</Badge></div>
          {availableCourses.length === 0 ? (
            <div className='py-8 text-center'>
              <div className='mb-4 flex justify-center'><div className='bg-primary/10 text-primary rounded-full p-4'><IconTrophy className='size-8' /></div></div>
              <EmptyState title={t('availableCourses.emptyTitle')} description={t('availableCourses.emptyDescription')} buttonText={t('availableCourses.emptyButton')} href='/courses'/>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{availableCourses.slice(0, 6).map((course) => (<PublicCourseCard key={course.id} data={course} />))}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}