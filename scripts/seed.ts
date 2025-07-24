// TODO:this should be updated
// import { auth } from '../lib/auth';
// import { stripe } from '../lib/stripe';
// import { prisma } from '../lib/db';
//
// const config = {
//   users: {
//     admin: {
//       name: 'Admin User',
//       email: 'admin@example.com',
//       password: 'password123',
//     },
//     regularUserCount: 5,
//     enrollmentCount: 3,
//   },
//   course: {
//     title: 'Advanced TypeScript',
//     description:
//       'A deep dive into advanced TypeScript concepts, covering generics, decorators, and more complex patterns to elevate your code quality and reusability. This course is designed for developers who already have a basic understanding of TypeScript and want to take their skills to the next level.',
//     smallDescription:
//       'Master TypeScript generics, decorators, and advanced patterns to write more robust and scalable code.',
//     price: 99,
//     duration: 20,
//     level: 'Advanced' as const,
//     category: 'Development' as const,
//     status: 'Published' as const,
//     slug: 'advanced-typescript',
//     fileKey:
//       'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/typescript-course-thumbnail.png',
//     chapters: [
//       {
//         title: 'Generics In-Depth',
//         lessons: [
//           {
//             title: 'Introduction to Generics',
//             type: 'VIDEO' as const,
//             description:
//               'Understand the fundamentals of generics and how they enable you to write flexible, reusable code.',
//             // --- VIDEO URL UPDATED ---
//             videoKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/8f656005-62ea-483f-bf19-3a4604f4c2c4-2025-04-24_2022-18-55.mkv.mp4',
//             thumbnailKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/typescript-course-thumbnail.png',
//           },
//           {
//             title: 'Generic Constraints with `extends`',
//             type: 'VIDEO' as const,
//             description:
//               'Learn how to use constraints to limit the types that can be used with a generic function or class.',
//             // --- VIDEO URL UPDATED ---
//             videoKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/8f656005-62ea-483f-bf19-3a4604f4c2c4-2025-04-24_2022-18-55.mkv.mp4',
//             thumbnailKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/typescript-course-thumbnail.png',
//           },
//         ],
//       },
//       {
//         title: 'Decorators and Metadata',
//         lessons: [
//           {
//             title: 'Understanding Decorators',
//             type: 'VIDEO' as const,
//             description:
//               'Explore the powerful decorator pattern in TypeScript for modifying classes and their members.',
//             // --- VIDEO URL UPDATED ---
//             videoKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/8f656005-62ea-483f-bf19-3a4604f4c2c4-2025-04-24_2022-18-55.mkv.mp4',
//             thumbnailKey:
//               'https://pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev/typescript-course-thumbnail.png',
//           },
//           {
//             title: 'Chapter Review Quiz',
//             type: 'QUIZ' as const,
//             description: 'Test your knowledge on generics and decorators.',
//             timer: 15, // 15 minutes
//           },
//         ],
//       },
//     ],
//   },
//   quiz: {
//     questions: [
//       {
//         text: 'What is a generic in TypeScript?',
//         type: 'MCQ' as const,
//         options: [
//           'A type of function',
//           'A reusable type definition that can work with multiple types',
//           'A class decorator',
//           'A CSS framework',
//         ],
//         answer: 'A reusable type definition that can work with multiple types',
//         explanation:
//           'Generics allow you to create reusable components that can work with a variety of types instead of a single one.',
//       },
//       {
//         text: 'The `keyof` keyword is used to get the union of keys from an object type.',
//         type: 'TRUE_FALSE' as const,
//         options: ['True', 'False'],
//         answer: 'True',
//         explanation:
//           '`keyof` creates a string literal union type of all public property names of an object.',
//       },
//       {
//         text: 'Which of the following is NOT a valid decorator type?',
//         type: 'MCQ' as const,
//         options: [
//           'Class Decorator',
//           'Method Decorator',
//           'Variable Decorator',
//           'Parameter Decorator',
//         ],
//         answer: 'Variable Decorator',
//         explanation:
//           'Decorators can be attached to classes, methods, accessors, properties, or parameters, but not to local variables.',
//       },
//     ],
//   },
// };
//
// async function main() {
//   console.log('🌱 Starting seed script...');
//
//   // --- 1. Clean up existing data ---
//   console.log('🗑️  Cleaning up database...');
//   await prisma.userAnswer.deleteMany({});
//   await prisma.quizAttempt.deleteMany({});
//   await prisma.lessonQuestion.deleteMany({});
//   await prisma.question.deleteMany({});
//   await prisma.lessonProgress.deleteMany({});
//   await prisma.enrollment.deleteMany({});
//   await prisma.lesson.deleteMany({});
//   await prisma.chapter.deleteMany({});
//   await prisma.course.deleteMany({});
//   await prisma.account.deleteMany({});
//   await prisma.session.deleteMany({});
//   await prisma.user.deleteMany({});
//   console.log('✅ Database cleaned.');
//
//   // --- 2. Seed Admin User ---
//   console.log('👤 Seeding admin user...');
//   const admin = await auth('testTenant').api.signUpEmail({
//     body: {
//       name: 'Admin User',
//       email: config.users.admin.email,
//       password: config.users.admin.password,
//     },
//   });
//   await prisma.user.update({
//     where: { id: admin.user.id },
//     data: { role: 'admin', emailVerified: true },
//   });
//   console.log(`✅ Admin user created: ${admin.user.email}`);
//
//   // --- 3. Seed Regular Users ---
//   console.log(`👥 Seeding ${config.users.regularUserCount} regular users...`);
//   const regularUsers = [];
//   for (let i = 1; i <= config.users.regularUserCount; i++) {
//     const user = await auth('testTenant').api.signUpEmail({
//       body: {
//         name: `User ${i}`,
//         email: `user${i}@example.com`,
//         password: 'password123',
//       },
//     });
//     await prisma.user.update({
//       where: { id: user.user.id },
//       data: { emailVerified: true },
//     });
//     regularUsers.push(user);
//     console.log(`✅ Regular user created: ${user.user.email}`);
//   }
//
//   // --- 4. Seed Course, Chapters, and Lessons ---
//   console.log('📚 Seeding course...');
//   const stripeProduct = await stripe.products.create({
//     name: config.course.title,
//     description: config.course.smallDescription,
//     default_price_data: {
//       currency: 'usd',
//       unit_amount: config.course.price * 100,
//     },
//   });
//
//   // Prisma create call for course
//   const courseData = { ...config.course };
//   // Omitting chapters from the top-level create data, as it's handled relationally
//   const { chapters, ...courseCreateData } = courseData;
//
//   const course = await prisma.course.create({
//     data: {
//       ...courseCreateData,
//       userId: admin.user.id,
//       stripePriceId: stripeProduct.default_price as string,
//       chapter: {
//         create: chapters.map((chapter, chapterIndex) => ({
//           title: chapter.title,
//           position: chapterIndex + 1,
//           lessons: {
//             create: chapter.lessons.map((lesson, lessonIndex) => ({
//               ...lesson,
//               position: lessonIndex + 1,
//             })),
//           },
//         })),
//       },
//     },
//     include: { chapter: { include: { lessons: true } } },
//   });
//   console.log(`✅ Course "${course.title}" created.`);
//
//   // --- 5. Seed Quiz Questions ---
//   console.log('❓ Seeding quiz questions...');
//   const createdQuestions = await prisma.question.createManyAndReturn({
//     data: config.quiz.questions.map((q) => ({
//       courseId: course.id,
//       text: q.text,
//       type: q.type,
//       options: q.options,
//       answer: q.answer,
//       explanation: q.explanation,
//     })),
//   });
//   console.log(`✅ ${createdQuestions.length} questions created.`);
//
//   // --- 6. Associate questions with the quiz lesson ---
//   const quizLesson = course.chapter
//     .flatMap((c) => c.lessons)
//     .find((l) => l.type === 'QUIZ');
//
//   if (quizLesson) {
//     console.log(
//       `🔗 Associating questions with lesson "${quizLesson.title}"...`,
//     );
//     await prisma.lessonQuestion.createMany({
//       data: createdQuestions.map((q, index) => ({
//         lessonId: quizLesson.id,
//         questionId: q.id,
//         position: index + 1,
//       })),
//     });
//     console.log(`✅ Questions associated with the quiz.`);
//   }
//
//   // --- 7. Seed Enrollments and Progress ---
//   console.log(
//     `🎓 Enrolling ${config.users.enrollmentCount} users in the course...`,
//   );
//   const usersToEnroll = regularUsers.slice(0, config.users.enrollmentCount);
//   for (const user of usersToEnroll) {
//     await prisma.enrollment.create({
//       data: {
//         userId: user.user.id,
//         courseId: course.id,
//         status: 'Active',
//         amount: course.price * 100,
//       },
//     });
//
//     // Mark some lessons as completed for enrolled users
//     for (const lesson of course.chapter.flatMap((c) => c.lessons)) {
//       if (lesson.type === 'VIDEO') {
//         await prisma.lessonProgress.create({
//           data: {
//             userId: user.user.id,
//             lessonId: lesson.id,
//             completed: true,
//           },
//         });
//       }
//     }
//     console.log(`✅ Enrolled ${user.user.email} in "${course.title}"`);
//   }
//
//   // --- 8. Seed a Quiz Attempt for the first user ---
//   const firstUser = usersToEnroll[0];
//   if (quizLesson && firstUser) {
//     console.log(`📝 Seeding quiz attempt for ${firstUser.user.email}...`);
//     const attempt = await prisma.quizAttempt.create({
//       data: {
//         userId: firstUser.user.id,
//         lessonId: quizLesson.id,
//         score: 67, // Scored 2 out of 3
//         timeElapsed: 320, // 5 minutes 20 seconds
//         completedAt: new Date(),
//       },
//     });
//
//     // Seed answers for the attempt
//     await prisma.userAnswer.createMany({
//       data: [
//         {
//           attemptId: attempt.id,
//           questionId: createdQuestions[0].id,
//           answer: createdQuestions[0].answer, // Correct
//           isCorrect: true,
//         },
//         {
//           attemptId: attempt.id,
//           questionId: createdQuestions[1].id,
//           answer: 'False', // Incorrect
//           isCorrect: false,
//         },
//         {
//           attemptId: attempt.id,
//           questionId: createdQuestions[2].id,
//           answer: createdQuestions[2].answer, // Correct
//           isCorrect: true,
//         },
//       ],
//     });
//     // Mark the quiz lesson itself as complete for this user
//     await prisma.lessonProgress.create({
//       data: {
//         userId: firstUser.user.id,
//         lessonId: quizLesson.id,
//         completed: true,
//       },
//     });
//     console.log(`✅ Quiz attempt created for ${firstUser.user.email}.`);
//   }
//
//   console.log('🎉 Seed script finished successfully!');
// }
//
// export default () => {
//   main()
//     .catch((e) => {
//       console.error(e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// };
