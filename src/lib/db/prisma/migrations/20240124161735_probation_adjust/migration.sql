/*
  Warnings:

  - You are about to drop the column `meetings` on the `Probation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Probation" DROP COLUMN "meetings",
ALTER COLUMN "agreement" SET DATA TYPE TEXT;
