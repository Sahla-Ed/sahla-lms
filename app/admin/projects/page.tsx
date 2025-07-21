import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { FolderKanban } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Sahla Admin',
};

export default function ProjectsPage() {
  return (
    <PlaceholderPage
      title='Course Projects Review'
      description='This feature is under construction...'
      badgeText='Under Construction'
      icon={<FolderKanban className='mr-2 h-4 w-4' />}
    />
  );
}
