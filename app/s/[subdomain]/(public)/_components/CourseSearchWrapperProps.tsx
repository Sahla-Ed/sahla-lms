'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PublicCourseType } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { PublicCourseCard } from '@/app/s/[subdomain]/(public)/_components/PublicCourseCard';

interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
}

export function CourseSearchWrapper({ courses }: CourseSearchWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState<string>(
    searchParams.get('q')?.toString() ?? '',
  );

  useEffect(() => {
    setTerm(searchParams.get('q')?.toString() ?? '');
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className='space-y-8'>
      {/* Search Section */}
      <div className='mx-auto max-w-2xl'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform' />
          <Input
            placeholder='Search courses by title or category...'
            className='rounded-full py-6 pr-4 pl-12 ...'
            value={term}
            onChange={(e) => {
              const value = e.target.value;
              setTerm(value);
              handleSearch(value);
            }}
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
      {courses.length === 0 && searchParams.get('q') ? (
        <div className='py-16 text-center'>
          {/* No courses found message ... */}
          <p className='text-muted-foreground'>
            We couldn&apos;t find any courses matching &quot;
            {searchParams.get('q')}&quot;.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {courses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </div>
  );
}
