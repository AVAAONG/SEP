/*
  Warnings:

  - You are about to drop the column `is_working` on the `JobInformation` table. All the data in the column will be lost.
  - Made the column `job_company` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_sector` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_start_date` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_schedule` on table `JobInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobInformation" DROP COLUMN "is_working",
ALTER COLUMN "job_company" SET NOT NULL,
ALTER COLUMN "job_sector" SET NOT NULL,
ALTER COLUMN "job_start_date" SET NOT NULL,
ALTER COLUMN "job_schedule" SET NOT NULL;
