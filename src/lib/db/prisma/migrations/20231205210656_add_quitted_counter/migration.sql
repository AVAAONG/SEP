/*
  Warnings:

  - You are about to drop the column `can_assist_to_chats` on the `ScholarProgramInformation` table. All the data in the column will be lost.
  - You are about to drop the column `can_assist_to_volunteers` on the `ScholarProgramInformation` table. All the data in the column will be lost.
  - You are about to drop the column `can_assist_to_workshops` on the `ScholarProgramInformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScholarProgramInformation" DROP COLUMN "can_assist_to_chats",
DROP COLUMN "can_assist_to_volunteers",
DROP COLUMN "can_assist_to_workshops",
ADD COLUMN     "quitted_chats_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quitted_volunteers_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quitted_workshops_count" INTEGER NOT NULL DEFAULT 0;
