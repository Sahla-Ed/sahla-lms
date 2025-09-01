'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PublicCourseType } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { PublicCourseCard } from '@/app/s/[subdomain]/(public)/_components/PublicCourseCard';

interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
  isAdmin: boolean;
}

export function CourseSearchWrapper({ courses, isAdmin }: CourseSearchWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const searchQuery = searchParams.get('q');

  return (
    <div className='space-y-8'>
      {/* Search Section */}
      <div className='mx-auto max-w-2xl'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform' />
          <Input
            placeholder="Search courses by title or category..."
            className='rounded-full py-6 pl-12 pr-4'
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className='text-center'>
        <p className='text-muted-foreground text-sm'>
          Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results Section */}
      {courses.length === 0 && searchQuery ? (
        <div className='py-16 text-center'>
          <p className='text-muted-foreground'>
            We couldn&apos;t find any courses matching &quot;{searchQuery || ''}&quot;.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {courses.map((course) => {
            const courseTranslations = {
              alt: `${course.title} course thumbnail`,
              hours: ' hours',
              level: course.level,
              category: course.category,
              buttonText: isAdmin ? 'Manage Course' : 'Start Learning',
              buttonHref: isAdmin ? `/admin/courses/${course.id}/edit` : `/courses/${course.slug}`,
            };
            return (
              <PublicCourseCard 
                key={course.id} 
                data={course} 
                translations={courseTranslations}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
