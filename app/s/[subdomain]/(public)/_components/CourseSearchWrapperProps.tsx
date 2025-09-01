'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PublicCourseType } from '@/app/s/[subdomain]/data/course/get-all-courses';
import { PublicCourseCard } from '@/app/s/[subdomain]/(public)/_components/PublicCourseCard';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

// 1. تبسيط الـ props: لم نعد بحاجة لتمرير الترجمات
interface CourseSearchWrapperProps {
  courses: PublicCourseType[];
  isAdmin: boolean;
}

export function CourseSearchWrapper({ courses, isAdmin }: CourseSearchWrapperProps) {
  // 2. استدعاء hooks الترجمة مباشرة هنا
  const t = useTranslations('PublicCourseCard');
  const tEnums = useTranslations('CourseEnums');
  const tSearch = useTranslations('CourseSearch');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  // بقية الـ hooks تبقى كما هي
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
      <div className='mx-auto max-w-2xl' dir={isRTL ? 'rtl' : 'ltr'}>
        <div className='relative'>
          <Search className={cn('text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2 transform', isRTL ? 'right-4' : 'left-4')} />
          <Input
            placeholder={tSearch('placeholder')}
            className={cn('rounded-full py-6', isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4')}
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className='text-center'>
        <p className='text-muted-foreground text-sm'>
          {tSearch('resultsCount', { count: courses.length })}
        </p>
      </div>

      {/* Results Section */}
      {courses.length === 0 && searchQuery ? ( // <-- استخدام المتغير الجديد
        <div className='py-16 text-center'>
          <p className='text-muted-foreground'>
            {/* --- الحل هنا: إضافة || '' لضمان أنها دائمًا string --- */}
            {tSearch('noResults', { query: searchQuery || '' })}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {courses.map((course) => {
            const courseTranslations = {
              alt: t('alt'),
              hours: t('hours'),
              level: tEnums(`levels.${course.level}`),
              category: tEnums(`categories.${course.category}`),
              buttonText: isAdmin ? t('buttons.manageCourse') : t('buttons.startLearning'),
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
