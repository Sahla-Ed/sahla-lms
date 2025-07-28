import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Mic } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become an Instructor | Sahla',
  description:
    'Share your knowledge with a global audience. Learn about the benefits and tools available to instructors on the Sahla platform.',
};

export default function InstructorProgramPage() {
  return (
    <PlaceholderPage
      title='Become an Instructor'
      description='This page is under construction. Our instructor portal will soon provide all the information and tools you need to create and sell your courses on Sahla.'
      badgeText='Coming Soon'
      icon={<Mic className='mr-2 h-4 w-4' />}
    />
  );
}
