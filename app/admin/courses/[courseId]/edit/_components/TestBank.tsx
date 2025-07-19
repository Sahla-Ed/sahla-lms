"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Brain, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, QuestionSchemaType } from "@/lib/zodSchemas";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { createQuestion } from "../quiz-actions";

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

  const onSubmit = async (data: QuestionSchemaType) => {
    setIsLoading(true);
    const { error } = await tryCatch(createQuestion(data));

    if (error) {
      toast.error("Failed to create question");
    } else {
      toast.success("Question created successfully");
      setIsDialogOpen(false);
      form.reset();
      // Refresh questions list
    }
    setIsLoading(false);
  };
  //todo: implement actual ai generation
  const generateQuestions = async (topic: string, count: number) => {
    setIsGenerating(true);
    // Mock AI generation - replace with actual AI service
    const mockQuestions: Question[] = [
      {
        id: `mock-${Date.now()}-1`,
        text: `What is ${topic}?`,
        type: "MCQ",
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option B",
        explanation: "This is the correct answer because...",
      },
      {
        id: `mock-${Date.now()}-2`,
        text: `${topic} is always true.`,
        type: "TRUE_FALSE",
        options: ["True", "False"],
        answer: "False",
        explanation: "This statement is not always true because...",
      },
    ];

    // Add generated questions to the list
    setQuestions((prev) => [...prev, ...mockQuestions.slice(0, count)]);
    setIsGenerating(false);
    toast.success(`Generated ${Math.min(count, 2)} questions`);
  };

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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </DialogTitle>
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
                    onValueChange={(value) =>
                      form.setValue("type", value as "MCQ" | "TRUE_FALSE")
                    }
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
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {["A", "B", "C", "D"].map((option) => (
                        <Input
                          key={option}
                          placeholder={`Option ${option}`}
                          value={
                            form.watch(
                              `options.${option.charCodeAt(0) - 65}`
                            ) || ""
                          }
                          onChange={(e) => {
                            const options = form.watch("options") || [];
                            options[option.charCodeAt(0) - 65] = e.target.value;
                            form.setValue("options", options);
                          }}
                        />
                      ))}
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
                        {form.watch("options")?.map((option, index) => (
                          <SelectItem key={index} value={option}>
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Questions with AI</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., JavaScript fundamentals"
                  />
                </div>
                <div>
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select defaultValue="5">
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
                  onClick={() => generateQuestions("JavaScript", 5)}
                  disabled={isGenerating}
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
                      onClick={() => {
                        setEditingQuestion(question);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuestions((prev) =>
                          prev.filter((q) => q.id !== question.id)
                        );
                        toast.success("Question deleted");
                      }}
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
                      key={index}
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
