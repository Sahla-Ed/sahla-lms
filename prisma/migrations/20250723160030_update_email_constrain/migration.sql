/*
  Warnings:

  - A unique constraint covering the columns `[email,tenantId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_tenantId_key" ON "user"("email", "tenantId");
