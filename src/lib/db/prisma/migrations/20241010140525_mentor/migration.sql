/*
  Warnings:

  - You are about to drop the `Mentee_mentor_activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mentor_mentee` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MetorRecruitmentStatus" AS ENUM ('ACCEPTED', 'PENDING', 'NOT_ACCEPTED');

-- CreateEnum
CREATE TYPE "MentorStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'ASSIGNED', 'RETIRED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Collages" ADD VALUE 'UC';
ALTER TYPE "Collages" ADD VALUE 'UNITEC';

-- DropForeignKey
ALTER TABLE "Mentee_mentor_activities" DROP CONSTRAINT "Mentee_mentor_activities_mentor_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "Mentor_mentee" DROP CONSTRAINT "Mentor_mentee_mentorId_fkey";

-- DropTable
DROP TABLE "Mentee_mentor_activities";

-- DropTable
DROP TABLE "Mentor";

-- DropTable
DROP TABLE "Mentor_mentee";

-- DropEnum
DROP TYPE "MentorMenteeStatus";

-- DropEnum
DROP TYPE "MentorProgramStatus";

-- CreateTable
CREATE TABLE "mentor_mentees" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "obsevation" TEXT,
    "scholar_id" TEXT NOT NULL,

    CONSTRAINT "mentor_mentees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentors" (
    "id" TEXT NOT NULL,
    "photo" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "residence" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "employed" BOOLEAN NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "work_experience" TEXT NOT NULL,
    "related_experience" TEXT,
    "other_activities" TEXT,
    "cv" TEXT NOT NULL,
    "speaks_other_lang" BOOLEAN NOT NULL,
    "other_lang" TEXT,
    "lang_level" "Level",
    "interests" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "mentor_reason" TEXT NOT NULL,
    "prev_mentor_exp" BOOLEAN NOT NULL,
    "prev_mentor_desc" TEXT,
    "skills_strengths" TEXT NOT NULL,
    "trust_techniques" TEXT NOT NULL,
    "mentee_support" TEXT NOT NULL,
    "time_commitment" TEXT NOT NULL,
    "ideal_mentee" TEXT NOT NULL,
    "group_activities" BOOLEAN NOT NULL,
    "instagram" TEXT,
    "linkedin" TEXT,
    "referral_source" TEXT NOT NULL,
    "iesa_cert" BOOLEAN,
    "iesa_cert_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "recruitment_status" "MetorRecruitmentStatus" NOT NULL DEFAULT 'PENDING',
    "recruitment_observation" TEXT,
    "status" "MentorStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "mentors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mentors_id_number_key" ON "mentors"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "mentors_email_key" ON "mentors"("email");

-- AddForeignKey
ALTER TABLE "mentor_mentees" ADD CONSTRAINT "mentor_mentees_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
