/*
  Warnings:

  - A unique constraint covering the columns `[applicantId]` on the table `family_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicantId` to the `family_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "family_info" ADD COLUMN     "applicantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "family_info_applicantId_key" ON "family_info"("applicantId");

-- AddForeignKey
ALTER TABLE "family_info" ADD CONSTRAINT "family_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
