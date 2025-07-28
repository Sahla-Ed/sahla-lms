'use client';

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionForm } from './QuestionForm';
import { SubComponentProps } from './types';
import { createQuestion } from '../../quiz-actions';
import { AiQuestionForm } from './AiQuestionForm';
import { ImportQuestionForm } from './ImportQuestionForm';

interface CreateQuestionViewProps extends SubComponentProps {
  planName: 'FREE' | 'PRO';
}

export const CreateQuestionView: FC<CreateQuestionViewProps> = ({
  courseId,
  onSuccess,
  planName,
}) => {
  const canUseAi = planName === 'PRO';

  return (
    <Tabs defaultValue='manual'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='manual'>Manual</TabsTrigger>
        <TabsTrigger
          value='ai'
          disabled={!canUseAi}
          title={!canUseAi ? 'Upgrade to Pro to use AI' : ''}
        >
          AI ✨
        </TabsTrigger>
        <TabsTrigger value='import'>Import</TabsTrigger>
      </TabsList>
      <TabsContent value='manual' className='pt-6'>
        <QuestionForm
          courseId={courseId}
          onSave={createQuestion}
          onSuccess={onSuccess}
          buttonText='Save Question'
          toastSuccessMessage='Question created successfully!'
          toastErrorMessage='Failed to create question.'
        />
      </TabsContent>
      <TabsContent value='ai' className='pt-6'>
        {canUseAi ? (
          <AiQuestionForm courseId={courseId} onSuccess={onSuccess} />
        ) : (
          <div className='rounded-lg border p-8 text-center'>
            <h3 className='font-bold'>Upgrade to Pro to use AI</h3>
            <p className='text-muted-foreground text-sm'>
              Automate quiz creation with AI by upgrading your plan.
            </p>
          </div>
        )}
      </TabsContent>
      <TabsContent value='import' className='pt-6'>
        <ImportQuestionForm courseId={courseId} onSuccess={onSuccess} />
      </TabsContent>
    </Tabs>
  );
};
