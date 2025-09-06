'use client';

import { useState, useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { getContactMessages } from '../../../data/admin/get-contact-messages';
import { markMessageAsRead } from '../actions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ContactMessage = Awaited<ReturnType<typeof getContactMessages>>[0];

export function MessagesClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePreview = (message: ContactMessage) => {
    setSelectedMessage(message);

    if (!message.isRead) {
      startTransition(async () => {
        const result = await markMessageAsRead(message.id);
        if (result.status === 'success') {
          // Optimistically update the UI
          setMessages((prevMessages) =>
            prevMessages.map((m) =>
              m.id === message.id ? { ...m, isRead: true } : m,
            ),
          );
        } else {
          toast.error("Could not mark message as read. Please try again.");
        }
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[20px]'></TableHead>
            <TableHead>Received</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id} className={cn(!msg.isRead && 'bg-muted/50')}>
              <TableCell>
                {!msg.isRead && (
                  <div className='h-2 w-2 rounded-full bg-blue-500' title="Unread"></div>
                )}
              </TableCell>
              <TableCell className={cn(!msg.isRead && 'font-bold')}>
                {format(new Date(msg.createdAt), 'PPP p')}
              </TableCell>
              <TableCell className={cn('font-medium', !msg.isRead && 'font-bold')}>{msg.name}</TableCell>
              <TableCell>
                <div>{msg.email}</div>
                <div className='text-muted-foreground text-xs'>{msg.phone}</div>
              </TableCell>
              <TableCell>{msg.role}</TableCell>
              <TableCell className='max-w-[200px] truncate'>{msg.message}</TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='icon' onClick={() => handlePreview(msg)}>
                  <Eye className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              Received on {selectedMessage && format(new Date(selectedMessage.createdAt), 'PPP p')}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <div className='text-sm font-medium text-muted-foreground'>Email</div>
              <div className='col-span-2 text-sm'>{selectedMessage?.email}</div>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <div className='text-sm font-medium text-muted-foreground'>Phone</div>
              <div className='col-span-2 text-sm'>{selectedMessage?.phone}</div>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <div className='text-sm font-medium text-muted-foreground'>Role</div>
              <div className='col-span-2 text-sm capitalize'>{selectedMessage?.role}</div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-sm font-medium text-muted-foreground'>Message</div>
              <div className='text-sm whitespace-pre-wrap rounded-md border p-3'>{selectedMessage?.message}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
