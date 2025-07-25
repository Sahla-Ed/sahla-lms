-- CreateTable
CREATE TABLE "session_transfer_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "session_transfer_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_transfer_token_token_key" ON "session_transfer_token"("token");

-- AddForeignKey
ALTER TABLE "session_transfer_token" ADD CONSTRAINT "session_transfer_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
