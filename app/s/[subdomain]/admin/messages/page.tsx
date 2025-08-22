import { getContactMessages } from '../../data/admin/get-contact-messages';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EmptyState } from '@/components/general/EmptyState';
import { Mail } from 'lucide-react';
import { MessagesClient } from './_components/MessagesClient';

export default async function MessagesPage() {
  const initialMessages = await getContactMessages();

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Contact Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Here are the messages submitted through your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {initialMessages.length === 0 ? (
            <div className='py-8'>
              <EmptyState
                title='No Messages Yet'
                description='Your inbox is empty. Messages from your contact page will appear here.'
                icon={<Mail className='text-primary size-10' />}
              />
            </div>
          ) : (
            <MessagesClient initialMessages={initialMessages} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
