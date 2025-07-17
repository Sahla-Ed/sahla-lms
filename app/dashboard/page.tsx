import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  IconBook, 
  IconPlayerPlay, 
  IconStar, 
  IconTrophy, 
  IconChartBar,
} from "@tabler/icons-react";
import { BookOpen, PlayCircle,TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);


  const totalLessons = enrolledCourses.reduce(
    (total, enrollment) => total + enrollment.Course.chapter.reduce(
      (chapterTotal, chapter) => chapterTotal + chapter.lessons.length,
      0
    ),
    0
  );


  const totalChapters = enrolledCourses.reduce(
    (total, enrollment) => total + enrollment.Course.chapter.length,
    0
  );


  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ Course: enrolled }) => enrolled.id === course.id
      )
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <IconStar className="size-3 mr-1" />
            Dashboard
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your learning journey today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Enrolled Courses
                </p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="size-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Lessons
                </p>
                <p className="text-2xl font-bold">{totalLessons}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <PlayCircle className="size-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Chapters
                </p>
                <p className="text-2xl font-bold">{totalChapters}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="size-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Learning */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="md:col-span-4 bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IconPlayerPlay className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Continue Learning</h3>
            </div>
            
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-8">
                <EmptyState
                  title="No courses enrolled"
                  description="Start your learning journey by enrolling in a course"
                  buttonText="Browse Courses"
                  href="/courses"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => {
                  const courseLessons = course.Course.chapter.reduce(
                    (total, chapter) => total + chapter.lessons.length,
                    0
                  );
                  return (
                    <div key={course.Course.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconBook className="size-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.Course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {courseLessons} lessons available
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{course.Course.chapter.length} chapters</p>
                        <p className="text-xs text-muted-foreground">Ready to start</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IconChartBar className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Learning Stats</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Enrolled Courses</span>
                <span className="font-medium">{enrolledCourses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Courses</span>
                <span className="font-medium">{availableCourses.length}</span>
              </div>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">Total Lessons</span>
                  </div>
                  <span className="text-sm font-medium">{totalLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Total Chapters</span>
                  </div>
                  <span className="text-sm font-medium">{totalChapters}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <IconBook className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">My Courses</h3>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {enrolledCourses.length} enrolled
            </Badge>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <EmptyState
                title="Start Your Learning Journey"
                description="You haven't enrolled in any courses yet. Discover amazing courses to begin your learning adventure!"
                buttonText="Browse Courses"
                href="/courses"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((course) => (
                <CourseProgressCard key={course.Course.id} data={course} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <IconTrophy className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Available Courses</h3>
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
              {availableCourses.length} available
            </Badge>
          </div>

          {availableCourses.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <IconTrophy className="size-8" />
                </div>
              </div>
              <EmptyState
                title="🎉 Congratulations!"
                description="You've enrolled in all available courses! You're truly dedicated to learning."
                buttonText="Browse All Courses"
                href="/courses"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCourses.slice(0, 6).map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
