'use client';
import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionForm } from './QuestionForm';
import { SubComponentProps } from './types';
import { createQuestion } from '../../quiz-actions';
import { AiQuestionForm } from './AiQuestionForm';
import { ImportQuestionForm } from './ImportQuestionForm';

export const CreateQuestionView: FC<SubComponentProps> = ({
  courseId,
  onSuccess,
}) => (
  <Tabs defaultValue='manual'>
    <TabsList className='grid w-full grid-cols-3'>
      <TabsTrigger value='manual'>Manual</TabsTrigger>
      <TabsTrigger value='ai'>AI</TabsTrigger>
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
      <AiQuestionForm courseId={courseId} onSuccess={onSuccess} />
    </TabsContent>
    <TabsContent value='import' className='pt-6'>
      <ImportQuestionForm courseId={courseId} onSuccess={onSuccess} />
    </TabsContent>
  </Tabs>
);
