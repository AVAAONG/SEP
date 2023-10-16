/*
  Warnings:

  - You are about to drop the `ChatSpeaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkshopSpeaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToChatSpeaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WorkshopToWorkshopSpeaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "KindOfSpeaker" AS ENUM ('CHAT', 'WORKSHOPS');

-- DropForeignKey
ALTER TABLE "_ChatToChatSpeaker" DROP CONSTRAINT "_ChatToChatSpeaker_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToChatSpeaker" DROP CONSTRAINT "_ChatToChatSpeaker_B_fkey";

-- DropForeignKey
ALTER TABLE "_WorkshopToWorkshopSpeaker" DROP CONSTRAINT "_WorkshopToWorkshopSpeaker_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkshopToWorkshopSpeaker" DROP CONSTRAINT "_WorkshopToWorkshopSpeaker_B_fkey";

-- DropTable
DROP TABLE "ChatSpeaker";

-- DropTable
DROP TABLE "WorkshopSpeaker";

-- DropTable
DROP TABLE "_ChatToChatSpeaker";

-- DropTable
DROP TABLE "_WorkshopToWorkshopSpeaker";

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "email" TEXT,
    "birthdate" TIMESTAMP(3),
    "years_of_exp" INTEGER,
    "job_title" TEXT,
    "job_company" TEXT,
    "actual_city" TEXT,
    "actual_country" TEXT,
    "image" TEXT,
    "description" TEXT,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "linkedin_user" TEXT,
    "facebook_user" TEXT,
    "phone_number" TEXT,
    "curriculum" TEXT,
    "gender" "Gender",
    "speaker_kind" "KindOfSpeaker" NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SpeakerToWorkshop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToSpeaker_AB_unique" ON "_ChatToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToSpeaker_B_index" ON "_ChatToSpeaker"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpeakerToWorkshop_AB_unique" ON "_SpeakerToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_SpeakerToWorkshop_B_index" ON "_SpeakerToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "_ChatToSpeaker" ADD CONSTRAINT "_ChatToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToSpeaker" ADD CONSTRAINT "_ChatToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToWorkshop" ADD CONSTRAINT "_SpeakerToWorkshop_A_fkey" FOREIGN KEY ("A") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToWorkshop" ADD CONSTRAINT "_SpeakerToWorkshop_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
