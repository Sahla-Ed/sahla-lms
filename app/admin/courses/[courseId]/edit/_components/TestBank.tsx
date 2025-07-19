"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Brain, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, QuestionSchemaType } from "@/lib/zodSchemas";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import {
  createQuestion,
  getCourseQuestions,
  deleteQuestion,
  updateQuestion,
} from "../quiz-actions";

interface Question {
  id: string;
  text: string;
  type: "MCQ" | "TRUE_FALSE";
  options: string[];
  answer: string;
  explanation?: string;
}

interface TestBankProps {
  courseId: string;
}

export function TestBank({ courseId }: TestBankProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [aiTopic, setAiTopic] = useState("");
  const [aiCount, setAiCount] = useState(5);

  const form = useForm<QuestionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      courseId,
      text: "",
      type: "MCQ",
      options: [],
      answer: "",
      explanation: "",
    },
  });

  const fetchAndSetQuestions = useCallback(async () => {
    setIsFetching(true);
    try {
      const fetchedQuestions = await getCourseQuestions(courseId);
      setQuestions(
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
      toast.error("Failed to load questions");
    } finally {
      setIsFetching(false);
    }
  }, [courseId]);

  // Fetch initial questions
  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions]);

  // Reset form when dialog opens/closes or when editing state changes
  useEffect(() => {
    if (isDialogOpen) {
      if (editingQuestion) {
        form.reset({
          courseId,
          text: editingQuestion.text,
          type: editingQuestion.type,
          options: editingQuestion.options,
          answer: editingQuestion.answer,
          explanation: editingQuestion.explanation || "",
        });
      } else {
        form.reset({
          courseId,
          text: "",
          type: "MCQ",
          options: [],
          answer: "",
          explanation: "",
        });
      }
    } else {
      setEditingQuestion(null);
    }
  }, [isDialogOpen, editingQuestion, form, courseId]);

  const onSubmit = async (data: QuestionSchemaType) => {
    setIsLoading(true);
    const action = editingQuestion
      ? updateQuestion(editingQuestion.id, data)
      : createQuestion(data);

    const { error } = await tryCatch(action);

    if (error) {
      toast.error(
        `Failed to ${editingQuestion ? "update" : "create"} question`
      );
    } else {
      toast.success(
        `Question ${editingQuestion ? "updated" : "created"} successfully`
      );
      setIsDialogOpen(false);
      await fetchAndSetQuestions();
    }
    setIsLoading(false);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const { error } = await tryCatch(deleteQuestion(questionId, courseId));

    if (error) {
      toast.error("Failed to delete question");
    } else {
      toast.success("Question deleted successfully");
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsDialogOpen(true);
  };

  const generateQuestions = async (topic: string, count: number) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, numQuestions: count }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate questions");
      }

      const { questions: generatedQuestions } = await res.json();

      if (!generatedQuestions || generatedQuestions.length === 0) {
        toast.warning(
          "AI did not generate any questions. Please try a different topic."
        );
        return;
      }

      for (const q of generatedQuestions) {
        await createQuestion({ ...q, courseId });
      }

      toast.success(
        `Generated and saved ${generatedQuestions.length} new questions!`
      );
      await fetchAndSetQuestions();
    } catch (e) {
      toast.error((e as Error).message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addOption = () => {
    form.setValue("options", [...(form.getValues("options") || []), ""]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options") || [];
    const optionToRemove = currentOptions[index];
    const newOptions = currentOptions.filter((_, i) => i !== index);
    form.setValue("options", newOptions);

    if (form.getValues("answer") === optionToRemove) {
      form.setValue("answer", "");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(form.getValues("options") || [])];
    newOptions[index] = value;
    form.setValue("options", newOptions);
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
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Course Questions</h3>
          <p className="text-sm text-muted-foreground">
            Manage questions for quizzes in this course
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-2xl"
              aria-describedby="add-question-desc"
            >
              <DialogHeader>
                <DialogTitle>
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </DialogTitle>
                <DialogDescription id="add-question-desc">
                  Fill in the details to add or edit a question for this
                  course&apos;s quiz.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="text">Question Text</Label>
                  <Textarea
                    id="text"
                    {...form.register("text")}
                    placeholder="Enter your question here..."
                  />
                  {form.formState.errors.text && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.text.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="type">Question Type</Label>
                  <Select
                    value={form.watch("type")}
                    onValueChange={(value) => {
                      form.setValue("type", value as "MCQ" | "TRUE_FALSE");
                      if (value === "TRUE_FALSE") {
                        form.setValue("options", ["True", "False"]);
                        form.setValue("answer", "");
                      } else {
                        form.setValue("options", []);
                        form.setValue("answer", "");
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCQ">Multiple Choice</SelectItem>
                      <SelectItem value="TRUE_FALSE">True/False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.watch("type") === "MCQ" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Options</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(form.watch("options") || []).map((option, index) => (
                        <div
                          key={`option-input-${index}`}
                          className="flex gap-2"
                        >
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) =>
                              updateOption(index, e.target.value)
                            }
                          />
                          {(form.watch("options") || []).length > 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeOption(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {(form.watch("options") || []).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Click &quot;Add Option&quot; to start adding choices
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="answer">Correct Answer</Label>
                  {form.watch("type") === "MCQ" ? (
                    <Select
                      value={form.watch("answer")}
                      onValueChange={(value) => form.setValue("answer", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          new Set(
                            form
                              .watch("options")
                              ?.filter(
                                (option) => option && option.trim() !== ""
                              )
                          )
                        ).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      value={form.watch("answer")}
                      onValueChange={(value) => form.setValue("answer", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">True</SelectItem>
                        <SelectItem value="False">False</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    {...form.register("explanation")}
                    placeholder="Explain why this is the correct answer..."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {editingQuestion ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                Generate with AI
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="ai-generate-desc">
              <DialogHeader>
                <DialogTitle>Generate Questions with AI</DialogTitle>
                <DialogDescription id="ai-generate-desc">
                  Use AI to generate quiz questions based on a topic and number
                  of questions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., JavaScript fundamentals"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select
                    value={String(aiCount)}
                    onValueChange={(v) => setAiCount(Number(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => generateQuestions(aiTopic, aiCount)}
                  disabled={isGenerating || !aiTopic}
                  className="w-full"
                >
                  {isGenerating && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Generate Questions
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">No questions yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Question
              </Button>
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-base">{question.text}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{question.type}</Badge>
                      <Badge variant="outline">
                        {question.options.length} options
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div
                      key={`question-${question.id}-option-${index}`}
                      className={`p-2 rounded border ${
                        option === question.answer
                          ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                      }`}
                    >
                      {option}
                      {option === question.answer && (
                        <Badge variant="secondary" className="ml-2">
                          Correct
                        </Badge>
                      )}
                    </div>
                  ))}
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
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
