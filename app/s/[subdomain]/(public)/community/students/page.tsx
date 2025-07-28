import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Community | Sahla',
  description:
    'Connect with fellow learners, join study groups, and participate in discussions. The Sahla community is here to support your learning journey.',
};

export default function StudentCommunityPage() {
  return (
    <PlaceholderPage
      title='Student Community Hub'
      description='This feature is under construction. We are building a vibrant community space for you to connect with peers, join discussions, and enhance your learning experience.'
      badgeText='Coming Soon'
      icon={<Users className='mr-2 h-4 w-4' />}
    />
  );
}
