import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { Trash2 } from 'lucide-react';

import { useState, useTransition } from 'react';
import { deleteChapter } from '../actions';
import { toast } from 'sonner';
import { useLocale, useTranslations } from 'next-intl';

export function DeleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const t = useTranslations('DeleteChapter');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  async function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteChapter({ chapterId, courseId }),
      );

      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        setOpen(false);
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }
  const CancelButton = (
    <AlertDialogCancel>{t('cancelButton')}</AlertDialogCancel>
  );
  const DeleteButton = (
    <Button onClick={onSubmit} disabled={pending}>
      {pending ? t('deletingButton') : t('deleteButton')}
    </Button>
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Trash2 className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={isRTL ? 'text-right' : 'text-left'}>
            {t('dialogTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={isRTL ? 'text-right' : 'text-left'}
          >
            {t('dialogDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isRTL ? (
            <>
              {DeleteButton}
              {CancelButton}
            </>
          ) : (
            <>
              {CancelButton}
              {DeleteButton}
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
