/*
  Warnings:

  - The values [CHAT] on the enum `KindOfSpeaker` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KindOfSpeaker_new" AS ENUM ('CHATS', 'WORKSHOPS', 'CHATS_AND_WORKSHOPS');
ALTER TABLE "Speaker" ALTER COLUMN "speaker_kind" TYPE "KindOfSpeaker_new" USING ("speaker_kind"::text::"KindOfSpeaker_new");
ALTER TYPE "KindOfSpeaker" RENAME TO "KindOfSpeaker_old";
ALTER TYPE "KindOfSpeaker_new" RENAME TO "KindOfSpeaker";
DROP TYPE "KindOfSpeaker_old";
COMMIT;
