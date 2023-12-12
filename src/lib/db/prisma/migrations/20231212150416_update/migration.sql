/*
  Warnings:

  - You are about to drop the column `calendar_id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `calendar_id` on the `Workshop` table. All the data in the column will be lost.
  - Added the required column `kindOfWorkshop` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "calendar_id",
ADD COLUMN     "calendar_ids" TEXT[];

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "calendar_id",
ADD COLUMN     "calendar_ids" TEXT[],
ADD COLUMN     "kindOfWorkshop" TEXT NOT NULL;
