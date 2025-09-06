import { ReactNode } from 'react';
import { CourseSidebar } from '../_components/CourseSidebar';
import { getCourseSidebarData } from '@/app/s/[subdomain]/data/course/get-course-sidebar-data';

export const dynamic = 'force-dynamic';

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className='flex min-h-0 flex-1 flex-col sm:flex-row'>
      <div className='border-border max-h-screen w-full shrink-0 overflow-y-auto sm:sticky sm:top-0 sm:w-80 sm:border-r md:w-72 lg:w-80'>
        <CourseSidebar course={course.course} />
      </div>

      {/* Main Content */}
      <div className='min-w-0 flex-1 overflow-hidden p-4 sm:p-6 lg:p-8'>
        {children}
      </div>
    </div>
  );
}
