-- AlterTable
ALTER TABLE "public"."CodingExercise" ALTER COLUMN "tenantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "videoKey" TEXT;
