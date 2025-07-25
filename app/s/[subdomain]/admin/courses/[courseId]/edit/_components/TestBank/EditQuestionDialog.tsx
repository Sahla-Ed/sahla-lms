'use client';
import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { QuestionForm } from './QuestionForm';
import { Question } from './types';
import { updateQuestion } from '../../quiz-actions';

interface EditQuestionDialogProps {
  question: Question;
  onOpenChange: () => void;
  onSuccess: () => void;
}

export const EditQuestionDialog: FC<EditQuestionDialogProps> = ({ question, onOpenChange, onSuccess }) => {
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Make changes to your question here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='pt-4'>
          <QuestionForm
            courseId={question.courseId}
            initialData={question}
            onSave={(data) => updateQuestion(question.id, data)}
            onSuccess={onSuccess}
            buttonText='Save Changes'
            toastSuccessMessage='Question updated successfully!'
            toastErrorMessage='Failed to update question.'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};