'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';


import { tryCatch } from '@/hooks/try-catch';
import { Question } from './TestBank/types';
import { getCourseQuestions, deleteQuestion } from '../quiz-actions';
import { CreateQuestionView } from './TestBank/CreateQuestionView';
import { QuestionCard } from './TestBank/QuestionCard';
import { EditQuestionDialog } from './TestBank/EditQuestionDialog';

interface TestBankProps {
  courseId: string;
  onSuccess?: () => void;
}

export function TestBank({ courseId, onSuccess }: TestBankProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const QUESTIONS_PER_PAGE = 5;

  const fetchAndSetQuestions = useCallback(
    async (page: number, term: string) => {
      setIsFetching(true);
      try {
        const { questions: fetched, totalCount } = await getCourseQuestions(
          courseId, page, QUESTIONS_PER_PAGE, term
        );
        setQuestions(fetched.map((q: any) => ({...q, options: q.options as string[], explanation: q.explanation || undefined })));
        setTotalQuestions(totalCount);
      } catch (error) {
        toast.error('Failed to load questions from the test bank.');
      } finally {
        setIsFetching(false);
      }
    },
    [courseId],
  );

  const debouncedSearch = useDebouncedCallback((term: string) => {
    setCurrentPage(1);
    fetchAndSetQuestions(1, term);
  }, 500);

  useEffect(() => {
    fetchAndSetQuestions(currentPage, searchTerm);
  }, [currentPage, fetchAndSetQuestions, searchTerm]);

  const handleDeleteQuestion = async (questionId: string) => {
    const { error } = await tryCatch(deleteQuestion(questionId, courseId));
    if (error) {
      toast.error('Failed to delete question.');
    } else {
      toast.success('Question deleted successfully!');
      fetchAndSetQuestions(currentPage, searchTerm);
    }
  };

  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  const handleCreationSuccess = () => {
    fetchAndSetQuestions(1, '');
    onSuccess?.();
  };

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Create New Question</CardTitle>
          <CardDescription>
            Choose your preferred method to create a new question for your test bank.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateQuestionView
            courseId={courseId}
            onSuccess={handleCreationSuccess}
          />
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <h3 className='text-xl font-bold'>
          Existing Questions in Bank ({totalQuestions})
        </h3>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Search questions by text...'
            defaultValue={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            className='pl-10'
          />
        </div>

        {isFetching ? (
          <div className='flex justify-center py-8'>
            <Loader2 className='text-primary h-8 w-8 animate-spin' />
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className='text-muted-foreground py-12 text-center'>
              <p>
                {searchTerm
                  ? 'No questions found matching your search.'
                  : 'Your test bank is empty. Create a question above to get started!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='space-y-4'>
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={() => setEditingQuestion(question)}
                onDelete={() => handleDeleteQuestion(question.id)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && !isFetching && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className='px-4 text-sm font-medium'>
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {editingQuestion && (
        <EditQuestionDialog
          question={editingQuestion}
          onOpenChange={() => setEditingQuestion(null)}
          onSuccess={() => {
            setEditingQuestion(null);
            fetchAndSetQuestions(currentPage, searchTerm);
          }}
        />
      )}
    </div>
  );
}