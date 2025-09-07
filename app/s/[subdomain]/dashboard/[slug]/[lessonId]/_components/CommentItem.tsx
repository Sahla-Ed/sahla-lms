'use client';

import { useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import {
  CommentWithUserAndReplies,
  deleteComment,
  updateComment,
} from '../comment-actions';
import { CommentForm } from './CommentForm';
import { authClient } from '@/lib/auth-client';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { tryCatch } from '@/hooks/try-catch';
import { useLocale, useTranslations } from 'next-intl';
import { arSA } from 'date-fns/locale';

interface CommentItemProps {
  comment: CommentWithUserAndReplies;
  lessonId: string;
}

export function CommentItem({ comment, lessonId }: CommentItemProps) {
  const { data: session } = authClient.useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isDeletingPending, startDeleteTransition] = useTransition();
  const [isEditingPending, startEditTransition] = useTransition();

  const t = useTranslations('AdminLessonPreview.comments.item');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const isInstructor = comment.user.role === 'admin';

  const canEdit = session?.user.id === comment.user.id;
  const canDelete =
    session?.user.id === comment.user.id || session?.user.role === 'admin';

  const handleUpdate = () => {
    if (!editText.trim() || editText === comment.text) {
      setIsEditing(false);
      return;
    }
    startEditTransition(async () => {
      const { error } = await tryCatch(updateComment(comment.id, editText));
      if (error) {
        toast.error(t('updateError'));
      } else {
        toast.success(t('updateSuccess'));
        setIsEditing(false);
      }
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const { error } = await tryCatch(deleteComment(comment.id));
      if (error) {
        toast.error(t('deleteError'));
      } else {
        toast.success(t('deleteSuccess'));
      }
    });
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: isRTL ? arSA : undefined,
  });
  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg p-4',
        isRTL ? 'space-x-reverse' : 'space-x-3',
        isInstructor ? 'bg-primary/5 border-primary/20 border' : 'bg-muted/50',
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Avatar>
        <AvatarImage src={comment.user.image ?? ''} alt={comment.user.name} />
        <AvatarFallback>
          {comment.user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex-1 space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <p className='font-semibold'>{comment.user.name}</p>
            {isInstructor && (
              <Badge variant='secondary'>{t('instructorBadge')}</Badge>
            )}
          </div>
          <span className='text-muted-foreground text-xs'>{formattedDate}</span>
        </div>

        {!isEditing ? (
          <p className='text-foreground/80 text-sm'>{comment.text}</p>
        ) : (
          <div className='space-y-2'>
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className='min-h-[60px]'
              disabled={isEditingPending}
            />
            <div
              className={`flex gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}
            >
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsEditing(false)}
                disabled={isEditingPending}
              >
                {t('cancelButton')}
              </Button>
              <Button
                size='sm'
                onClick={handleUpdate}
                disabled={isEditingPending || !editText.trim()}
              >
                {isEditingPending && (
                  <Loader2
                    className={cn(
                      'h-4 w-4 animate-spin',
                      isRTL ? 'ml-2' : 'mr-2',
                    )}
                  />
                )}
                {t('saveButton')}
              </Button>
            </div>
          </div>
        )}
        <div className='flex items-center gap-2'>
          {!isEditing && (
            <>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsReplying(!isReplying)}
              >
                {t('replyButton')}
              </Button>
              {canEdit && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className={cn('h-3 w-3', isRTL ? 'ml-1' : 'mr-1')} />{' '}
                  {t('editButton')}
                </Button>
              )}
              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-destructive hover:text-destructive'
                    >
                      <Trash2
                        className={cn('h-3 w-3', isRTL ? 'ml-1' : 'mr-1')}
                      />{' '}
                      {t('deleteButton')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t('deleteDialog.title')}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('deleteDialog.description')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('cancelButton')}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className='bg-destructive hover:bg-destructive/90'
                        disabled={isDeletingPending}
                      >
                        {isDeletingPending && (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        {t('deleteDialog.confirmButton')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </>
          )}
        </div>

        {isReplying && (
          <div className='pt-2'>
            <CommentForm
              lessonId={lessonId}
              parentId={comment.id}
              onCommentAdded={() => setIsReplying(false)}
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className='space-y-4 border-l-2 pt-4 pl-4'>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={{ ...reply, replies: [] }}
                lessonId={lessonId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
