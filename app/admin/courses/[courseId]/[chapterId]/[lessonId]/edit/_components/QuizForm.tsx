"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Plus, Trash2, HelpCircle } from "lucide-react";
import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { updateQuizQuestions } from "../../../../edit/quiz-actions";

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

export function QuizForm({ lesson }: QuizFormProps) {
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description || "");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    const { error } = await tryCatch(
      updateQuizQuestions({
        lessonId: lesson.id,
        questionIds: questions.map((q) => q.id),
      })
    );

    if (error) {
      toast.error("Failed to update quiz");
    } else {
      toast.success("Quiz updated successfully");
    }
    setIsLoading(false);
  };

  const addQuestion = (questionId: string) => {
    // This would typically fetch the question details from the test bank
    const mockQuestion: Question = {
      id: questionId,
      text: "Sample question text",
      type: "MCQ",
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option B",
      explanation: "This is the correct answer because...",
    };
    setQuestions((prev) => [...prev, mockQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  //todo:add this
  // const moveQuestion = (fromIndex: number, toIndex: number) => {
  //   const newQuestions = [...questions];
  //   const [movedQuestion] = newQuestions.splice(fromIndex, 1);
  //   newQuestions.splice(toIndex, 0, movedQuestion);
  //   setQuestions(newQuestions);
  // };

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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quiz Questions</CardTitle>
            <Button onClick={() => addQuestion(`question-${Date.now()}`)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
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
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-1 cursor-grab"
                      >
                        <GripVertical className="w-4 h-4" />
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            Question {index + 1}
                          </Badge>
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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Quiz"}
        </Button>
      </div>
    </div>
  );
}
