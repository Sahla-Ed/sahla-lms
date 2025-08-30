'use client';
import { FC, useTransition } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileUp, Download, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import { Question, SubComponentProps } from './types';
import { createMultipleQuestions } from '../../quiz-actions';
import { useLocale, useTranslations } from 'next-intl';

type ImportedQuestion = Omit<Question, 'id' | 'courseId'>;
type CsvRow = {
  text: string;
  type: 'MCQ' | 'TRUE_FALSE';
  options: string;
  answer: string;
  explanation: string;
};

export const ImportQuestionForm: FC<SubComponentProps> = ({
  courseId,
  onSuccess,
}) => {
  const [isImporting, startTransition] = useTransition();
  const t = useTranslations('ImportQuestionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') {
            toast.error(t('notifications.readError'));
            return;
          }
          const json = JSON.parse(text);
          const formattedQuestions = json.questions.map(
            (q: ImportedQuestion) => ({
              text: q.text || '',
              type: q.type || 'MCQ',
              options: q.options || (q.type === 'MCQ' ? [] : ['True', 'False']),
              answer: q.answer || '',
              explanation: q.explanation || '',
            }),
          );

          processQuestions(formattedQuestions);
        } catch (error) {
          toast.error(t('notifications.jsonParseError'));
          console.error('JSON Parse Error:', error);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.csv')) {
      Papa.parse<CsvRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            toast.error(t('notifications.csvParseError'));
            console.error('CSV Errors:', results.errors);
            return;
          }
          const formattedQuestions = results.data.map((row) => ({
            text: row.text || '',
            type: row.type || 'MCQ',
            options:
              row.type === 'MCQ'
                ? (row.options || '').split('|')
                : ['True', 'False'],
            answer: row.answer || '',
            explanation: row.explanation || '',
          }));
          processQuestions(formattedQuestions);
        },
      });
    } else {
      toast.error(t('notifications.unsupportedType'));
    }
  };
  
  const processQuestions = (questions: ImportedQuestion[]) => {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        createMultipleQuestions(courseId, questions),
      );
      if (error || data?.status === 'error') {
        toast.error(data?.message || t('notifications.importFailed'));
      } else {
        toast.success(t('notifications.success', { count: questions.length }));
        onSuccess();
      }
    });
  };

  return (
    <Card className='border-dashed'>
      <CardContent className='space-y-4 p-6 text-center' dir={isRTL ? 'rtl' : 'ltr'}>
        <FileUp className='text-muted-foreground mx-auto h-12 w-12' />
        <h3 className='text-lg font-semibold'>{t('title')}</h3>
        <p className='text-muted-foreground text-sm'>{t('description')}</p>
        <div className='flex justify-center gap-4'>
          <a
            href={`/api/templates/questions_template.json?locale=${locale}`}
            download='questions_template.json'
            className={buttonVariants({ variant: 'outline' })}
          >
            <Download className={isRTL ? 'ml-2' : 'mr-2'} />
            {t('jsonTemplate')}
          </a>
          <a
            href={`/api/templates/questions_template.csv?locale=${locale}`}
            download='questions_template.csv'
            className={buttonVariants({ variant: 'outline' })}
          >
            <Download className={isRTL ? 'ml-2' : 'mr-2'} />
            {t('csvTemplate')}
          </a>

        </div>
        <Input
          type='file'
          accept='.csv, .json'
          onChange={handleFileChange}
          disabled={isImporting}
        />
        {isImporting && (
          <div className='flex items-center justify-center'>
            <Loader2 className={isRTL ? 'ml-2' : 'mr-2'} />
            {t('importing')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};