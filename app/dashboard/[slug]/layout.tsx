import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
//todo: uncomment when getCourseSidebarData is implemented
// import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;

  // Server-side security check and lightweight data fetching
  //todo: uncomment when getCourseSidebarData is implemented
  // const course = await getCourseSidebarData(slug);
  const course = {
    course: {
      id: "",
      title: "",
      description: "",
      image: "",
      duration: "",
      price: "",
      rating: "",
      reviews: "",
      chapter: [
        {
          id: 1,
          position: 1,
          title: "Chapter Title",
          description: "Chapter Description",
          duration: "Chapter Duration",
          price: "Chapter Price",
          rating: "Chapter Rating",
          reviews: "Chapter Reviews",
          lessons: [
            {
              id: 1,
              title: "Lesson Title",
              position: 1,
              description: "Lesson Description",
              duration: "Lesson Duration",
              price: "Lesson Price",
              rating: "Lesson Rating",
              reviews: "Lesson Reviews",
              lessonProgress: [
                {
                  lessonId: 1,
                  completed: true,
                },
              ],
            },
          ],
        },
      ],
      instructor: {
        id: "",
        name: "",
        image: "",
        bio: "",
      },
      sections: [
        {
          id: "",
          title: "",
          description: "",
          duration: "",
          price: "",
          rating: "",
          reviews: "",
          lessons: [
            {
              id: "",
              title: "",
              description: "",
              duration: "",
              price: "",
              rating: "",
              reviews: "",
            },
          ],
        },
      ],
    },
  };
  return (
    <div className="flex flex-1">
      {/* sidebar - 30% */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={course.course} />
      </div>

      {/* Main Content - 70% */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
