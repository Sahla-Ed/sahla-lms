//todo: uncomment when getLessonContent is implemented
// import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "./_components/CourseContent";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";

type Params = Promise<{ lessonId: string }>;

export default async function LessonContentPage({
  params,
}: {
  params: Params;
}) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  //todo: uncomment when getLessonContent is implemented, remove dummy data
  // const data = await getLessonContent(lessonId);
  //dummy data
  const data = {
    id: lessonId,
    title: "Lesson Title",
    description: "Lesson Description",
    content: "Lesson Content",
    Chapter: {
      id: "chapter-id",
      Course: {
        id: "course-id",
        slug: "course-slug",
      },
    },
    thumbnailKey: "thumbnail-key",
    videoKey: "video-key",
    lessonProgress: [{ id: "progress-id", status: "completed" }],
    completed: false,
  };
  return <CourseContent data={data} />;
}
