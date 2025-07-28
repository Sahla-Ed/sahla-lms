import { PlaceholderPage } from '@/components/general/PlaceholderPage';
import { MessageSquare } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Chat | Sahla',
  description:
    'Chat with a Sahla support representative in real-time for immediate assistance with your questions.',
};

export default function LiveChatPage() {
  return (
    <PlaceholderPage
      title='Live Chat Support'
      description="This feature is under construction. Soon, you'll be able to connect with our support team instantly via live chat for real-time assistance."
      badgeText='Coming Soon'
      icon={<MessageSquare className='mr-2 h-4 w-4' />}
    />
  );
}
