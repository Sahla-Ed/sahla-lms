import { Metadata } from 'next';

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectList } from './_components/ProjectList';
import { NewProjectButton } from './_components/NewProjectButton';

export const metadata: Metadata = {
  title: 'Projects | Sahla Admin',
};

export default function ProjectsPage() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Projects</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your projects.
          </p>
        </div>
        <NewProjectButton />
      </div>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(3)].map((_, i) => (
        <div key={i} className='flex flex-col space-y-3'>
          <Skeleton className='h-[125px] w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      ))}
    </div>
  );
}
