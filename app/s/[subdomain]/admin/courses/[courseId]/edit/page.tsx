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
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

interface EditRouteProps {
  params: Promise<{ courseId: string }>;
}

export default async function EditRoute({ params }: EditRouteProps) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);

  const firstLesson = data.chapter[0]?.lessons[0];
  const previewUrl = firstLesson
    ? `/admin/lessons/${firstLesson.id}`
    : `/courses/${data.slug}`;

  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>
          Edit Course:{' '}
          <span className='text-primary underline'>{data.title}</span>
        </h1>
        <Link
          href={previewUrl}
          className={buttonVariants({ variant: 'outline' })}
        >
          <Eye className='mr-2 size-4' />
          Preview & Moderate
        </Link>
      </div>

      <Tabs defaultValue='basic-info' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>
          <TabsTrigger value='course-structure'>Course Structure</TabsTrigger>
          <TabsTrigger value='test-bank'>Test Bank</TabsTrigger>
        </TabsList>

        <TabsContent value='basic-info'>
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='course-structure'>
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can update your Course Structure
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
              <CardTitle>Test Bank</CardTitle>
              <CardDescription>
                Manage the questions for this course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestBank courseId={courseId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
