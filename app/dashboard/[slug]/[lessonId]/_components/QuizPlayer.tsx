"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Timer,
  Trophy,
  HeartCrack,
} from "lucide-react";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { submitQuizAttempt } from "../quiz-actions";

interface QuizPlayerProps {
  data: LessonContentType;
}

interface Question {
  id: string;
  text: string;
  type: "MCQ" | "TRUE_FALSE";
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

  // Timer effect
  useEffect(() => {
    if (startTime && !quizState.isSubmitted) {
      timerRef.current = setInterval(() => {
        setQuizState((prev) => {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          // If timer is set and time is up, auto-submit
          if (
            typeof data.timer === "number" &&
            data.timer > 0 &&
            elapsed >= data.timer * 60
          ) {
            clearInterval(timerRef.current!);
            submitQuiz();
            return { ...prev, timeElapsed: data.timer * 60 };
          }
          return { ...prev, timeElapsed: elapsed };
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    if (quizState.isSubmitted && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [startTime, quizState.isSubmitted]);

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

  // Early return if no questions
  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-16 h-16 text-blue-500" />
            </div>
            <CardTitle className="text-2xl">Quiz: {data.title}</CardTitle>
            <p className="text-muted-foreground">
              {data.description || "Test your knowledge with this quiz"}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>No questions available for this quiz</p>
              <p className="text-sm">
                Please contact your instructor to add questions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If completedAttempt, show result page with retake option
  if (quizState.isSubmitted && completedAttempt) {
    const attempt = data.latestQuizAttempt;
    const isFail = quizState.score < 50;
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isFail ? (
                <HeartCrack className="w-16 h-16 text-red-500" />
              ) : (
                <Trophy className="w-16 h-16 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Score: {quizState.score}%
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Time: {Math.floor(quizState.timeElapsed / 60)}:
                {(quizState.timeElapsed % 60).toString().padStart(2, "0")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer =
                  attempt &&
                  attempt.answers.find((a: any) => a.questionId === question.id)
                    ?.answer;
                const isCorrect = userAnswer === question.answer;
                return (
                  <Card key={question.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}: {question.text}
                          </p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded border ${
                                  option === userAnswer
                                    ? isCorrect
                                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                      : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                                    : option === question.answer
                                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                      : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {option}
                                  {option === question.answer && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                  {option === userAnswer && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                Explanation:
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
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
            <div className="flex justify-center mt-6">
              <Button onClick={() => window.location.reload()}>
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

  const submitQuiz = async () => {
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
      })
    );

    if (error) {
      toast.error("Failed to submit quiz");
    } else {
      setQuizState((prev) => ({
        ...prev,
        isSubmitted: true,
        score,
        timeElapsed,
      }));
      toast.success("Quiz submitted successfully!");
    }
    setIsLoading(false);
  };

  if (!startTime) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-16 h-16 text-blue-500" />
            </div>
            <CardTitle className="text-2xl">Quiz: {data.title}</CardTitle>
            <p className="text-muted-foreground">
              {data.description || "Test your knowledge with this quiz"}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                {questions.length} Questions
              </div>
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {typeof data.timer === "number" && data.timer > 0
                  ? `${data.timer} min`
                  : "No time limit"}
              </div>
            </div>
            <Button onClick={startQuiz} size="lg">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizState.isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Score: {quizState.score}%
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Time: {Math.floor(quizState.timeElapsed / 60)}:
                {(quizState.timeElapsed % 60).toString().padStart(2, "0")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = quizState.answers[question.id];
                const isCorrect = userAnswer === question.answer;

                return (
                  <Card key={question.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}: {question.text}
                          </p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded border ${
                                  option === userAnswer
                                    ? isCorrect
                                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                      : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                                    : option === question.answer
                                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                      : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {option}
                                  {option === question.answer && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                  {option === userAnswer && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                Explanation:
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
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
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Question {quizState.currentQuestion + 1} of {questions.length}
              </CardTitle>
              <p className="text-muted-foreground">{currentQuestion.text}</p>
            </div>
            <Badge variant="outline">
              {typeof data.timer === "number" && data.timer > 0
                ? `${Math.max(0, Math.floor((data.timer * 60 - quizState.timeElapsed) / 60))}:${String(Math.max(0, (data.timer * 60 - quizState.timeElapsed) % 60)).padStart(2, "0")}`
                : `${Math.floor(quizState.timeElapsed / 60)}:${(quizState.timeElapsed % 60).toString().padStart(2, "0")}`}
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  quizState.answers[currentQuestion.id] === option
                    ? "default"
                    : "outline"
                }
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => selectAnswer(currentQuestion.id, option)}
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
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
                {isLoading ? "Submitting..." : "Submit Quiz"}
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
