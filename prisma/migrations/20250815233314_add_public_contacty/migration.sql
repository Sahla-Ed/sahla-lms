/*
  Warnings:

  - A unique constraint covering the columns `[token,tenantId]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."session_token_key";

-- CreateTable
CREATE TABLE "public"."ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_tenantId_key" ON "public"."session"("token", "tenantId");
