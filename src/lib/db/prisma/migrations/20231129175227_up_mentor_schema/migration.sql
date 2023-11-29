/*
  Warnings:

  - You are about to drop the column `areas_of_improvement` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `main_qualities` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `personal_qualities` on the `Mentor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "areas_of_improvement",
DROP COLUMN "main_qualities",
DROP COLUMN "personal_qualities",
ALTER COLUMN "birthdate" DROP NOT NULL,
ALTER COLUMN "city_of_residence" DROP NOT NULL,
ALTER COLUMN "profession" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "company_position" DROP NOT NULL,
ALTER COLUMN "other_activities" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "hobbies" DROP NOT NULL,
ALTER COLUMN "instagram_profile" DROP NOT NULL,
ALTER COLUMN "linkedin_profile" DROP NOT NULL,
ALTER COLUMN "facebook_profile" DROP NOT NULL,
ALTER COLUMN "twitter_profile" DROP NOT NULL,
ALTER COLUMN "areas_of_interest" DROP NOT NULL,
ALTER COLUMN "motivation" DROP NOT NULL,
ALTER COLUMN "curriculum" DROP NOT NULL,
ALTER COLUMN "how_know_avaa" DROP NOT NULL,
ALTER COLUMN "tiktok_profile" DROP NOT NULL;
