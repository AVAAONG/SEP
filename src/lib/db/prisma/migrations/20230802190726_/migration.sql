-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('IN_PERSON', 'VIRTUAL', 'HYBRID');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'DONE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ScholarAttendance" AS ENUM ('ATTENDED', 'NOT_ATTENDED', 'JUSTIFY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('CITIZEN_EXERCISE', 'LEADERSHIP', 'SELF_MANAGEMENT', 'ICT', 'ENTREPRENEURSHIP');

-- CreateEnum
CREATE TYPE "WorkshopYear" AS ENUM ('I', 'II', 'III', 'IV', 'V');

-- CreateEnum
CREATE TYPE "AvaaYear" AS ENUM ('I', 'II', 'III', 'IV', 'V', 'V0', 'TODOS');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ZULIA', 'CARABOBO', 'CARACAS');

-- CreateEnum
CREATE TYPE "ScholarStatus" AS ENUM ('PROBATORIO_1', 'PROBATORIO_2', 'CURRENT', 'ALUMNI');

-- CreateEnum
CREATE TYPE "ScholarCanAssist" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COMITEE', 'PROYECT', 'CHAT', 'SCHOLAR');

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avalible_spots" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calendar_id" TEXT,
    "start_dates" TIMESTAMP(3)[],
    "end_dates" TIMESTAMP(3)[],
    "rating" DOUBLE PRECISION,
    "modality" "Modality" NOT NULL,
    "level" "Level" NOT NULL,
    "activity_status" "ActivityStatus" NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAttendance" (
    "id" TEXT NOT NULL,
    "scholar_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,

    CONSTRAINT "ChatAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatsTempData" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "form_link" TEXT,
    "meeting_link" TEXT,
    "meeting_id" TEXT,
    "meeting_password" TEXT,
    "whatsapp_link" TEXT,

    CONSTRAINT "ChatsTempData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSpeaker" (
    "id" TEXT NOT NULL,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "gender" "Gender",
    "email" TEXT,
    "birthdate" TIMESTAMP(3),
    "image" TEXT,
    "description" TEXT,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "linkedin_user" TEXT,
    "facebook_user" TEXT,
    "phone_number" TEXT,
    "is_scholar" BOOLEAN NOT NULL DEFAULT false,
    "scholar_id" TEXT,

    CONSTRAINT "ChatSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "InternalProjectId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "externalProjectsId" TEXT,
    "raiting" DOUBLE PRECISION,
    "photoAlbum" TEXT,
    "CalendarId" TEXT,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteerAttendance" (
    "id" TEXT NOT NULL,
    "scholarId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,

    CONSTRAINT "volunteerAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avalible_spots" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calendar_id" TEXT,
    "start_dates" TIMESTAMP(3)[],
    "end_dates" TIMESTAMP(3)[],
    "year" "WorkshopYear"[],
    "modality" "Modality" NOT NULL,
    "skill" "Skill" NOT NULL,
    "activity_status" "ActivityStatus" NOT NULL,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopTempData" (
    "id" TEXT NOT NULL,
    "workshop_id" TEXT NOT NULL,
    "form_link" TEXT NOT NULL,
    "meeting_link" TEXT,
    "meeting_id" TEXT,
    "meeting_password" TEXT,

    CONSTRAINT "WorkshopTempData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopSpeaker" (
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

    CONSTRAINT "WorkshopSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopAttendance" (
    "id" TEXT NOT NULL,
    "scholar_id" TEXT NOT NULL,
    "workshop_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,

    CONSTRAINT "WorkshopAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'SCHOLAR',
    "emailVerified" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ExternalProjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "instagramUser" TEXT,
    "location" TEXT,
    "website" TEXT,
    "phoneNumer" TEXT,
    "email" TEXT,
    "personInCharge" TEXT,
    "goal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternalProjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "instagramUser" TEXT,
    "KPI" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "goal" TEXT,
    "ods" TEXT,
    "bagdes" TEXT[],

    CONSTRAINT "InternalProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholar" (
    "id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'CARACAS',
    "userId" TEXT,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "dni" TEXT,
    "gender" TEXT,
    "birthdate" TIMESTAMP(3),
    "local_phone_number" TEXT,
    "cell_phone_Number" TEXT,
    "whatsapp_number" TEXT,
    "state_of_origin" TEXT,
    "current_zone" TEXT,
    "email" TEXT,
    "collage" TEXT,
    "carrer" TEXT,
    "study_area" TEXT,
    "current_academic_period" TEXT,
    "grade" TEXT,
    "grade_kind" TEXT,
    "class_modality" TEXT,
    "academic_period_type" TEXT,
    "is_in_cva" BOOLEAN DEFAULT false,
    "cva_location" TEXT,
    "cva_modality" TEXT,
    "english_level" TEXT,
    "not_started_cva_reason" TEXT,
    "avaa_admission_year" TEXT,
    "volunteering_organization_name" TEXT,
    "academic_load_completed" BOOLEAN,
    "current_status" TEXT,
    "ceremony_date" TIMESTAMP(3),
    "is_currently_working" BOOLEAN,
    "organization_name" TEXT,
    "position_held" TEXT,
    "work_modality" TEXT,
    "weekly_hours" DOUBLE PRECISION,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "facebook_user" TEXT,
    "linkedin_user" TEXT,
    "scholar_status" "ScholarStatus" NOT NULL,
    "can_assist_to_chats" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_workshops" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_volunteers" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_chat_speaker" BOOLEAN DEFAULT false,
    "internal_projects_id" TEXT,

    CONSTRAINT "Scholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToChatSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WorkshopToWorkshopSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Chat_title_modality_activity_status_level_idx" ON "Chat"("title", "modality", "activity_status", "level");

-- CreateIndex
CREATE INDEX "ChatAttendance_scholar_id_idx" ON "ChatAttendance"("scholar_id");

-- CreateIndex
CREATE INDEX "ChatAttendance_chat_id_idx" ON "ChatAttendance"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatsTempData_chat_id_key" ON "ChatsTempData"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatSpeaker_email_key" ON "ChatSpeaker"("email");

-- CreateIndex
CREATE INDEX "ChatSpeaker_scholar_id_idx" ON "ChatSpeaker"("scholar_id");

-- CreateIndex
CREATE INDEX "Volunteer_InternalProjectId_idx" ON "Volunteer"("InternalProjectId");

-- CreateIndex
CREATE INDEX "Volunteer_externalProjectsId_idx" ON "Volunteer"("externalProjectsId");

-- CreateIndex
CREATE INDEX "volunteerAttendance_volunteerId_idx" ON "volunteerAttendance"("volunteerId");

-- CreateIndex
CREATE INDEX "volunteerAttendance_scholarId_idx" ON "volunteerAttendance"("scholarId");

-- CreateIndex
CREATE INDEX "Workshop_title_modality_activity_status_skill_idx" ON "Workshop"("title", "modality", "activity_status", "skill");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopTempData_workshop_id_key" ON "WorkshopTempData"("workshop_id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopSpeaker_email_key" ON "WorkshopSpeaker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopAttendance_workshop_id_key" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_scholar_id_idx" ON "WorkshopAttendance"("scholar_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_workshop_id_idx" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_userId_key" ON "Scholar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_dni_key" ON "Scholar"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_email_key" ON "Scholar"("email");

-- CreateIndex
CREATE INDEX "Scholar_internal_projects_id_idx" ON "Scholar"("internal_projects_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToChatSpeaker_AB_unique" ON "_ChatToChatSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToChatSpeaker_B_index" ON "_ChatToChatSpeaker"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkshopToWorkshopSpeaker_AB_unique" ON "_WorkshopToWorkshopSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkshopToWorkshopSpeaker_B_index" ON "_WorkshopToWorkshopSpeaker"("B");
