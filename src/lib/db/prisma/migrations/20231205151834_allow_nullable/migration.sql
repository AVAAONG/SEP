/*
  Warnings:

  - Made the column `is_working` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobInformation" ALTER COLUMN "is_working" SET NOT NULL,
ALTER COLUMN "job_start_date" DROP NOT NULL,
ALTER COLUMN "job_end_date" DROP NOT NULL;
