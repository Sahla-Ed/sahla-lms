"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard } from "@/app/(public)/_components/PublicCourseCard";

interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
}

export function CourseSearchWrapper({ courses }: CourseSearchWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

 const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("q", term);
  } else {
    params.delete("q");
  }
  replace(`${pathname}?${params.toString()}`, { scroll: false }); 
}, 300);

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search courses by title or category..."
            className="pl-12 pr-4 py-6 rounded-full ..."
            defaultValue={searchParams.get("q")?.toString()} 
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results Section */}
      {courses.length === 0 && searchParams.get("q") ? (
        <div className="text-center py-16">
          {/* No courses found message ... */}
          <p className="text-muted-foreground">
            We couldn&apos;t find any courses matching &quot;{searchParams.get("q")}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </div>
  );
}