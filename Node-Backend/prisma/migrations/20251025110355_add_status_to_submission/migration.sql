/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "Submission_userId_questionId_key" ON "Submission"("userId", "questionId");
