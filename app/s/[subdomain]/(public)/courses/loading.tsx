import { PublicCourseCardSkeleton } from '../_components/PublicCourseCard';

export default function Loading() {
  return (
    <div
      className='from-background via-secondary/10 to-background min-h-screen bg-gradient-to-b'
      aria-busy
    >
      <section className='px-6 py-16 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-12 flex flex-col items-center justify-center text-center'>
            <div className='bg-muted h-8 w-48 animate-pulse rounded-md' />
            <div className='bg-muted/70 mt-2 h-4 w-80 animate-pulse rounded-md' />
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <PublicCourseCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
