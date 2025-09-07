import { getIndividualCourse } from '@/app/s/[subdomain]/data/course/get-course';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
  IconBook,
  IconCategory,
  IconChevronDown,
  IconPlayerPlay,
  IconStar,
  IconDownload,
  IconCertificate,
  IconInfinity,
} from '@tabler/icons-react';
import { Clock, BarChart3, BookOpen } from 'lucide-react';
import { checkIfCourseBought } from '@/app/s/[subdomain]/data/user/user-is-enrolled';
import { EnrollmentButton } from './_components/EnrollmentButton';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { constructUrl } from '@/hooks/use-construct-url';
import { getUserRole } from '@/lib/get-user-session';
import { Player } from '@/components/player/player';
import { getLocale, getTranslations } from 'next-intl/server';
import { LessonItemForPublic } from './_components/LessonItemForPublic';
import Image from 'next/image';

type PageParams = Promise<{ slug: string }>;

type MetadataParams = {
  params: PageParams;
};

export async function generateMetadata({
  params,
}: MetadataParams): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getIndividualCourse(resolvedParams.slug);

  return {
    title: course.title,
    description: course.smallDescription,
  };
}

export default async function SlugPage({ params }: { params: PageParams }) {
  const { slug } = await params;

  const [course, userRole, isEnrolled, t, tEnums, locale] = await Promise.all([
    getIndividualCourse(slug),
    getUserRole(),
    checkIfCourseBought(slug),
    getTranslations('CourseSlugPage'),
    getTranslations('CourseEnums'),
    getLocale(),
  ]);

  const isRTL = locale === 'ar';

  const totalLessons = course.chapter.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0,
  );

  const isAdmin = userRole === 'admin';
  const canAccessCourseContent = isEnrolled || isAdmin;

  const features = [
    { icon: IconInfinity, text: t('lifetimeAccess'), highlight: true },
    { icon: IconDownload, text: t('downloadableResources') },
    { icon: IconCertificate, text: t('certificate') },
  ];

  return (
    <div
      className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='relative overflow-hidden'>
        <div className='from-primary/5 to-primary/5 absolute inset-0 bg-gradient-to-r via-transparent'></div>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
            <div className='lg:col-span-8'>
              <div className='group shadow-primary/10 border-border/50 relative aspect-video w-full overflow-hidden rounded-2xl border shadow-2xl'>
                {course.videoKey ? (
                  <Player
                    src={constructUrl(course.videoKey)}
                    coverSrc={constructUrl(course.fileKey!)}
                    coverAlt={course.title + ' cover'}
                  />
                ) : (
                  <Image
                    src={constructUrl(course.fileKey!)}
                    alt={course.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                    priority
                  />
                )}
              </div>
              {/* <Image
                    src={constructUrl(course.fileKey!)}
                    alt={course.title}
                    fill
                    className='object-cover ...'
                    priority
                  /> */}
              <div className='mt-8 lg:hidden'>
                <Card className='border-border/50 bg-card/80 shadow-primary/10 overflow-hidden shadow-2xl backdrop-blur-sm'>
                  <CardContent className='p-0'>
                    <div className='from-primary/10 to-primary/5 border-border/50 border-b bg-gradient-to-r p-6'>
                      <div className='text-center'>
                        <p className='text-muted-foreground mb-2 text-sm font-medium'>
                          {t('coursePrice')}
                        </p>
                        <div className='flex items-center justify-center gap-2'>
                          <span className='text-primary text-4xl font-bold'>
                            {new Intl.NumberFormat(locale, {
                              style: 'currency',
                              currency: 'USD',
                            }).format(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-6 p-6'>
                      <div className='space-y-4'>
                        <h4 className='text-lg font-semibold'>
                          {t('includes')}
                        </h4>
                        <div className='grid gap-3'>
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className={cn(
                                'flex items-center gap-3 rounded-lg p-3 transition-all duration-200',
                                feature.highlight
                                  ? 'bg-primary/5 border-primary/20 border'
                                  : 'hover:bg-muted/50',
                              )}
                            >
                              <div
                                className={cn(
                                  'rounded-lg p-2',
                                  feature.highlight
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-muted text-muted-foreground',
                                )}
                              >
                                <feature.icon className='size-4' />
                              </div>
                              <span className='text-sm font-medium'>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-muted/50 rounded-lg p-4 text-center'>
                          <div className='text-primary text-2xl font-bold'>
                            {course.duration}
                          </div>
                          <div className='text-muted-foreground text-xs'>
                            {t('hours')}
                          </div>
                        </div>
                        <div className='bg-muted/50 rounded-lg p-4 text-center'>
                          <div className='text-primary text-2xl font-bold'>
                            {totalLessons}
                          </div>
                          <div className='text-muted-foreground text-xs'>
                            {t('lessons')}
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <EnrollmentButton
                          courseId={course.id}
                          courseSlug={course.slug}
                          isEnrolled={isEnrolled}
                          isAdmin={isAdmin}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='mt-8 space-y-6'>
                <div className='space-y-4'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <Badge
                      variant='secondary'
                      className='bg-primary/10 text-primary border-primary/20'
                    >
                      <IconStar className='me-1 size-3' />
                      {t('featuredCourse')}
                    </Badge>
                  </div>
                  <h1 className='from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-5xl'>
                    {course.title}
                  </h1>
                  <p className='text-muted-foreground max-w-3xl text-xl leading-relaxed'>
                    {course.smallDescription}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <div className='group bg-card/50 border-border/50 rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary group-hover:bg-primary/20 rounded-lg p-2 transition-colors'>
                        <BarChart3 className='size-5' />
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm font-medium'>
                          {t('level')}
                        </p>
                        <p className='font-semibold'>
                          {tEnums(`levels.${course.level}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='group bg-card/50 border-border/50 rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary group-hover:bg-primary/20 rounded-lg p-2 transition-colors'>
                        <Clock className='size-5' />
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm font-medium'>
                          {t('duration')}
                        </p>
                        <p className='font-semibold'>
                          {course.duration}
                          {t('hours')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='group bg-card/50 border-border/50 rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary group-hover:bg-primary/20 rounded-lg p-2 transition-colors'>
                        <BookOpen className='size-5' />
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm font-medium'>
                          {t('lessons')}
                        </p>
                        <p className='font-semibold'>{totalLessons}</p>
                      </div>
                    </div>
                  </div>
                  <div className='group bg-card/50 border-border/50 rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary group-hover:bg-primary/20 rounded-lg p-2 transition-colors'>
                        <IconCategory className='size-5' />
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm font-medium'>
                          {t('category')}
                        </p>
                        <p className='font-semibold'>
                          {tEnums(`categories.${course.category}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className='my-12' />
              <div className='space-y-6'>
                <div className='flex items-center gap-3'>
                  <div className='bg-primary/10 text-primary rounded-xl p-3'>
                    <IconBook className='size-6' />
                  </div>
                  <h2 className='text-3xl font-bold tracking-tight'>
                    {t('whatYouWillLearn')}
                  </h2>
                </div>
                <Card className='bg-card/50 border-border/50 p-6 backdrop-blur-sm'>
                  <RenderDescription json={JSON.parse(course.description)} />
                </Card>
              </div>
              <div className='mt-16 space-y-8'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-primary/10 text-primary rounded-xl p-3'>
                      <IconPlayerPlay className='size-6' />
                    </div>
                    <div>
                      <h2 className='text-3xl font-bold tracking-tight'>
                        {t('courseContent')}
                      </h2>
                      <p className='text-muted-foreground'>
                        {course.chapter.length} {t('chapters')} • {totalLessons}{' '}
                        {totalLessons === 1 ? t('lesson') : t('lessonsPlural')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  {course.chapter.map((chapter, index) => (
                    <Collapsible key={chapter.id} defaultOpen={index < 2}>
                      <Card className='group border-border/50 bg-card/50 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
                        <CollapsibleTrigger className='w-full'>
                          <CardContent className='hover:bg-muted/30 p-6 transition-all duration-300'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-4'>
                                <div className='from-primary/20 to-primary/10 text-primary border-primary/20 flex size-12 items-center justify-center rounded-full border-2 bg-gradient-to-r text-lg font-bold'>
                                  {index + 1}
                                </div>
                                <div className='text-left'>
                                  <h3 className='mb-1 text-xl font-bold'>
                                    {chapter.title}
                                  </h3>
                                  <p className='text-muted-foreground text-sm'>
                                    {chapter.lessons.length}{' '}
                                    {chapter.lessons.length === 1
                                      ? t('lesson')
                                      : t('lessonsPlural')}
                                  </p>
                                </div>
                              </div>
                              <div className='flex items-center gap-3'>
                                <Badge
                                  variant='secondary'
                                  className='bg-primary/10 text-primary'
                                >
                                  {chapter.lessons.length}{' '}
                                  {chapter.lessons.length === 1
                                    ? t('lesson')
                                    : t('lessonsPlural')}
                                </Badge>
                                <IconChevronDown className='text-muted-foreground group-hover:text-primary size-5 transition-colors' />
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className='bg-muted/10 border-t backdrop-blur-sm'>
                            <div className='space-y-2 p-6 pt-4'>
                              {chapter.lessons.map((lesson, lessonIndex) => (
                                <LessonItemForPublic
                                  key={lesson.id}
                                  lesson={lesson}
                                  chapterIndex={index}
                                  lessonIndex={lessonIndex}
                                  canAccess={canAccessCourseContent}
                                  courseSlug={course.slug}
                                />
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
            <div className='hidden lg:col-span-4 lg:block'>
              <div className='sticky top-8'>
                <Card className='border-border/50 bg-card/80 shadow-primary/10 overflow-hidden shadow-2xl backdrop-blur-sm'>
                  <CardContent className='p-0'>
                    <div className='from-primary/10 to-primary/5 border-border/50 border-b bg-gradient-to-r p-6'>
                      <div className='text-center'>
                        <p className='text-muted-foreground mb-2 text-sm font-medium'>
                          {t('coursePrice')}
                        </p>
                        <div className='flex items-center justify-center gap-2'>
                          <span className='text-primary text-4xl font-bold'>
                            {new Intl.NumberFormat(locale, {
                              style: 'currency',
                              currency: 'USD',
                            }).format(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-6 p-6'>
                      <div className='space-y-4'>
                        <h4 className='text-lg font-semibold'>
                          {t('includes')}
                        </h4>
                        <div className='grid gap-3'>
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className={cn(
                                'flex items-center gap-3 rounded-lg p-3 transition-all duration-200',
                                feature.highlight
                                  ? 'bg-primary/5 border-primary/20 border'
                                  : 'hover:bg-muted/50',
                              )}
                            >
                              <div
                                className={cn(
                                  'rounded-lg p-2',
                                  feature.highlight
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-muted text-muted-foreground',
                                )}
                              >
                                <feature.icon className='size-4' />
                              </div>
                              <span className='text-sm font-medium'>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-muted/50 rounded-lg p-4 text-center'>
                          <div className='text-primary text-2xl font-bold'>
                            {course.duration}
                          </div>
                          <div className='text-muted-foreground text-xs'>
                            {t('hours')}
                          </div>
                        </div>
                        <div className='bg-muted/50 rounded-lg p-4 text-center'>
                          <div className='text-primary text-2xl font-bold'>
                            {totalLessons}
                          </div>
                          <div className='text-muted-foreground text-xs'>
                            {t('lessons')}
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <EnrollmentButton
                          courseId={course.id}
                          courseSlug={course.slug}
                          isEnrolled={isEnrolled}
                          isAdmin={isAdmin}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
