/*
  Warnings:

  - You are about to drop the column `scholarId` on the `JobInformation` table. All the data in the column will be lost.
  - You are about to drop the column `why_dint_get_job` on the `JobInformation` table. All the data in the column will be lost.
  - The `job_schedule` column on the `JobInformation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[scholar_id]` on the table `JobInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scholar_id` to the `JobInformation` table without a default value. This is not possible if the table is not empty.
  - Made the column `job_title` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_modality` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kind_of_job` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "JobSchedule" AS ENUM ('PART_TIME', 'FULL_TIME', 'WEEKENDS');

-- DropForeignKey
ALTER TABLE "JobInformation" DROP CONSTRAINT "JobInformation_scholarId_fkey";

-- DropIndex
DROP INDEX "JobInformation_scholarId_key";

-- AlterTable
ALTER TABLE "JobInformation" DROP COLUMN "scholarId",
DROP COLUMN "why_dint_get_job",
ADD COLUMN     "scholar_id" TEXT NOT NULL,
ADD COLUMN     "why_didnt_get_job" TEXT,
ALTER COLUMN "job_title" SET NOT NULL,
ALTER COLUMN "job_modality" SET NOT NULL,
DROP COLUMN "job_schedule",
ADD COLUMN     "job_schedule" "JobSchedule",
ALTER COLUMN "kind_of_job" SET NOT NULL;

-- DropEnum
DROP TYPE "JobHours";

-- CreateIndex
CREATE UNIQUE INDEX "JobInformation_scholar_id_key" ON "JobInformation"("scholar_id");

-- AddForeignKey
ALTER TABLE "JobInformation" ADD CONSTRAINT "JobInformation_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
