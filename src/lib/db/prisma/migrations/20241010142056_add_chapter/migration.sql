/*
  Warnings:

  - Added the required column `chapther` to the `mentors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mentors" ADD COLUMN     "chapther" TEXT NOT NULL;
