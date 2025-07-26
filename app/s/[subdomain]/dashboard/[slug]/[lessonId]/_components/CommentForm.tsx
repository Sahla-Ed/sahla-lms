'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addComment } from '../comment-actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CommentFormProps {
  lessonId: string;
  parentId?: string;
  onCommentAdded?: () => void;
}

export function CommentForm({
  lessonId,
  parentId,
  onCommentAdded,
}: CommentFormProps) {
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    startTransition(async () => {
      try {
        await addComment(lessonId, text, parentId || null);
        setText('');
        toast.success('Comment added!');
        onCommentAdded?.();
      } catch (error) {
        toast.error('Failed to add comment.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? 'Write a reply...' : 'Add a comment...'}
        rows={2}
        disabled={isPending}
      />
      <div className='flex justify-end'>
        <Button type='submit' disabled={isPending || !text.trim()}>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {parentId ? 'Post Reply' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
}
