'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { SelectQuestionListView } from './SelectQuestionListView';

import { Question } from './TestBank/types';
import { TestBank } from './TestBank';
import { getCourseQuestions } from '../quiz-actions';

interface QuestionBankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  selectedQuestionIds: string[];
  onQuestionSelect: (question: Question) => void;
}

export function QuestionBankDialog({
  open,
  onOpenChange,
  courseId,
  selectedQuestionIds,
  onQuestionSelect,
}: QuestionBankDialogProps) {
  const [view, setView] = useState<'select' | 'create'>('select');
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const QUESTIONS_PER_PAGE = 5;

  const fetchQuestions = useCallback(
    async (page: number, term: string) => {
      setIsFetching(true);
      try {
        const { questions: fetched, totalCount } = await getCourseQuestions(
          courseId,
          page,
          QUESTIONS_PER_PAGE,
          term,
        );
        setAvailableQuestions(
          fetched.map((q: any) => ({ ...q, options: q.options as string[] })),
        );
        setTotalQuestions(totalCount);
      } catch {
        toast.error('Failed to load questions from the test bank.');
      } finally {
        setIsFetching(false);
      }
    },
    [courseId],
  );

  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    if (open && view === 'select') {
      fetchQuestions(currentPage, searchTerm);
    }
  }, [open, view, fetchQuestions, currentPage, searchTerm]);

  const handleQuestionCreated = () => {
    setView('select');
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleDialogChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setView('select');
        setCurrentPage(1);
        setSearchTerm('');
      }, 300);
    }
  };

  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className='flex max-h-[90vh] max-w-4xl flex-col'>
        <DialogHeader>
          <div className='flex items-center gap-4'>
            {view === 'create' && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setView('select')}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
            )}
            <div>
              <DialogTitle>
                {view === 'select'
                  ? 'Add Question from Bank'
                  : 'Create New Question'}
              </DialogTitle>
              <DialogDescription>
                {view === 'select'
                  ? 'Select from existing questions or create a new one to add to your quiz.'
                  : 'Your new question will be available in the bank immediately after saving.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='-mr-2 flex-1 overflow-y-auto pr-2'>
          {view === 'select' ? (
            <SelectQuestionListView
              questions={availableQuestions}
              selectedIds={selectedQuestionIds}
              onSelect={onQuestionSelect}
              onCreate={() => setView('create')}
              isFetching={isFetching}
              onSearchChange={debouncedSearch}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : (
            <div className='p-1'>
              <TestBank courseId={courseId} onSuccess={handleQuestionCreated} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
