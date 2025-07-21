import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Certificates | Sahla',
  description:
    'View and download all the certificates you have earned by completing courses on Sahla. Showcase your achievements to the world.',
};

export default function CertificatesPage() {
  return (
    <PlaceholderPage
      title='Your Certificates'
      description="This page is under construction. Soon, you'll be able to view, manage, and share all the certificates you've earned on the Sahla platform."
      badgeText='Coming Soon'
      icon={<Award className='mr-2 h-4 w-4' />}
    />
  );
}
