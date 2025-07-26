'use client';
import { FC, useTransition } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileUp, Download, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import { SubComponentProps } from './types';
import { createMultipleQuestions } from '../../quiz-actions';

export const ImportQuestionForm: FC<SubComponentProps> = ({
  courseId,
  onSuccess,
}) => {
  const [isImporting, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') {
            toast.error('Could not read file content.');
            return;
          }
          const json = JSON.parse(text);
          const formattedQuestions = json.questions.map((q: any) => ({
            text: q.text || '',
            type: q.type || 'MCQ',
            options: q.options || (q.type === 'MCQ' ? [] : ['True', 'False']),
            answer: q.answer || '',
            explanation: q.explanation || '',
          }));

          processQuestions(formattedQuestions);
        } catch (error) {
          toast.error('Error parsing JSON file. Please check the format.');
          console.error('JSON Parse Error:', error);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            toast.error('Error parsing CSV/TXT file. Please check the format.');
            console.error('CSV Errors:', results.errors);
            return;
          }
          const formattedQuestions = results.data.map((row: any) => ({
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
      toast.error(
        'Unsupported file type. Please upload a .json, .csv, or .txt file.',
      );
    }
  };

  const processQuestions = (questions: any[]) => {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        createMultipleQuestions(courseId, questions),
      );
      if (error || data?.status === 'error') {
        toast.error(data?.message || 'Failed to import questions.');
      } else {
        toast.success(data.message);
        onSuccess();
      }
    });
  };

  return (
    <Card className='border-dashed'>
      <CardContent className='space-y-4 p-6 text-center'>
        <FileUp className='text-muted-foreground mx-auto h-12 w-12' />
        <h3 className='text-lg font-semibold'>Import Questions from File</h3>
        <p className='text-muted-foreground text-sm'>
          Supported format: Json and Txt. Download a template to get started.
        </p>
        <div className='flex justify-center gap-4'>
          <a
            href='/api/templates/questions_template.json'
            download='questions_template.json'
            className={buttonVariants({ variant: 'outline' })}
          >
            <Download className='mr-2 h-4 w-4' />
            JSON Template
          </a>
          <a
            href='/api/templates/questions_template.txt'
            download='questions_template.txt'
            className={buttonVariants({ variant: 'outline' })}
          >
            <Download className='mr-2 h-4 w-4' />
            TXT Template
          </a>
        </div>
        <Input
          type='file'
          accept='.txt, .csv, .json'
          onChange={handleFileChange}
          disabled={isImporting}
        />
        {isImporting && (
          <div className='flex items-center justify-center'>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Importing...
          </div>
        )}
      </CardContent>
    </Card>
  );
};
