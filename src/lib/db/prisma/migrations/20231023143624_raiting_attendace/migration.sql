/*
  Warnings:

  - You are about to drop the column `rating` on the `Workshop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "WorkshopAttendance" ADD COLUMN     "raiting" DOUBLE PRECISION;
