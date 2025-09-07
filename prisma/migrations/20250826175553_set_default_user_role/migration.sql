-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_tenantId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
