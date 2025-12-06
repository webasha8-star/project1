/*
  Warnings:

  - You are about to drop the column `isRead` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Announcement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Announcement" DROP CONSTRAINT "Announcement_userId_fkey";

-- DropIndex
DROP INDEX "public"."Announcement_createdAt_idx";

-- DropIndex
DROP INDEX "public"."Announcement_userId_idx";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "isRead",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserAnnouncement" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "announcementId" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnnouncement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAnnouncement" ADD CONSTRAINT "UserAnnouncement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnnouncement" ADD CONSTRAINT "UserAnnouncement_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
