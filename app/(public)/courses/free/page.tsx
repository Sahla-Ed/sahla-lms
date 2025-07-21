import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Courses | Sahla',
  description:
    'Explore a selection of free courses on Sahla to kickstart your learning journey in various fields without any cost.',
};

export default function FreeCoursesPage() {
  return (
    <PlaceholderPage
      title='Free Courses'
      description='This page is under construction. We are curating a selection of high-quality introductory courses that will be available completely free of charge.'
      badgeText='Coming Soon'
      icon={<Sparkles className='mr-2 h-4 w-4' />}
    />
  );
}
