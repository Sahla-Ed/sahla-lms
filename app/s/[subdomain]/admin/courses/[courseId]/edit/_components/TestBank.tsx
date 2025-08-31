'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { tryCatch } from '@/hooks/try-catch';
import { Question } from './TestBank/types';
import { getCourseQuestions, deleteQuestion, deleteMultipleQuestions} from '../quiz-actions';
import { CreateQuestionView } from './TestBank/CreateQuestionView';
import { QuestionCard } from './TestBank/QuestionCard';
import { EditQuestionDialog } from './TestBank/EditQuestionDialog';
import { useLocale, useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';


interface TestBankProps {
  courseId: string;
  planName: 'FREE' | 'PRO';
  onSuccess?: () => void;
}

export function TestBank({ courseId, planName, onSuccess }: TestBankProps) {
  const t = useTranslations('TestBank');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const QUESTIONS_PER_PAGE = 5;

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isDeleting, startDeleteTransition] = useTransition();

  const fetchAndSetQuestions = useCallback(
    async (page: number, term: string) => {
      setIsFetching(true);
      try {
        const { questions: fetched, totalCount } = await getCourseQuestions(
          courseId,
          page,
          QUESTIONS_PER_PAGE,
          term,
        );
        setQuestions(
          fetched.map((q) => ({
            ...q,
            options: Array.isArray(q.options) ? (q.options as string[]) : [],
            explanation: q.explanation || undefined,
          })) as Question[],
        );
        setTotalQuestions(totalCount);
      } catch {
        toast.error(t('notifications.loadError'));
      } finally {
        setIsFetching(false);
      }
    },
    [courseId, t],
  );

  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    fetchAndSetQuestions(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchAndSetQuestions]);

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };
  
  const handleSelectPage = (isChecked: boolean) => {
    const idsOnPage = questions.map((q) => q.id);
    if (isChecked) {
      setSelectedQuestions((prev) => [...new Set([...prev, ...idsOnPage])]);
    } else {
      setSelectedQuestions((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    }
  };


 
  const handleDeleteSelected = () => {
    startDeleteTransition(async () => {
      const result = await deleteMultipleQuestions(selectedQuestions, courseId);
      if (result.status === 'success') {
        toast.success(result.message);
        setSelectedQuestions([]);
        fetchAndSetQuestions(1, '');
      } else {
        toast.error(result.message);
      }
    });
  };




  const handleDeleteQuestion = async (questionId: string) => {
    const { error } = await tryCatch(deleteQuestion(questionId, courseId));
    if (error) {
      toast.error(t('notifications.deleteError'));
    } else {
      toast.success(t('notifications.deleteSuccess'));
      fetchAndSetQuestions(currentPage, searchTerm);
    }
  };

  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  const handleCreationSuccess = () => {
    setSearchTerm('');
    setCurrentPage(1);
    onSuccess?.();
  };

  
  const idsOnPage = questions.map(q => q.id);
  const areAllOnPageSelected = idsOnPage.length > 0 && idsOnPage.every(id => selectedQuestions.includes(id));


  return (
    <div className='space-y-8' dir={isRTL ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader>
          <CardTitle>{t('createCardTitle')}</CardTitle>
          <CardDescription>{t('createCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateQuestionView
            courseId={courseId}
            onSuccess={handleCreationSuccess}
            planName={planName}
          />
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <h3
          className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {t('existingQuestionsTitle', { totalQuestions })}
        </h3>
        {selectedQuestions.length > 0 && (
          <div className="flex items-center justify-between rounded-md border bg-muted p-3">
            <p className="text-sm font-medium">
              {t('questionsSelected', { count: selectedQuestions.length })}
            </p>
            <Button variant="destructive" onClick={handleDeleteSelected} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              {t('deleteSelected')}
            </Button>
          </div>
        )}
        <div className='relative'>
          <Search
            className={`text-muted-foreground absolute top-1/2 h-4 w-4 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`}
          />
          <Input
            placeholder={t('searchPlaceholder')}
            defaultValue={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>

        {!isFetching && questions.length > 0 && (
          <div className="flex items-center border-b pb-2">
            <Checkbox
              id="select-all-page"
              onCheckedChange={(checked) => handleSelectPage(Boolean(checked))}
              checked={areAllOnPageSelected}
            />
            <label htmlFor="select-all-page" className="mx-2 text-sm">
              {t('selectAllOnPage')}
            </label>
          </div>
        )}
        {isFetching ? (
          <div className='flex justify-center py-8'>
            <Loader2 className='text-primary h-8 w-8 animate-spin' />
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className='text-muted-foreground py-12 text-center'>
              <p>
                {searchTerm ? t('emptyState.noMatch') : t('emptyState.empty')}
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
              isSelected={selectedQuestions.includes(question.id)}
              onSelect={handleSelectQuestion}
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
                  {t('pagination', { currentPage, totalPages })}
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
