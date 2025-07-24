-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "LessonProgress" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "LessonQuestion" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "verification" ADD COLUMN     "tenantId" TEXT;
