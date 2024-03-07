/*
  Warnings:

  - You are about to drop the column `collage_schedule` on the `ScholarCollagePeriod` table. All the data in the column will be lost.
  - You are about to drop the column `inscription_proof` on the `ScholarCollagePeriod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScholarCollagePeriod" DROP COLUMN "collage_schedule",
DROP COLUMN "inscription_proof",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
