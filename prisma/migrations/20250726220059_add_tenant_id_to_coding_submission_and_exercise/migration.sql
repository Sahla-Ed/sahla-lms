-- AlterTable
ALTER TABLE "CodingExercise" ADD COLUMN     "tenantId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CodingSubmission" ADD COLUMN     "tenantId" TEXT NOT NULL DEFAULT '';
