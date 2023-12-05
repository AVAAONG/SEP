/*
  Warnings:

  - The `can_assist_to_chats` column on the `ScholarProgramInformation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `can_assist_to_workshops` column on the `ScholarProgramInformation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `can_assist_to_volunteers` column on the `ScholarProgramInformation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ScholarProgramInformation" DROP COLUMN "can_assist_to_chats",
ADD COLUMN     "can_assist_to_chats" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "can_assist_to_workshops",
ADD COLUMN     "can_assist_to_workshops" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "can_assist_to_volunteers",
ADD COLUMN     "can_assist_to_volunteers" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "ScholarCanAssist";
