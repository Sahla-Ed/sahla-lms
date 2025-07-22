-- CreateEnum
CREATE TYPE "CodingSubmissionStatus" AS ENUM ('Pending', 'Running', 'Success', 'Error', 'Timeout', 'Failed');

-- AlterEnum
ALTER TYPE "LessonType" ADD VALUE 'CODING';

-- CreateTable
CREATE TABLE "CodingExercise" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'javascript',
    "starterCode" TEXT NOT NULL DEFAULT '',
    "testCases" JSONB,
    "solutionCode" TEXT,
    "instructions" TEXT,
    "timeLimit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodingExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "output" TEXT,
    "status" "CodingSubmissionStatus" NOT NULL DEFAULT 'Pending',
    "score" DOUBLE PRECISION,
    "passed" BOOLEAN,
    "attemptNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodingExercise_lessonId_key" ON "CodingExercise"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CodingSubmission_userId_key" ON "CodingSubmission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CodingSubmission_lessonId_key" ON "CodingSubmission"("lessonId");

-- CreateIndex
CREATE INDEX "CodingSubmission_userId_lessonId_idx" ON "CodingSubmission"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CodingSubmission_userId_lessonId_attemptNumber_key" ON "CodingSubmission"("userId", "lessonId", "attemptNumber");

-- AddForeignKey
ALTER TABLE "CodingExercise" ADD CONSTRAINT "CodingExercise_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingSubmission" ADD CONSTRAINT "CodingSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingSubmission" ADD CONSTRAINT "CodingSubmission_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
