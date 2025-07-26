'use client';

import { PublicCourseCardSkeleton } from './PublicCourseCard';
import { CourseSearchWrapper } from './CourseSearchWrapper';

// Define the type locally for dummy data
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


// Static dummy data
const dummyCourses: PublicCourseType[] = [
  {
    id: '1',
    title: 'Advanced TypeScript Mastery',
    price: 99,
    smallDescription: 'Master TypeScript generics, decorators, and advanced patterns to write more robust and scalable code.',
    slug: 'advanced-typescript',
    fileKey: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    level: 'Advanced',
    duration: 20,
    category: 'Development',
  },
  {
    id: '2',
    title: 'The Ultimate React Design Patterns',
    price: 79,
    smallDescription: 'Learn modern design patterns in React to build highly scalable and maintainable applications.',
    slug: 'react-design-patterns',
    fileKey: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    level: 'Intermediate',
    duration: 15,
    category: 'Development',
  },
  {
    id: '3',
    title: 'Introduction to UI/UX Design',
    price: 49,
    smallDescription: 'A comprehensive guide for beginners to understand the fundamentals of UI/UX design.',
    slug: 'intro-to-ui-ux',
    fileKey: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=800&auto=format&fit=crop',
    level: 'Beginner',
    duration: 10,
    category: 'Design',
  },
];


export default function CoursesPreview() {
  return (
    <div className='from-background via-secondary/10 to-background min-h-screen bg-gradient-to-b'>
      {/* Hero Section */}
      <section className='from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden bg-gradient-to-r px-6 py-20 md:px-8'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='bg-primary/10 absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full' />
          <div className='bg-primary/5 absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full' />
          <div className='bg-primary/10 absolute bottom-20 left-1/3 h-12 w-12 animate-pulse rounded-full' />
        </div>

        <div className='relative mx-auto max-w-7xl text-center'>
          <div className='bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm'>
            <span className='bg-primary mr-2 h-2 w-2 animate-pulse rounded-full'></span>
            Explore Our Courses
          </div>

          <h1 className='mb-6 text-4xl leading-tight font-light tracking-tight md:text-6xl lg:text-7xl'>
            Discover Your Next
            <span className='from-primary to-primary/80 block bg-gradient-to-r bg-clip-text font-semibold text-transparent'>
              Learning Adventure
            </span>
          </h1>

          <div className='via-primary mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent to-transparent' />

          <p className='text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl'>
            Dive into our carefully curated collection of courses designed by
            industry experts. Transform your skills and unlock new opportunities
            in today's digital world.
          </p>
        </div>
      </section>

      <section className='px-6 py-16 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-12 flex flex-col items-center justify-center text-center'>
            <h2 className='mb-2 text-3xl font-bold tracking-tight md:text-4xl'>
              Featured Courses
            </h2>
            <p className='text-muted-foreground'>
              Start your learning journey with our most popular courses
            </p>
          </div>
            <CourseSearchWrapper courses={dummyCourses} />
        </div>
      </section>
    </div>
  );
}
