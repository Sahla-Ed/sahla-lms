import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Sahla Admin',
  description:
    'A powerful, global search feature is coming soon to the Sahla admin dashboard.',
};

export default function SearchPage() {
  return (
    <PlaceholderPage
      title='Global Search'
      description="This feature is under development. We're building a powerful search experience that will allow you to instantly find courses, users, enrollments, and more across the entire platform."
      badgeText='Coming Soon'
      icon={<Search className='mr-2 h-4 w-4' />}
    />
  );
}
