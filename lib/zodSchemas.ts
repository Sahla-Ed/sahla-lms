import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const lessonTypes = ["VIDEO", "QUIZ"] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  fileKey: z.string().optional(),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, {
    message: "Level is required",
  }),
  category: z.enum(courseCategories, {
    message: "Category is required",
  }),
  smallDescription: z
    .string()
    .min(3, { message: "Small Description must be at least 3 characters long" })
    .max(200, {
      message: "Small Description must be at most 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),
  status: z.enum(courseStatus, {
    message: "Status is required",
  }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  courseId: z.string().uuid({ message: "Invalid course id" }),
});

export const questionTypes = ["MCQ", "TRUE_FALSE"] as const;

export const questionSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  text: z.string().min(1, "Question text is required"),
  type: z.enum(questionTypes),
  explanation: z.string().optional(),
  options: z.array(z.string()).optional(),
  answer: z.string().min(1, "Answer is required"),
});

export const quizQuestionSchema = z.object({
  questionIds: z.array(z.string()),
  lessonId: z.string(),
  timer: z.number().int().min(1).optional().nullable(),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  type: z.enum(lessonTypes),
  chapterId: z.string().uuid({ message: "Invalid chapter ID" }),
  courseId: z.string().uuid({ message: "Invalid course ID" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .optional(),

  videoKey: z.string().optional(),
  thumbnailKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type QuestionSchemaType = z.infer<typeof questionSchema>;
export type QuizQuestionSchemaType = z.infer<typeof quizQuestionSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
