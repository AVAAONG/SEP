/*
  Warnings:

  - You are about to drop the column `chat_speaker_id` on the `ScholarProgramInformation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ScholarProgramInformation_chat_speaker_id_key";

-- AlterTable
ALTER TABLE "ScholarProgramInformation" DROP COLUMN "chat_speaker_id";
