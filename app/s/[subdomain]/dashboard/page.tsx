
import { EmptyState } from '@/components/general/EmptyState';
import { getAllCourses } from '../data/course/get-all-courses';
import {
  getEnrolledCourses,
  getContinueLearningCourse,
} from '../data/user/get-enrolled-courses';
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
} from '@tabler/icons-react';
import { Award, CheckCircle, BookCopy, Rocket } from 'lucide-react';
import Link from 'next/link';
import { WelcomeToast } from './_components/WelcomeToast';
import { getLocale, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { Progress } from '@/components/ui/progress';
import { useLocale, useTranslations } from 'next-intl';


type ContinueLearningCourseType = Awaited<
  ReturnType<typeof getContinueLearningCourse>
>;

interface ContinueLearningCardProps {
  course: NonNullable<ContinueLearningCourseType>;
  nextLessonUrl: string;
  progress: number;
}

function ContinueLearningCard({
  course,
  nextLessonUrl,
  progress,
}: ContinueLearningCardProps) {
  const t = useTranslations('UserDashboardPage.learning');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const imageUrl = useConstructUrl(course.Course.fileKey);

  return (
    <Card className='from-primary/10 to-accent/10 border-primary/20 bg-gradient-to-tr'>
      <div className='grid md:grid-cols-2'>
        <CardContent className='flex flex-col justify-between p-6'>
          <div>
            <Badge variant='secondary' className='mb-4'>
              {t('continue')}
            </Badge>
            <h2 className='text-2xl font-bold'>{course.Course.title}</h2>
            <div className='mt-4 space-y-2'>
              <p className='text-sm font-medium'>{progress}% Complete</p>
              <Progress value={progress} className='h-2' />
            </div>
          </div>
          <Link
            href={nextLessonUrl}
            className={buttonVariants({
              size: 'lg',
              className: 'mt-6 w-full md:w-auto',
            })}
          >
            <IconPlayerPlay className={cn('size-5', isRTL ? 'ml-2' : 'mr-2')} />
            {t('continue')}
          </Link>
        </CardContent>
        <div className='relative hidden md:block'>
          <Image
            src={imageUrl}
            alt={course.Course.title}
            fill
            className='rounded-r-xl object-cover'
          />
        </div>
      </div>
    </Card>
  );
}

export default async function DashboardPage() {
  const [courses, enrolledCourses, continueLearningCourse, t, locale, user] =
    await Promise.all([
      getAllCourses(),
      getEnrolledCourses(),
      getContinueLearningCourse(),
      getTranslations('UserDashboardPage'),
      getLocale(),
      requireUser(),
    ]);

  const displayName = user?.name || user?.email.split('@')[0] || '';
  const isRTL = locale === 'ar';

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ Course: enrolled }) => enrolled.id === course.id,
      ),
  );

  if (enrolledCourses.length === 0) {
    return (
      <div
        className='flex flex-1 flex-col gap-8 p-4 pt-0'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className='mb-2 flex flex-col gap-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            {t('welcome.title', { username: displayName })}
          </h1>
          <p className='text-muted-foreground'>
            {t('newUser.welcomeDescription')}
          </p>
        </div>
        <Card className='flex-grow'>
          <CardContent className='flex h-full flex-col items-center justify-center p-8 text-center'>
            <Rocket className='text-primary mb-4 size-16' />
            <h2 className='mb-2 text-2xl font-bold'>{t('newUser.ctaTitle')}</h2>
            <p className='text-muted-foreground mb-6 max-w-sm'>
              {t('newUser.ctaDescription')}
            </p>
            <Link href='/courses' className={buttonVariants({ size: 'lg' })}>
              {t('newUser.ctaButton')}
            </Link>
          </CardContent>
        </Card>

        {availableCourses.length > 0 && (
          <div>
            <h3 className='mb-4 text-2xl font-bold'>
              {t('newUser.sampleCoursesTitle')}
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {availableCourses.slice(0, 3).map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  let completedCoursesCount = 0;
  enrolledCourses.forEach((enrollment) => {
    const totalLessons = enrollment.Course.chapter.reduce(
      (acc, chap) => acc + chap.lessons.length,
      0,
    );
    if (totalLessons === 0) return;
    const completedLessons = enrollment.Course.chapter.reduce(
      (acc, chap) =>
        acc +
        chap.lessons.filter((l) => l.lessonProgress.some((p) => p.completed))
          .length,
      0,
    );
    if (totalLessons === completedLessons) {
      completedCoursesCount++;
    }
  });
  const inProgressCoursesCount = enrolledCourses.length - completedCoursesCount;
  const certificatesEarned = completedCoursesCount;

  let nextLessonUrl = '#';
  let continueLearningProgress = 0;
  if (continueLearningCourse) {
    const allLessons = continueLearningCourse.Course.chapter.flatMap(
      (chap) => chap.lessons,
    );
    let nextLesson = allLessons[0];
    for (let i = 0; i < allLessons.length; i++) {
      const lesson = allLessons[i];
      if (!lesson.lessonProgress.some((p) => p.completed)) {
        nextLesson = lesson;
        break;
      }
    }
    nextLessonUrl = `/dashboard/${continueLearningCourse.Course.slug}/${nextLesson.id}`;
    const completedLessons = allLessons.filter((l) =>
      l.lessonProgress.some((p) => p.completed),
    ).length;
    continueLearningProgress =
      allLessons.length > 0
        ? Math.round((completedLessons / allLessons.length) * 100)
        : 0;
  }

  return (
    <div
      className='flex flex-1 flex-col gap-8 p-4 pt-0'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <WelcomeToast />
      <div className='mb-2 flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <Badge
            variant='secondary'
            className='bg-primary/10 text-primary border-primary/20'
          >
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
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {t('stats.completed')}
                </p>
                <p className='text-2xl font-bold'>{completedCoursesCount}</p>
              </div>
              <div className='rounded-lg bg-green-500/10 p-2'>
                <CheckCircle className='size-4 text-green-500' />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {t('stats.certificates')}
                </p>
                <p className='text-2xl font-bold'>{certificatesEarned}</p>
              </div>
              <div className='rounded-lg bg-yellow-500/10 p-2'>
                <Award className='size-4 text-yellow-500' />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {t('stats.inProgress')}
                </p>
                <p className='text-2xl font-bold'>{inProgressCoursesCount}</p>
              </div>
              <div className='rounded-lg bg-blue-500/10 p-2'>
                <BookCopy className='size-4 text-blue-500' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {continueLearningCourse && (
        <ContinueLearningCard
          course={continueLearningCourse}
          nextLessonUrl={nextLessonUrl}
          progress={continueLearningProgress}
        />
      )}

      <Card className='bg-card/50 border-border/50 mb-6 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <IconBook className='text-primary size-5' />
              <h3 className='text-lg font-semibold'>{t('myCourses.title')}</h3>
            </div>
            <Badge variant='secondary' className='bg-primary/10 text-primary'>
              {t('myCourses.enrolledBadge', { count: enrolledCourses.length })}
            </Badge>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} data={course} />
            ))}
          </div>
        </CardContent>
      </Card>

      {availableCourses.length > 0 && (
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <IconTrophy className='text-primary size-5' />
                <h3 className='text-lg font-semibold'>
                  {t('availableCourses.title')}
                </h3>
              </div>
              <Badge
                variant='secondary'
                className='bg-green-500/10 text-green-600'
              >
                {t('availableCourses.availableBadge', {
                  count: availableCourses.length,
                })}
              </Badge>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {availableCourses.slice(0, 3).map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
