"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Plus, Trash2, HelpCircle, Loader2 } from "lucide-react";
import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import {
  updateQuizQuestions,
  getCourseQuestions,
} from "../../../../edit/quiz-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface QuizFormProps {
  lesson: AdminLessonType;
  chapterId: string;
  courseId: string;
}

interface Question {
  id: string;
  text: string;
  type: "MCQ" | "TRUE_FALSE";
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
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 cursor-grab"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Question {index + 1}</Badge>
                <Badge variant="outline">{question.type}</Badge>
              </div>
              <p className="font-medium mb-2">{question.text}</p>
              <div className="space-y-1">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded text-sm ${
                      option === question.answer
                        ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "bg-gray-50 border border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                    }`}
                  >
                    {option}
                    {option === question.answer && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Correct
                      </Badge>
                    )}
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => onRemove(question.id)}
            >
              <Trash2 className="w-4 h-4" />
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
  const [description, setDescription] = useState(lesson.description || "");
  const [timer, setTimer] = useState(lesson.timer ?? "");
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
          }))
        );
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast.error("Failed to load questions from test bank");
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
    setIsLoading(true);
    // Save timer value (convert to int or null)
    const { error } = await tryCatch(
      updateQuizQuestions({
        lessonId: lesson.id,
        questionIds: questions.map((q) => q.id),
        timer: timer ? parseInt(timer as string, 10) : null,
      })
    );

    if (error) {
      toast.error("Failed to update quiz");
    } else {
      toast.success("Quiz updated successfully");
    }
    setIsLoading(false);
  };

  const addQuestion = (question: Question) => {
    // Check if question is already added
    if (questions.find((q) => q.id === question.id)) {
      toast.error("This question is already added to the quiz");
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
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Edit Quiz: {lesson.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title..."
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quiz description..."
            />
          </div>
          <div>
            <Label htmlFor="timer">
              Time limit (minutes){" "}
              <span className="text-muted-foreground">[optional]</span>
            </Label>
            <Input
              id="timer"
              type="number"
              min={1}
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              placeholder="e.g. 30"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quiz Questions</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question from Test Bank
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No questions added yet</p>
              <p className="text-sm">
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
                <div className="space-y-4">
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
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Questions from Test Bank</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {availableQuestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No questions available in test bank</p>
                <p className="text-sm">
                  Create questions in the Test Bank tab first
                </p>
              </div>
            ) : (
              availableQuestions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{question.type}</Badge>
                          {questions.find((q) => q.id === question.id) && (
                            <Badge variant="secondary">Already Added</Badge>
                          )}
                        </div>
                        <p className="font-medium mb-2">{question.text}</p>
                        <div className="space-y-1">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`p-2 rounded text-sm ${
                                option === question.answer
                                  ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800"
                                  : "bg-gray-50 border border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                              }`}
                            >
                              {option}
                              {option === question.answer && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  Correct
                                </Badge>
                              )}
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
                      {!questions.find((q) => q.id === question.id) && (
                        <Button
                          onClick={() => addQuestion(question)}
                          className="ml-4"
                        >
                          <Plus className="w-4 h-4 mr-2" />
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

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/courses/${courseId}/edit`)}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Quiz"}
        </Button>
      </div>
    </div>
  );
}
