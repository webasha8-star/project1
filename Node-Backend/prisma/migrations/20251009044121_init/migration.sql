/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `correct` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labNumber]` on the table `Lab` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labNumber` to the `Lab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleNumber` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "createdAt",
DROP COLUMN "summary",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "labNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "createdAt",
DROP COLUMN "summary",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "moduleNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correct",
DROP COLUMN "createdAt",
DROP COLUMN "question",
ADD COLUMN     "correctAnswer" TEXT,
ADD COLUMN     "questionText" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "selectedAnswer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_labNumber_key" ON "Lab"("labNumber");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
