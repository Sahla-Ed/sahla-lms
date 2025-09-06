'use client';
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { QuestionForm } from './QuestionForm';
import { Question } from './types';
import { updateQuestion } from '../../quiz-actions';
import { useLocale, useTranslations } from 'next-intl';

interface EditQuestionDialogProps {
  question: Question;
  onOpenChange: () => void;
  onSuccess: () => void;
}

export const EditQuestionDialog: FC<EditQuestionDialogProps> = ({
  question,
  onOpenChange,
  onSuccess,
}) => {
  const t = useTranslations('EditQuestionDialog');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <div className='space-y-4'>
          <DialogHeader className={isRTL ? 'text-right' : 'text-left'}>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>

          <div className='pt-4' dir={isRTL ? 'rtl' : 'ltr'}>
            <QuestionForm
              courseId={question.courseId}
              initialData={question}
              onSave={(data) => updateQuestion(question.id, data)}
              onSuccess={onSuccess}
              mode='edit'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
