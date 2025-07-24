import { EmptyState } from '@/components/general/EmptyState';
import { getAllCourses } from '../data/course/get-all-courses';
import { getEnrolledCourses } from '../data/user/get-enrolled-courses';
import { PublicCourseCard } from '../(public)/_components/PublicCourseCard';
import { CourseProgressCard } from './_components/CourseProgressCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  IconBook,
  IconPlayerPlay,
  IconStar,
  IconTrophy,
  IconChartBar,
} from '@tabler/icons-react';
import { BookOpen, PlayCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const totalLessons = enrolledCourses.reduce(
    (total, enrollment) =>
      total +
      enrollment.Course.chapter.reduce(
        (chapterTotal, chapter) => chapterTotal + chapter.lessons.length,
        0,
      ),
    0,
  );

  const totalChapters = enrolledCourses.reduce(
    (total, enrollment) => total + enrollment.Course.chapter.length,
    0,
  );

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ Course: enrolled }) => enrolled.id === course.id,
      ),
  );

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      {/* Welcome Section */}
      <div className='mb-6 flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <Badge
            variant='secondary'
            className='bg-primary/10 text-primary border-primary/20'
          >
            <IconStar className='mr-1 size-3' />
            Dashboard
          </Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome back!</h1>
        <p className='text-muted-foreground'>
          Here&apos;s what&apos;s happening with your learning journey today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Enrolled Courses
                </p>
                <p className='text-2xl font-bold'>{enrolledCourses.length}</p>
              </div>
              <div className='bg-primary/10 rounded-lg p-2'>
                <BookOpen className='text-primary size-4' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Total Lessons
                </p>
                <p className='text-2xl font-bold'>{totalLessons}</p>
              </div>
              <div className='rounded-lg bg-green-500/10 p-2'>
                <PlayCircle className='size-4 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Total Chapters
                </p>
                <p className='text-2xl font-bold'>{totalChapters}</p>
              </div>
              <div className='rounded-lg bg-blue-500/10 p-2'>
                <TrendingUp className='size-4 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Learning */}
      <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='bg-card/50 border-border/50 backdrop-blur-sm md:col-span-4'>
          <CardContent className='p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconPlayerPlay className='text-primary size-5' />
              <h3 className='text-lg font-semibold'>Continue Learning</h3>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className='py-8 text-center'>
                <EmptyState
                  title='No courses enrolled'
                  description='Start your learning journey by enrolling in a course'
                  buttonText='Browse Courses'
                  href='/courses'
                />
              </div>
            ) : (
              <div className='space-y-4'>
                {enrolledCourses.slice(0, 3).map((course) => {
                  const courseLessons = course.Course.chapter.reduce(
                    (total, chapter) => total + chapter.lessons.length,
                    0,
                  );
                  return (
                    <div
                      key={course.Course.id}
                      className='hover:bg-accent/50 flex items-center gap-4 rounded-lg p-4 transition-colors'
                    >
                      <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
                        <IconBook className='text-primary size-5' />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium'>{course.Course.title}</h4>
                        <p className='text-muted-foreground text-sm'>
                          {courseLessons} lessons available
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium'>
                          {course.Course.chapter.length} chapters
                        </p>
                        <Link
                          className='text-muted-foreground text-xs transition hover:text-amber-700'
                          href={`/dashboard/${course.Course.slug}`}
                        >
                          Ready to start
                        </Link>
                        {/* <p className="text-xs text-muted-foreground">Ready to start</p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='bg-card/50 border-border/50 backdrop-blur-sm md:col-span-3'>
          <CardContent className='p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconChartBar className='text-primary size-5' />
              <h3 className='text-lg font-semibold'>Learning Stats</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>
                  Enrolled Courses
                </span>
                <span className='font-medium'>{enrolledCourses.length}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>
                  Available Courses
                </span>
                <span className='font-medium'>{availableCourses.length}</span>
              </div>

              <div className='space-y-3 pt-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary h-2 w-2 rounded-full' />
                    <span className='text-sm'>Total Lessons</span>
                  </div>
                  <span className='text-sm font-medium'>{totalLessons}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-2 rounded-full bg-blue-500' />
                    <span className='text-sm'>Total Chapters</span>
                  </div>
                  <span className='text-sm font-medium'>{totalChapters}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <Card className='bg-card/50 border-border/50 mb-6 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <IconBook className='text-primary size-5' />
              <h3 className='text-lg font-semibold'>My Courses</h3>
            </div>
            <Badge variant='secondary' className='bg-primary/10 text-primary'>
              {enrolledCourses.length} enrolled
            </Badge>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className='py-8 text-center'>
              <EmptyState
                title='Start Your Learning Journey'
                description="You haven't enrolled in any courses yet. Discover amazing courses to begin your learning adventure!"
                buttonText='Browse Courses'
                href='/courses'
              />
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {enrolledCourses.map((course) => (
                <CourseProgressCard key={course.Course.id} data={course} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <IconTrophy className='text-primary size-5' />
              <h3 className='text-lg font-semibold'>Available Courses</h3>
            </div>
            <Badge
              variant='secondary'
              className='bg-green-500/10 text-green-600'
            >
              {availableCourses.length} available
            </Badge>
          </div>

          {availableCourses.length === 0 ? (
            <div className='py-8 text-center'>
              <div className='mb-4 flex justify-center'>
                <div className='bg-primary/10 text-primary rounded-full p-4'>
                  <IconTrophy className='size-8' />
                </div>
              </div>
              <EmptyState
                title='🎉 Congratulations!'
                description="You've enrolled in all available courses! You're truly dedicated to learning."
                buttonText='Browse All Courses'
                href='/courses'
              />
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
