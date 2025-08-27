import z from 'zod';

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const courseStatus = ['Draft', 'Published', 'Archived'] as const;

export const courseCategories = [
  'Development',
  'Business',
  'Finance',
  'IT & Software',
  'Office Productivity',
  'Personal Development',
  'Design',
  'Marketing',
  'Health & Fitness',
  'Music',
  'Teaching & Academics',
] as const;

export const lessonTypes = ['VIDEO', 'QUIZ', 'CODING'] as const;

export const getCourseSchema = (t: (key: string) => string) => z.object({
  title: z
    .string()
    .min(3, { message: t('course.titleMin') })
    .max(100, { message: t('course.titleMax') }),
  description: z
    .string()
    .min(3, { message: t('course.descriptionMin') }),
  fileKey: z.string().optional(),
  price: z.number().min(1, { message: t('course.priceMin') }),
  duration: z
    .number()
    .min(1, { message: t('course.durationMin') })
    .max(500, { message: t('course.durationMax') }),
  level: z.enum(courseLevels, {
    message: t('course.levelRequired'),
  }),
  category: z.enum(courseCategories, {
    message: t('course.categoryRequired'),
  }),
  smallDescription: z
    .string()
    .min(3, { message: t('course.smallDescriptionMin') })
    .max(200, { message: t('course.smallDescriptionMax') }),
  slug: z
    .string()
    .min(3, { message: t('course.slugMin') }),
  status: z.enum(courseStatus, {
    message: t('course.statusRequired'),
  }),
});


export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  courseId: z.string().uuid({ message: 'Invalid course id' }),
});

export const questionTypes = ['MCQ', 'TRUE_FALSE'] as const;

export const questionSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(questionTypes),
  explanation: z.string().optional(),
  options: z.array(z.string()).optional(),
  answer: z.string().min(1, 'Answer is required'),
});

export const quizQuestionSchema = z.object({
  questionIds: z.array(z.string()),
  lessonId: z.string(),
  timer: z.number().int().min(1).optional().nullable(),
});
const aiQuestionSchema = questionSchema
  .omit({ courseId: true })
  .refine(
    (data) => {
      if (data.type === 'MCQ') {
        return data.options && data.options.length >= 2;
      }

      return true;
    },
    {
      message: 'MCQ questions must have at least 2 options.',
    },
  )
  .refine(
    (data) => {
      if (data.type === 'MCQ' && data.options) {
        return data.options.includes(data.answer);
      }
      if (data.type === 'TRUE_FALSE') {
        return ['True', 'False'].includes(data.answer);
      }
      return true;
    },
    {
      message: 'The answer must be one of the provided options.',
    },
  );
export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  type: z.enum(lessonTypes),
  chapterId: z.uuid({ message: 'Invalid chapter ID' }),
  courseId: z.uuid({ message: 'Invalid course ID' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .optional(),

  videoKey: z.string().optional(),
  thumbnailKey: z.string().optional(),

  codingExerciseId: z.uuid().optional(),
  codingSubmissionId: z.uuid().optional(),

  // Coding exercise fields - only used when type is 'CODING'
  codingLanguage: z.string().optional(),
  htmlStarterCode: z.string().optional(),
  cssStarterCode: z.string().optional(),
  jsStarterCode: z.string().optional(),
  serverStarterCode: z.string().optional(),
  codingInstructions: z.string().optional(),
});

export const codingExerciseSchema = z.object({
  lessonId: z.uuid('Invalid lesson ID'),
  tenantId: z.string().default(''),
  starterCode: z.string().default('// Write your code here'),
  solutionCode: z.string().optional(),
  instructions: z.string().optional(),
  testCases: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Test cases must be valid JSON' },
    ),
  timeLimit: z.number().int().positive().nullish(),
});

// Zod schema for code submission
export const codeSubmissionSchema = z.object({
  lessonId: z.uuid(),
  userId: z.string(),
  tenantId: z.string().default('').optional(),
  language: z.string(),
  submissionType: z.enum(['Web', 'Programming']),
  // For programming languages
  code: z.string().optional(),
  // For web development
  htmlCode: z.string().optional(),
  cssCode: z.string().optional(),
  jsCode: z.string().optional(),
});

export type CodeSubmissionType = z.infer<typeof codeSubmissionSchema>;
export type CodingExerciseSchemaType = z.infer<typeof codingExerciseSchema>;
// export type CourseSchemaType = z.infer<typeof courseSchema>;
export type CourseSchemaType = z.infer<ReturnType<typeof getCourseSchema>>;
export type QuestionSchemaType = z.infer<typeof questionSchema>;
export type QuizQuestionSchemaType = z.infer<typeof quizQuestionSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
export const aiQuizGenerationSchema = z.object({
  questions: z.array(aiQuestionSchema),
});




export type ZodValidationKeys = 
  | `course.${keyof (typeof import('../messages/tenant-en.json'))['ZodValidation']['course']}`
  | `chapter.${keyof (typeof import('../messages/tenant-en.json'))['ZodValidation']['chapter']}`;