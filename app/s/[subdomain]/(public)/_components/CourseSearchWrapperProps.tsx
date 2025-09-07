'use client';

import { useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PublicCourseType } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { PublicCourseCard } from '@/app/s/[subdomain]/(public)/_components/PublicCourseCard';
import { useLocale, useTranslations } from 'next-intl';

interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
}

export function CourseSearchWrapper({ courses }: CourseSearchWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations('CourseSearch');

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 300);

  return (
    <div className='space-y-8' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='mx-auto max-w-2xl'>
        <div className='relative'>
          {isPending ? (
            <Loader2 className='text-muted-foreground absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 transform animate-spin' />
          ) : (
            <Search className='text-muted-foreground absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 transform' />
          )}
          <Input
            placeholder={t('placeholder')}
            className='rounded-full py-6 ps-12 pe-4'
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className='text-center'>
        <p className='text-muted-foreground text-sm'>
          {t('resultsCount', { count: courses.length })}
        </p>
      </div>

      {courses.length === 0 && searchParams.get('q') ? (
        <div className='py-16 text-center'>
          <p className='text-muted-foreground'>
            {t('noResults', { query: searchParams.get('q') ?? '' })}
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
