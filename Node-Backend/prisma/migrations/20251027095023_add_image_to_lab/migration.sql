/*
  Warnings:

  - You are about to drop the column `status` on the `Submission` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Submission_userId_questionId_key";

-- AlterTable
ALTER TABLE "Lab" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "status";
