'use client';

import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PublicCourseCard } from './PublicCourseCard';
import { toast } from 'sonner';

// Replicating the type locally
type PublicCourseType = {
  id: string;
  title: string;
  price: number;
  smallDescription: string;
  slug: string;
  fileKey: string | null;
  level: string;
  duration: number;
  category: string;
};

interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
}

export function CourseSearchWrapper({ courses }: CourseSearchWrapperProps) {
  const searchParams = useSearchParams();

  // Mocking search functionality for preview
  const handleSearch = useDebouncedCallback((term: string) => {
    toast.info(`Searching for: "${term}" (Preview mode)`);
  }, 300);

  // Filter courses based on a mock search param if needed for visual testing
  const filteredCourses =
    searchParams.get('q')
      ? courses.filter(course =>
          course.title.toLowerCase().includes(searchParams.get('q')!.toLowerCase())
        )
      : courses;


  return (
    <div className='space-y-8'>
      {/* Search Section */}
      <div className='mx-auto max-w-2xl'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform' />
          <Input
            placeholder='Search courses by title or category...'
            className='rounded-full py-6 pr-4 pl-12 ...'
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className='text-center'>
        <p className='text-muted-foreground text-sm'>
          Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results Section */}
      {filteredCourses.length === 0 && searchParams.get('q') ? (
        <div className='py-16 text-center'>
          {/* No courses found message ... */}
          <p className='text-muted-foreground'>
            We couldn't find any courses matching "
            {searchParams.get('q')}".
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredCourses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </div>
  );
}
