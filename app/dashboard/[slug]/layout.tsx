import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-col sm:flex-row flex-1 min-h-0">
      <div className="
        w-full sm:w-80 md:w-72 lg:w-80
        sm:border-r border-border 
        shrink-0
        overflow-y-auto
        max-h-screen
        sm:sticky sm:top-0
      ">
        <CourseSidebar course={course.course} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}