/*
  Warnings:

  - The values [Pending,Running,Success,Error,Timeout,Failed] on the enum `CodingSubmissionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CodingSubmissionStatus_new" AS ENUM ('InQueue', 'Processing', 'Accepted', 'WrongAnswer', 'TimeLimitExceeded', 'CompilationError', 'RuntimeError', 'InternalError', 'ExecFormatError');
ALTER TABLE "CodingSubmission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "CodingSubmission" ALTER COLUMN "status" TYPE "CodingSubmissionStatus_new" USING ("status"::text::"CodingSubmissionStatus_new");
ALTER TYPE "CodingSubmissionStatus" RENAME TO "CodingSubmissionStatus_old";
ALTER TYPE "CodingSubmissionStatus_new" RENAME TO "CodingSubmissionStatus";
DROP TYPE "CodingSubmissionStatus_old";
ALTER TABLE "CodingSubmission" ALTER COLUMN "status" SET DEFAULT 'InQueue';
COMMIT;

-- AlterTable
ALTER TABLE "CodingSubmission" ALTER COLUMN "status" SET DEFAULT 'InQueue';
