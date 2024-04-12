/*
  Warnings:

  - You are about to drop the column `acivity_anticipation_time` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `activity_duration` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `activity_pourpose_satisfaction` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `activity_satisfaction` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `activity_schedule` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `meeting_software_satisfaction` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `speaker_satisfaction` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `speaker_strategies_satisfaction` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - You are about to drop the column `suggestions` on the `ChatSafisfactionForm` table. All the data in the column will be lost.
  - Added the required column `activity_lenght` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_number_of_participants` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_organization` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_relevance_for_scholar` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_knowledge_adquisition` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_knowledge_expansion` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_match_necesities` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_personal_development` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_satisfaction` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker_foment_scholar_to_participate` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker_knowledge_of_activity` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker_knowledge_transmition` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker_theory_practice_mix` to the `ChatSafisfactionForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatSafisfactionForm" DROP COLUMN "acivity_anticipation_time",
DROP COLUMN "activity_duration",
DROP COLUMN "activity_pourpose_satisfaction",
DROP COLUMN "activity_satisfaction",
DROP COLUMN "activity_schedule",
DROP COLUMN "meeting_software_satisfaction",
DROP COLUMN "speaker_satisfaction",
DROP COLUMN "speaker_strategies_satisfaction",
DROP COLUMN "suggestions",
ADD COLUMN     "activity_lenght" INTEGER NOT NULL,
ADD COLUMN     "activity_number_of_participants" INTEGER NOT NULL,
ADD COLUMN     "activity_organization" INTEGER NOT NULL,
ADD COLUMN     "activity_relevance_for_scholar" INTEGER NOT NULL,
ADD COLUMN     "content_knowledge_adquisition" INTEGER NOT NULL,
ADD COLUMN     "content_knowledge_expansion" INTEGER NOT NULL,
ADD COLUMN     "content_match_necesities" INTEGER NOT NULL,
ADD COLUMN     "content_personal_development" INTEGER NOT NULL,
ADD COLUMN     "general_satisfaction" INTEGER NOT NULL,
ADD COLUMN     "speaker_foment_scholar_to_participate" INTEGER NOT NULL,
ADD COLUMN     "speaker_knowledge_of_activity" INTEGER NOT NULL,
ADD COLUMN     "speaker_knowledge_transmition" INTEGER NOT NULL,
ADD COLUMN     "speaker_theory_practice_mix" INTEGER NOT NULL;
