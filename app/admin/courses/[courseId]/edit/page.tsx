import { adminGetCourse } from '@/app/data/admin/admin-get-course';
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
import { ManageInstructors } from './_components/ManageInstructors';
import { ManageAssistants } from './_components/ManageAssistants';

type Params = Promise<{ courseId: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);
  return (
    <div>
      <h1 className='mb-8 text-3xl font-bold'>
        Edit Course:{' '}
        <span className='text-primary underline'>{data.title}</span>
      </h1>

      <Tabs defaultValue='basic-info' className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>
          <TabsTrigger value='course-structure'>Course Structure</TabsTrigger>
          <TabsTrigger value='test-bank'>Test Bank</TabsTrigger>
          <TabsTrigger value='access-control'>Access Control</TabsTrigger>
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
        <TabsContent value='access-control'>
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Manage who has access to this course.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <ManageInstructors courseId={courseId} />
              <ManageAssistants courseId={courseId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
