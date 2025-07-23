'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Plus, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { AdminLessonType } from '@/app/data/admin/admin-get-lesson';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import {
  updateQuizQuestions,
  getCourseQuestions,
} from '../../../../edit/quiz-actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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

interface QuizFormProps {
  lesson: AdminLessonType;
  chapterId: string;
  courseId: string;
}

interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'TRUE_FALSE';
  options: string[];
  answer: string;
  explanation?: string;
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...attributes}
      {...listeners}
    >
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
                <Badge variant='secondary'>Question {index + 1}</Badge>
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
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {question.explanation && (
                <div className='mt-3 rounded bg-blue-50 p-3 dark:bg-blue-950'>
                  <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                    Explanation:
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

export function QuizForm({ lesson, courseId }: QuizFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description || '');
  const [timer, setTimer] = useState(lesson.timer ?? '');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  // Fetch available questions from test bank
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getCourseQuestions(courseId);
        setAvailableQuestions(
          fetchedQuestions.map((q) => ({
            id: q.id,
            text: q.text,
            type: q.type,
            options: q.options as string[],
            answer: q.answer,
            explanation: q.explanation || undefined,
          })),
        );
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        toast.error('Failed to load questions from test bank');
      } finally {
        setIsFetching(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  // Load existing quiz questions
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
      setQuestions(quizQuestions);
    }
  }, [lesson.questions]);


  const handleSave = async () => {
 
  if (questions.length === 0) {
    toast.error('You must add at least one question before saving the quiz.');
    return; 
  }
-

  setIsLoading(true);
  const { error } = await tryCatch(
    updateQuizQuestions({
      lessonId: lesson.id,
      questionIds: questions.map((q) => q.id),
      timer: timer ? parseInt(timer as string, 10) : null,
    }),
  );

  if (error) {
    toast.error('Failed to update quiz');
  } else {
    toast.success('Quiz updated successfully!');
    router.push(`/admin/courses/${courseId}/edit`);
  }
  setIsLoading(false);
};
  const addQuestion = (question: Question) => {
    // Check if question is already added
    if (questions.find((q) => q.id === question.id)) {
      toast.error('This question is already added to the quiz');
      return;
    }
    setQuestions((prev) => [...prev, question]);
    setIsDialogOpen(false);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over?.id);
      setQuestions((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  if (isFetching) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2 className='h-6 w-6 animate-spin' />
        <span className='ml-2'>Loading questions...</span>
      </div>
    );
  }

   const handleCancel = () => {
    if (questions.length === 0) {
      toast.error('You must add at least one question to this quiz before leaving.');
    } else {
      router.push(`/admin/courses/${courseId}/edit`);
    }
  };


  return (
    <div className='space-y-6'>
      <div className='mb-6 flex items-center gap-2'>
        <HelpCircle className='h-6 w-6 text-blue-500' />
        <h1 className='text-2xl font-bold'>Edit Quiz: {lesson.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label htmlFor='title'>Quiz Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter quiz title...'
            />
          </div>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter quiz description...'
            />
          </div>
          <div>
            <Label htmlFor='timer'>
              Time limit (minutes){' '}
              <span className='text-muted-foreground'>[optional]</span>
            </Label>
            <Input
              id='timer'
              type='number'
              min={1}
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              placeholder='e.g. 30'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Quiz Questions</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Add Question from Test Bank
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className='text-muted-foreground py-8 text-center'>
              <HelpCircle className='mx-auto mb-4 h-12 w-12 opacity-50' />
              <p>No questions added yet</p>
              <p className='text-sm'>
                Add questions from your course test bank
              </p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className='space-y-4'>
                  {questions.map((question, index) => (
                    <SortableQuestion
                      key={question.id}
                      question={question}
                      index={index}
                      onRemove={removeQuestion}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Question Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className='max-h-[80vh] max-w-4xl overflow-y-auto'
          aria-describedby='select-questions-desc'
        >
          <DialogHeader>
            <DialogTitle>Select Questions from Test Bank</DialogTitle>
            <DialogDescription id='select-questions-desc'>
              Choose questions from the test bank to add to this quiz.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            {availableQuestions.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center'>
                <p>No questions available in test bank</p>
                <p className='text-sm'>
                  Create questions in the Test Bank tab first
                </p>
              </div>
            ) : (
              availableQuestions.map((question) => (
                <Card key={question.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='mb-2 flex items-center gap-2'>
                          <Badge variant='outline'>{question.type}</Badge>
                          {questions.find((q) => q.id === question.id) && (
                            <Badge variant='secondary'>Already Added</Badge>
                          )}
                        </div>
                        <p className='mb-2 font-medium'>{question.text}</p>
                        <div className='space-y-1'>
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`rounded p-2 text-sm ${
                                option === question.answer
                                  ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                  : 'border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                              }`}
                            >
                              {option}
                              {option === question.answer && (
                                <Badge
                                  variant='secondary'
                                  className='ml-2 text-xs'
                                >
                                  Correct
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                        {question.explanation && (
                          <div className='mt-3 rounded bg-blue-50 p-3 dark:bg-blue-950'>
                            <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                              Explanation:
                            </p>
                            <p className='text-sm text-blue-700 dark:text-blue-300'>
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                      {!questions.find((q) => q.id === question.id) && (
                        <Button
                          onClick={() => addQuestion(question)}
                          className='ml-4'
                        >
                          <Plus className='mr-2 h-4 w-4' />
                          Add
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className='flex justify-end gap-2'>
        <Button
          variant='outline'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Quiz'}
        </Button>
      </div>
    </div>
  );
}
