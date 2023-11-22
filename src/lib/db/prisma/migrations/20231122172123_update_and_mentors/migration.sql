-- CreateEnum
CREATE TYPE "MentorStaus" AS ENUM ('ACCEPTED', 'NOT_ACCEPTED', 'PENDING');

-- CreateEnum
CREATE TYPE "MentorStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CHANGED');

-- AlterTable
ALTER TABLE "Scholar" ADD COLUMN     "entrepreneurship_kind" TEXT,
ADD COLUMN     "entrepreneurship_name" TEXT,
ADD COLUMN     "entrepreneurship_services" TEXT,
ADD COLUMN     "entrepreneurship_social_media" TEXT,
ADD COLUMN     "have_entrepreneurship" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "job_amount_of_hours" TEXT,
ADD COLUMN     "job_modality" "Modality",
ADD COLUMN     "kind_of_job" TEXT;

-- AlterTable
ALTER TABLE "ScholarCollageInformation" ADD COLUMN     "career_schedule" TEXT,
ADD COLUMN     "inscription_comprobant" TEXT;

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "cell_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "city_of_residence" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "company_position" TEXT NOT NULL,
    "other_activities" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "instagram_profile" TEXT NOT NULL,
    "linkedin_profile" TEXT NOT NULL,
    "facebook_profile" TEXT NOT NULL,
    "twitter_profile" TEXT NOT NULL,
    "personal_qualities" TEXT NOT NULL,
    "areas_of_interest" TEXT NOT NULL,
    "areas_of_improvement" TEXT NOT NULL,
    "how_know_us" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "main_qualities" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,
    "status" "MentorStaus" NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentee_mentor_activities" (
    "id" TEXT NOT NULL,
    "mentor_menteeId" TEXT NOT NULL,

    CONSTRAINT "Mentee_mentor_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor_mentee" (
    "id" TEXT NOT NULL,
    "status" "MentorStatus" NOT NULL,
    "mentorId" TEXT,

    CONSTRAINT "Mentor_mentee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_dni_key" ON "Mentor"("dni");

-- AddForeignKey
ALTER TABLE "Mentee_mentor_activities" ADD CONSTRAINT "Mentee_mentor_activities_mentor_menteeId_fkey" FOREIGN KEY ("mentor_menteeId") REFERENCES "Mentor_mentee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor_mentee" ADD CONSTRAINT "Mentor_mentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
