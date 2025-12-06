/*
  Warnings:

  - You are about to drop the column `description` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `labNumber` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `moduleNumber` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `options` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropIndex
DROP INDEX "public"."Lab_labNumber_key";

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "description",
DROP COLUMN "labNumber";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "description",
DROP COLUMN "moduleNumber";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
DROP COLUMN "questionText",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
DROP COLUMN "options",
ADD COLUMN     "options" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "public"."Answer";

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "selected" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
