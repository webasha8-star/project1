-- CreateTable
CREATE TABLE "FAQQuestion" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "reply" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FAQQuestion_pkey" PRIMARY KEY ("id")
);
