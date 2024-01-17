/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Speaker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Speaker_email_key" ON "Speaker"("email");
