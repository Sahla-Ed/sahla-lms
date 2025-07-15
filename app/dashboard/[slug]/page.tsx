//todo: uncomment when getCourseSidebarData is implemented
// import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface iAppProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseSlugRoute({ params }: iAppProps) {
  const { slug } = await params;

  //todo: uncomment when getCourseSidebarData is implemented, remove dummy data
  // const course = await getCourseSidebarData(slug);
  //dummy data
  const course = {
    course: {
      id: "",
      title: "",
      description: "",
      chapter: [
        {
          id: "",
          title: "",
          lessons: [
            {
              id: "",
              title: "",
              description: "",
              duration: "",
              videoUrl: "",
              slidesUrl: "",
              quizUrl: "",
              status: "",
              createdAt: "",
              updatedAt: "",
            },
          ],
        },
      ],
    },
  };

  const firstChapter = course.course.chapter[0];
  const firstLesson = firstChapter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className="flex items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-2">No lessons available</h2>
      <p className="text-muted-foreground">
        This course does not have any lessons yet!
      </p>
    </div>
  );
}
