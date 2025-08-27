import { getTranslations } from 'next-intl/server';
import { adminGetRecentCourses } from '../../data/admin/admin-get-recent-courses';
import { AdminCourseType } from '../../data/admin/admin-get-courses';
import { EmptyState } from '@/components/general/EmptyState';
import { AdminCourseCard, AdminCourseCardSkeleton } from '../courses/_components/AdminCourseCard';

export async function RecentCourses() {
  const t = await getTranslations('AdminIndexPage');
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        title={t('emptyState.title')}
        description={t('emptyState.description')}
        buttonText={t('emptyState.buttonText')}
        href='/admin/courses/create'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {data.map((course: AdminCourseType) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

export function RecentCoursesSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}