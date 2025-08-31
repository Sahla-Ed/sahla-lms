'use client';
import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from './types';
import { useLocale, useTranslations } from 'next-intl';

export const QuestionCard: FC<{
  question: Question;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ question, onEdit, onDelete }) => {
  const t = useTranslations('QuestionCard');
  const tForm = useTranslations('QuestionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const typeKey = question.type === 'MCQ' ? 'mcq' : 'trueFalse';
  return (
    <Card dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader>
        <div
          className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex-1 ${isRTL ? 'ml-4' : 'mr-4'}`}>
            <CardTitle
              className={`text-base ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {question.text}
            </CardTitle>
            <div
              className={`mt-2 flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}
            >
              <Badge variant='secondary'>{tForm(`types.${typeKey}`)}</Badge>
              <Badge variant='outline'>
                {t('options', { count: question.options.length })}
              </Badge>
            </div>
          </div>
          <div className={`flex shrink-0 gap-2 ${isRTL ? 'order-first' : ''}`}>
            <Button variant='outline' size='sm' onClick={onEdit}>
              <Edit className='h-4 w-4' />
            </Button>
            <Button variant='destructive' size='sm' onClick={onDelete}>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                'rounded border p-2 text-sm',
                option === question.answer
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                  : 'border-border bg-muted/50',
                isRTL ? 'text-right' : 'text-left',
              )}
            >
              {option === 'True'
                ? tForm('types.true')
                : option === 'False'
                  ? tForm('types.false')
                  : option}
              {option === question.answer && (
                <Badge variant='secondary' className={isRTL ? 'mr-2' : 'ml-2'}>
                  {t('correct')}
                </Badge>
              )}
            </div>
          ))}
          {question.explanation && (
            <div
              className={`mt-3 rounded bg-blue-50 p-3 dark:bg-blue-950 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                {t('explanation')}
              </p>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
