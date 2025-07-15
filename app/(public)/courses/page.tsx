
import {
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { Suspense } from "react";
import { CourseSearchWrapper } from "../_components/CourseSearchWrapperProps";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Explore Top Online Courses in Tech, Design, and Business | Sahla",
  description: "Start your learning journey with Sahla. Browse expertly curated online courses in programming, design, business, and more – designed to boost your skills and career.",
};

export const dynamic = "force-dynamic";

export default function PublicCoursesroute({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-primary/5 rounded-full animate-bounce" />
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-primary/10 rounded-full animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Explore Our Courses
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
              Learning Adventure
            </span>
          </h1>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Dive into our carefully curated collection of courses designed by industry experts. 
            Transform your skills and unlock new opportunities in today&apos;s digital world.
          </p>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Featured Courses
            </h2>
            <p className="text-muted-foreground">
              Start your learning journey with our most popular courses
            </p>
          </div>

          <Suspense fallback={<LoadingSkeletonLayout />}>
              <RenderCourses searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}


async function RenderCourses({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const courses = await getAllCourses({
    q: searchParams?.q,
    category: searchParams?.category,
  });

  return <CourseSearchWrapper courses={courses} />;
}


function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}