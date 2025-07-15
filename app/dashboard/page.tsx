import { EmptyState } from "@/components/general/EmptyState";
//todo: import getAllCourses
//todo: import getEnrolledCourses
//todo: import PublicCourseCard


import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function DashboardPage() {
  // todo: uncomment when implemented, remove dummy Courses
  // const [courses, enrolledCourses] = await Promise.all([
  //   getAllCourses(),
  //   getEnrolledCourses(),

  // ]);
  // dummy Courses
  const [courses, enrolledCourses] = [
    [
      {
        id: 1,
        title: "Course Title 1",
        description: "Course Description",
      },
      {
        id: 2,
        title: "Course Title 2",
        description: "Course Description 2",
      },
    ],
    [
      {
        Course: {
          id: 2,
          title: "Course Title 3",
          description: "Course Description 3",
        },
      },
      {
        Course: {
          id: 3,
          title: "Course Title 4",
          description: "Course Description 4",
        },
      },
    ],
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You haven't purchased any courses yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id,
            ),

        ).length === 0 ? (
          <EmptyState
            title="No courses available"
            description="You have already purchased all available courses."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id,
                  ),

              )
              .map((course) => (
                // todo: uncomment if PublicCourseCard is implemented
                // <PublicCourseCard key={course.id} data={course} />
                <div key={course.id} className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
