/*
  Warnings:

  - You are about to drop the `_ChatToScholar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChatToScholar" DROP CONSTRAINT "_ChatToScholar_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToScholar" DROP CONSTRAINT "_ChatToScholar_B_fkey";

-- AlterTable
ALTER TABLE "Scholar" ADD COLUMN     "chat_speaker_id" TEXT;

-- DropTable
DROP TABLE "_ChatToScholar";

-- CreateTable
CREATE TABLE "ChatSpeaker" (
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

    CONSTRAINT "ChatSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToChatSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToChatSpeaker_AB_unique" ON "_ChatToChatSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToChatSpeaker_B_index" ON "_ChatToChatSpeaker"("B");

-- AddForeignKey
ALTER TABLE "_ChatToChatSpeaker" ADD CONSTRAINT "_ChatToChatSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToChatSpeaker" ADD CONSTRAINT "_ChatToChatSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "ChatSpeaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
