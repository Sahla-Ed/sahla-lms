import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Group } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Groups | Sahla',
  description:
    'Form or join study groups to collaborate with other learners. Enhance your understanding and stay motivated together.',
};

export default function StudyGroupsPage() {
  return (
    <PlaceholderPage
      title='Study Groups'
      description="This feature is under construction. Soon you'll be able to form and join study groups to collaborate on courses, projects, and assignments with your peers."
      badgeText='Coming Soon'
      icon={<Group className='mr-2 h-4 w-4' />}
    />
  );
}
