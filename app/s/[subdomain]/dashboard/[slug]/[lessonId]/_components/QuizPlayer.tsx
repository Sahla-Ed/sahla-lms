'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Timer,
  Trophy,
  HeartCrack,
} from 'lucide-react';
import { LessonContentType } from '@/app/data/course/get-lesson-content';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import { submitQuizAttempt } from '../quiz-actions';

interface QuizPlayerProps {
  data: LessonContentType;
}

interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'TRUE_FALSE';
  options: string[];
  answer: string;
  explanation?: string;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<string, string>;
  isSubmitted: boolean;
  score: number;
  timeElapsed: number;
}

export function QuizPlayer({ data }: QuizPlayerProps) {
  // If a completed attempt exists, show result page with retake option
  const completedAttempt =
    data.latestQuizAttempt && data.latestQuizAttempt.completedAt;
  const [retakeMode, setRetakeMode] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    isSubmitted: !!completedAttempt,
    score: completedAttempt ? (data.latestQuizAttempt?.score ?? 0) : 0,
    timeElapsed: completedAttempt
      ? (data.latestQuizAttempt?.timeElapsed ?? 0)
      : 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Safely extract questions from data
  const questions: Question[] = (data.questions || [])
    .filter((q) => q.question && q.question.text)
    .map((q) => ({
      id: q.question.id,
      text: q.question.text,
      type: q.question.type,
      options: q.question.options as string[],
      answer: q.question.answer,
      explanation: q.question.explanation || undefined,
    }));

  const submitQuiz = useCallback(async () => {
    setIsLoading(true);
    const timeElapsed = startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;

    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question) => {
      const userAnswer = quizState.answers[question.id];
      if (userAnswer === question.answer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    const { error } = await tryCatch(
      submitQuizAttempt({
        lessonId: data.id,
        answers: quizState.answers,
        score,
        timeElapsed,
      }),
    );

    if (error) {
      toast.error('Failed to submit quiz');
    } else {
      setQuizState((prev) => ({
        ...prev,
        isSubmitted: true,
        score,
        timeElapsed,
      }));
      toast.success('Quiz submitted successfully!');
    }
    setIsLoading(false);
  }, [startTime, questions, quizState.answers, data.id]);
  // Timer effect
  useEffect(() => {
    if (!startTime || quizState.isSubmitted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    const intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hasTimeLimit = typeof data.timer === 'number' && data.timer > 0;
      const timeIsUp = hasTimeLimit && elapsed >= (data.timer ?? 0) * 60;

      if (timeIsUp) {
        // Time is up. Stop the timer and submit the quiz.
        clearInterval(intervalId);
        // This is a side effect, called directly from the interval callback.
        submitQuiz();
      } else {
        // Time is not up, so we just update the elapsed time in state.
        setQuizState((prev) => ({ ...prev, timeElapsed: elapsed }));
      }
    }, 1000);

    timerRef.current = intervalId;

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, quizState.isSubmitted, data.timer, submitQuiz]);

  // Early return if no questions
  if (questions.length === 0) {
    return (
      <div className='mx-auto max-w-4xl p-6'>
        <Card>
          <CardHeader className='text-center'>
            <div className='mb-4 flex justify-center'>
              <HelpCircle className='h-16 w-16 text-blue-500' />
            </div>
            <CardTitle className='text-2xl'>Quiz: {data.title}</CardTitle>
            <p className='text-muted-foreground'>
              {data.description || 'Test your knowledge with this quiz'}
            </p>
          </CardHeader>
          <CardContent className='space-y-4 text-center'>
            <div className='text-muted-foreground py-8 text-center'>
              <p>No questions available for this quiz</p>
              <p className='text-sm'>
                Please contact your instructor to add questions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If completedAttempt, show result page with retake option
  if (quizState.isSubmitted && completedAttempt && !retakeMode) {
    const attempt = data.latestQuizAttempt;
    const isFail = quizState.score < 50;
    return (
      <div className='mx-auto max-w-4xl p-6'>
        <Card>
          <CardHeader className='text-center'>
            <div className='mb-4 flex justify-center'>
              {isFail ? (
                <HeartCrack className='h-16 w-16 text-red-500' />
              ) : (
                <Trophy className='h-16 w-16 text-yellow-500' />
              )}
            </div>
            <CardTitle className='text-2xl'>Quiz Complete!</CardTitle>
            <div className='mt-4 flex justify-center gap-4'>
              <Badge variant='secondary' className='px-4 py-2 text-lg'>
                Score: {quizState.score}%
              </Badge>
              <Badge variant='outline' className='px-4 py-2 text-lg'>
                Time: {Math.floor(quizState.timeElapsed / 60)}:
                {(quizState.timeElapsed % 60).toString().padStart(2, '0')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {questions.map((question, index) => {
                const userAnswer =
                  attempt &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  attempt.answers.find((a: any) => a.questionId === question.id)
                    ?.answer;
                const isCorrect = userAnswer === question.answer;
                return (
                  <Card key={question.id}>
                    <CardContent className='p-4'>
                      <div className='mb-3 flex items-start gap-2'>
                        {isCorrect ? (
                          <CheckCircle className='mt-0.5 h-5 w-5 text-green-500' />
                        ) : (
                          <XCircle className='mt-0.5 h-5 w-5 text-red-500' />
                        )}
                        <div className='flex-1'>
                          <p className='mb-2 font-medium'>
                            Question {index + 1}: {question.text}
                          </p>
                          <div className='space-y-2'>
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`rounded border p-3 ${
                                  option === userAnswer
                                    ? isCorrect
                                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                                    : option === question.answer
                                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                      : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                                }`}
                              >
                                <div className='flex items-center gap-2'>
                                  {option}
                                  {option === question.answer && (
                                    <CheckCircle className='h-4 w-4 text-green-500' />
                                  )}
                                  {option === userAnswer && !isCorrect && (
                                    <XCircle className='h-4 w-4 text-red-500' />
                                  )}
                                </div>
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
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className='mt-6 flex justify-center'>
              <Button
                onClick={() => {
                  setRetakeMode(true);
                  setQuizState({
                    currentQuestion: 0,
                    answers: {},
                    isSubmitted: false,
                    score: 0,
                    timeElapsed: 0,
                  });
                  setStartTime(null);
                }}
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = (quizState.currentQuestion / questions.length) * 100;
  const isLastQuestion = quizState.currentQuestion === questions.length - 1;

  const startQuiz = () => {
    setStartTime(Date.now());
  };

  const selectAnswer = (questionId: string, answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  if (!startTime) {
    return (
      <div className='mx-auto max-w-4xl p-6'>
        <Card>
          <CardHeader className='text-center'>
            <div className='mb-4 flex justify-center'>
              <HelpCircle className='h-16 w-16 text-blue-500' />
            </div>
            <CardTitle className='text-2xl'>Quiz: {data.title}</CardTitle>
            <p className='text-muted-foreground'>
              {data.description || 'Test your knowledge with this quiz'}
            </p>
          </CardHeader>
          <CardContent className='space-y-4 text-center'>
            <div className='text-muted-foreground flex justify-center gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <HelpCircle className='h-4 w-4' />
                {questions.length} Questions
              </div>
              <div className='flex items-center gap-1'>
                <Timer className='h-4 w-4' />
                {typeof data.timer === 'number' && data.timer > 0
                  ? `${data.timer} min`
                  : 'No time limit'}
              </div>
            </div>
            <Button onClick={startQuiz} size='lg'>
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizState.isSubmitted) {
    return (
      <div className='mx-auto max-w-4xl p-6'>
        <Card>
          <CardHeader className='text-center'>
            <div className='mb-4 flex justify-center'>
              <Trophy className='h-16 w-16 text-yellow-500' />
            </div>
            <CardTitle className='text-2xl'>Quiz Complete!</CardTitle>
            <div className='mt-4 flex justify-center gap-4'>
              <Badge variant='secondary' className='px-4 py-2 text-lg'>
                Score: {quizState.score}%
              </Badge>
              <Badge variant='outline' className='px-4 py-2 text-lg'>
                Time: {Math.floor(quizState.timeElapsed / 60)}:
                {(quizState.timeElapsed % 60).toString().padStart(2, '0')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {questions.map((question, index) => {
                const userAnswer = quizState.answers[question.id];
                const isCorrect = userAnswer === question.answer;

                return (
                  <Card key={question.id}>
                    <CardContent className='p-4'>
                      <div className='mb-3 flex items-start gap-2'>
                        {isCorrect ? (
                          <CheckCircle className='mt-0.5 h-5 w-5 text-green-500' />
                        ) : (
                          <XCircle className='mt-0.5 h-5 w-5 text-red-500' />
                        )}
                        <div className='flex-1'>
                          <p className='mb-2 font-medium'>
                            Question {index + 1}: {question.text}
                          </p>
                          <div className='space-y-2'>
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`rounded border p-3 ${
                                  option === userAnswer
                                    ? isCorrect
                                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                                    : option === question.answer
                                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                      : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                                }`}
                              >
                                <div className='flex items-center gap-2'>
                                  {option}
                                  {option === question.answer && (
                                    <CheckCircle className='h-4 w-4 text-green-500' />
                                  )}
                                  {option === userAnswer && !isCorrect && (
                                    <XCircle className='h-4 w-4 text-red-500' />
                                  )}
                                </div>
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
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>
                Question {quizState.currentQuestion + 1} of {questions.length}
              </CardTitle>
              <p className='text-muted-foreground'>{currentQuestion.text}</p>
            </div>
            <Badge variant='outline'>
              {typeof data.timer === 'number' && data.timer > 0
                ? `${Math.max(0, Math.floor((data.timer * 60 - quizState.timeElapsed) / 60))}:${String(Math.max(0, (data.timer * 60 - quizState.timeElapsed) % 60)).padStart(2, '0')}`
                : `${Math.floor(quizState.timeElapsed / 60)}:${(quizState.timeElapsed % 60).toString().padStart(2, '0')}`}
            </Badge>
          </div>
          <Progress value={progress} className='mt-4' />
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-3'>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  quizState.answers[currentQuestion.id] === option
                    ? 'default'
                    : 'outline'
                }
                className='h-auto w-full justify-start p-4 text-left'
                onClick={() => selectAnswer(currentQuestion.id, option)}
              >
                <span className='mr-2 font-medium'>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <div className='flex justify-between'>
            <Button
              variant='outline'
              onClick={previousQuestion}
              disabled={quizState.currentQuestion === 0}
            >
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={submitQuiz}
                disabled={
                  isLoading ||
                  Object.keys(quizState.answers).length < questions.length
                }
              >
                {isLoading ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                disabled={!quizState.answers[currentQuestion.id]}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
