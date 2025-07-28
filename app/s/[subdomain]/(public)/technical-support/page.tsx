import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { Wrench } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Support | Sahla',
  description:
    'Get technical assistance with the Sahla platform. Our team is ready to help you with any issues you encounter.',
};

export default function TechnicalSupportPage() {
  return (
    <PlaceholderPage
      title='Technical Support'
      description='This page is under construction. Our dedicated technical support portal will be available soon to help you resolve any platform-related issues.'
      badgeText='Coming Soon'
      icon={<Wrench className='mr-2 h-4 w-4' />}
    />
  );
}
