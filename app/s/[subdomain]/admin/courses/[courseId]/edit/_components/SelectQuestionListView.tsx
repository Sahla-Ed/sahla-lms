'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Question } from './TestBank/types';

interface SelectQuestionListViewProps {
  questions: Question[];
  selectedIds: string[];
  onSelect: (question: Question) => void;
  onCreate: () => void;
  isFetching: boolean;
  onSearchChange: (term: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SelectQuestionListView({
  questions,
  selectedIds,
  onSelect,
  onCreate,
  isFetching,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
}: SelectQuestionListViewProps) {
  return (
    <div className='space-y-4'>
      <div className='sticky top-0 z-10 flex gap-4 bg-background py-2'>
        <div className='relative flex-1'>
          <Search className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Search questions in your test bank...'
            onChange={(e) => onSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>
        <Button onClick={onCreate} className='shrink-0'>
          <Plus className='mr-2 h-4 w-4' />
          Create New
        </Button>
      </div>

      {isFetching ? (
        <div className='flex h-64 items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      ) : questions.length === 0 ? (
        <div className='py-16 text-center text-muted-foreground'>
          <h3 className='text-lg font-semibold text-foreground'>
            {'No Questions Found'}
          </h3>
          <p className='mt-2 text-sm'>
            {'Try a different search term or create a new question.'}
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {questions.map((q) => {
            const isSelected = selectedIds.includes(q.id);
            return (
              <Card
                key={q.id}
                className={cn(
                  'transition-colors',
                  isSelected && 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30',
                )}
              >
                <CardContent className='flex items-start justify-between gap-4 p-4'>
                  <div className='flex-1 space-y-2'>
                    <p className='font-medium'>{q.text}</p>
                    <Badge variant='outline'>{q.type}</Badge>
                  </div>
                  <Button
                    size='sm'
                    onClick={() => onSelect(q)}
                    disabled={isSelected}
                    className='ml-4 shrink-0'
                  >
                    {isSelected ? <Check className='mr-2 h-4 w-4' /> : <Plus className='mr-2 h-4 w-4' />}
                    {isSelected ? 'Added' : 'Add'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {totalPages > 1 && !isFetching && (
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              <span className='px-4 text-sm font-medium'>
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}