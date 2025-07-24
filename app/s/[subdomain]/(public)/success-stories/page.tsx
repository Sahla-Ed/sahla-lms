import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Trophy } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories | Sahla',
  description:
    'Read inspiring stories from students who have transformed their careers and lives with courses from Sahla.',
};

export default function SuccessStoriesPage() {
  return (
    <PlaceholderPage
      title='Success Stories'
      description='This page is under construction. We will soon feature inspiring stories from our students who have achieved their goals with the help of our platform.'
      badgeText='Coming Soon'
      icon={<Trophy className='mr-2 h-4 w-4' />}
    />
  );
}
