import { adminGetCourse } from '@/app/s/[subdomain]/data/admin/admin-get-course';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestBank } from './_components/TestBank';
import { EditCourseForm } from './_components/EditCourseForm';
import { CourseStructure } from './_components/CourseStructure';

import { checkPlanStatus } from '@/lib/subscription';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

import { getTranslations, getLocale } from 'next-intl/server';

interface EditRouteProps {
  params: Promise<{ courseId: string }>;
}

export default async function EditRoute({ params }: EditRouteProps) {
  const { courseId } = await params;
  const t = await getTranslations('EditCoursePage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const [data, planStatus] = await Promise.all([
    adminGetCourse(courseId),
    checkPlanStatus(),
  ]);

  const firstLesson = data.chapter[0]?.lessons[0];
  const previewUrl = firstLesson
    ? `/admin/lessons/${firstLesson.id}`
    : `/courses/${data.slug}`;

  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>
          {t.rich('header', {
            courseTitle: data.title,
            title: (chunks) => (
              <span className='text-primary underline'>{chunks}</span>
            ),
          })}
        </h1>
        <Link
          href={previewUrl}
          className={buttonVariants({ variant: 'outline' })}
        >
          <Eye className={isRTL ? 'ml-2 size-4' : 'mr-2 size-4'} />
          {t('previewButton')}
        </Link>
      </div>

      <Tabs
        defaultValue='basic-info'
        className='w-full'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='basic-info'>{t('tabs.basicInfo')}</TabsTrigger>
          <TabsTrigger value='course-structure'>
            {t('tabs.courseStructure')}
          </TabsTrigger>
          <TabsTrigger value='test-bank'>{t('tabs.testBank')}</TabsTrigger>
        </TabsList>

        <TabsContent value='basic-info'>
          <Card>
            <CardHeader>
              <CardTitle>{t('basicInfo.title')}</CardTitle>
              <CardDescription>{t('basicInfo.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='course-structure'>
          <Card>
            <CardHeader>
              <CardTitle>{t('courseStructure.title')}</CardTitle>
              <CardDescription>
                {t('courseStructure.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='test-bank'>
          <Card>
            <CardHeader>
              <CardTitle>{t('testBank.title')}</CardTitle>
              <CardDescription>{t('testBank.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <TestBank courseId={courseId} planName={planStatus.planName} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
