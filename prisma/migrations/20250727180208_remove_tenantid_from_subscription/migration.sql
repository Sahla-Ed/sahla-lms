/*
  Warnings:

  - You are about to drop the column `tenantId` on the `subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "tenantId";
