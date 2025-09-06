'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addComment } from '../comment-actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

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
  const t = useTranslations('AdminLessonPreview.comments.form');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    startTransition(async () => {
      try {
        await addComment(lessonId, text, parentId || null);
        setText('');
        toast.success(t('successMessage'));
        onCommentAdded?.();
      } catch {
        toast.error(t('errorMessage'));
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? t('replyPlaceholder') : t('commentPlaceholder')}
        rows={2}
        disabled={isPending}
        className={isRTL ? 'text-right' : 'text-left'}
      />
      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <Button type='submit' disabled={isPending || !text.trim()}>
          {isPending && <Loader2 className={isRTL ? 'ml-2' : 'mr-2'} />}
          {parentId ? t('postReplyButton') : t('postCommentButton')}
        </Button>
      </div>
    </form>
  );
}
