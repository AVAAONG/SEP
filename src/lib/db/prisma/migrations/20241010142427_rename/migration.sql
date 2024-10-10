/*
  Warnings:

  - You are about to drop the column `chapther` on the `mentors` table. All the data in the column will be lost.
  - Added the required column `chapter` to the `mentors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mentors" DROP COLUMN "chapther",
ADD COLUMN     "chapter" TEXT NOT NULL;
