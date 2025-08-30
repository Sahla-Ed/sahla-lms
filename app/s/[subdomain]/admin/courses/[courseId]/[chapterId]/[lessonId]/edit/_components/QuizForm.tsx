'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Plus, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { AdminLessonType } from '@/app/s/[subdomain]/data/admin/admin-get-lesson';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import { updateQuizQuestions } from '../../../../edit/quiz-actions';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';
import { QuestionBankDialog } from '../../../../edit/_components/QuestionBankDialog';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils'; 
interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'TRUE_FALSE';
  options: string[];
  answer: string;
  explanation?: string;
}

interface QuizFormProps {
  lesson: AdminLessonType;
  courseId: string;
  chapterId: string;
  planName: 'FREE' | 'PRO';
}

function SortableQuestion({
  question,
  index,
  onRemove,
}: {
  question: Question;
  index: number;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations('QuizForm.sortableQuestion');
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardContent className='p-4'>
          <div className='flex items-start gap-3'>
            <Button
              variant='ghost'
              size='icon'
              className='mt-1 cursor-grab'
              {...attributes}
              {...listeners}
            >
              <GripVertical className='h-4 w-4' />
            </Button>
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
              <Badge variant='secondary'>{t('questionLabel', { index: index + 1 })}</Badge>
                <Badge variant='outline'>{question.type}</Badge>
              </div>
              <p className='mb-2 font-medium'>{question.text}</p>
              <div className='space-y-1'>
              {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`rounded p-2 text-sm ${
                      option === question.answer
                        ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                        : 'border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                    }`}
                  >
                     {option}
                    {option === question.answer && (
                      <Badge variant='secondary' className='ml-2 text-xs'>
                        {t('correctLabel')}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {question.explanation && (
                <div className='mt-3 rounded bg-blue-50 p-3 dark:bg-blue-950'>
                  <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                    {t('explanationLabel')}
                  </p>
                  <p className='text-sm text-blue-700 dark:text-blue-300'>
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
            <Button
              variant='outline'
              size='icon'
              onClick={() => onRemove(question.id)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QuizForm({
  lesson,
  courseId,
  chapterId,
  planName,
}: QuizFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description || '');
  const [timer, setTimer] = useState(lesson.timer ?? '');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const t = useTranslations('QuizForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  useEffect(() => {
    if (lesson.questions && lesson.questions.length > 0) {
      const quizQuestions = lesson.questions.map((q) => ({
        id: q.question.id,
        text: q.question.text,
        type: q.question.type,
        options: q.question.options as string[],
        answer: q.question.answer,
        explanation: q.question.explanation || undefined,
      }));
      setSelectedQuestions(quizQuestions);
    }
  }, [lesson.questions]);

  const handleSave = async () => {
    if (selectedQuestions.length === 0) {
      toast.error(t('notifications.noQuestionsError'));
      return;
    }
    setIsLoading(true);
    const { error } = await tryCatch(
      updateQuizQuestions({
        lessonId: lesson.id,
        questionIds: selectedQuestions.map((q) => q.id),
        timer: timer ? parseInt(timer as string, 10) : null,
      }),
    );

    if (error) {
      toast.error(t('notifications.updateError'));
    } else {
      (t('notifications.updateSuccess'))
      router.push(`/admin/courses/${courseId}/edit`);
    }
    setIsLoading(false);
  };


  const addQuestionToQuiz = (question: Question) => {
    if (!selectedQuestions.find((q) => q.id === question.id)) {
      setSelectedQuestions((prev) => [...prev, question]);
    }
  };

  const removeQuestionFromQuiz = (questionId: string) => {
    setSelectedQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = selectedQuestions.findIndex((q) => q.id === active.id);
      const newIndex = selectedQuestions.findIndex((q) => q.id === over?.id);
      setSelectedQuestions((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleCancel = () => {
    router.push(`/admin/courses/${courseId}/edit`);
  };

  return (
    <div className='space-y-6'>
      <div className='mb-6 flex items-center gap-2'>
        <HelpCircle className='h-6 w-6 text-blue-500' />
        <h1 className='text-2xl font-bold'>{t('header', { lessonTitle: lesson.title })}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? 'text-right' : 'text-left'}>{t('detailsTitle')}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title' className={isRTL ? 'text-right w-full block' : ''}>{t('labels.title')}</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('placeholders.title')}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description' className={isRTL ? 'text-right w-full block' : ''}>{t('labels.description')}</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('placeholders.description')}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='timer' className={isRTL ? 'text-right w-full block' : ''}>
              {t('labels.timer')}{' '}
              <span className='text-muted-foreground'>{t('labels.timerOptional')}</span>
            </Label>
            <Input
              id='timer'
              type='number'
              min={1}
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              placeholder={t('placeholders.timer')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className={isRTL ? 'text-right' : 'text-left'}>{t('questionsTitle')}</CardTitle>
            <Button onClick={() => setIsQuestionBankOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              {t('addQuestionButton')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedQuestions.length === 0 ? (
            <div className='text-muted-foreground py-8 text-center'>
              <HelpCircle className='mx-auto mb-4 h-12 w-12 opacity-50' />
              <p>{t('emptyState.title')}</p>
              <p className='text-sm'>{t('emptyState.description')}</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedQuestions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
               <div className='space-y-4'>
                  {selectedQuestions.map((question, index) => (
                    <SortableQuestion
                      key={question.id}
                      question={question}
                      index={index}
                      onRemove={removeQuestionFromQuiz}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <QuestionBankDialog
        open={isQuestionBankOpen}
        onOpenChange={setIsQuestionBankOpen}
        courseId={courseId}
        selectedQuestionIds={selectedQuestions.map((q) => q.id)}
        onQuestionSelect={addQuestionToQuiz}
        planName={planName}
      />

      <div className={`flex gap-2 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
        <Button variant='outline' onClick={handleCancel}>
          {t('buttons.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <div className='flex items-center'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {t('buttons.saving')}
            </div>
          ) : (
            t('buttons.save')
          )}
        </Button>
      </div>
    </div>
  );
}
