-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('SCHEDULED', 'SENT', 'IN_PROGRESS', 'DONE', 'ATTENDANCE_CHECKED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ScholarAttendance" AS ENUM ('ENROLLED', 'ATTENDED', 'NOT_ATTENDED', 'JUSTIFY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('CITIZEN_EXERCISE', 'LEADERSHIP', 'SELF_MANAGEMENT', 'ICT', 'ENTREPRENEURSHIP');

-- CreateEnum
CREATE TYPE "WorkshopYear" AS ENUM ('I', 'II', 'III', 'IV', 'V');

-- CreateEnum
CREATE TYPE "AvaaYear" AS ENUM ('I', 'II', 'III', 'IV', 'V', 'V0', 'TODOS');

-- CreateEnum
CREATE TYPE "AdminRoles" AS ENUM ('STAFF_PROEXCELENCIA', 'STAFF_COMMUNICATIONS', 'STAFF_ADMON', 'STAFF_MENTORSHIP', 'STAFF_RECRUITMENT', 'COMITEE', 'PROYECT', 'CHAT');

-- CreateEnum
CREATE TYPE "EvaluationScale" AS ENUM ('CERO_TO_TEN', 'CERO_TO_FIVE', 'CERO_TO_TWENTY');

-- CreateEnum
CREATE TYPE "StudyRegime" AS ENUM ('SEMESTER', 'QUARTER', 'ANNUAL');

-- CreateEnum
CREATE TYPE "StudyArea" AS ENUM ('BASIC_SCIENCES', 'HEALTH_SCIENCES', 'STEM', 'SOCIAL_ECONOMIC_SCIENCES', 'HUMANITIES_EDUCATION', 'ARTS', 'ARCHITECTURE_URBANISM', 'OTHER');

-- CreateEnum
CREATE TYPE "Collages" AS ENUM ('UCV', 'USB', 'UCAB', 'UNIMET', 'USM', 'UJMV', 'UCSAR', 'IUTA', 'IUT', 'IUTJOSE', 'IUNE', 'ENAHP', 'ICEE', 'IUAII', 'IFH', 'CAE', 'IUTRBF', 'UPEL', 'IPSM');

-- CreateEnum
CREATE TYPE "Careers" AS ENUM ('INGENIERIA_DE_SISTEMAS', 'INGENIERIA_DE_COMPUTACION', 'INGENIERIA_DE_TELECOMUNICACIONES', 'INGENIERIA_DE_INFORMATICA', 'INGENIERIA_DE_TELEMATICA', 'INGENIERIA_DE_SOFTWARE', 'INGENIERIA_DE_SISTEMAS_COMPUTACIONALES', 'INGENIERIA_DE_SISTEMAS_DE_INFORMACION', 'INGENIERIA_DE_SISTEMAS_DE_COMUNICACIONES');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ZULIA', 'CARABOBO', 'CARACAS');

-- CreateEnum
CREATE TYPE "ScholarStatus" AS ENUM ('PROBATORIO_1', 'PROBATORIO_2', 'NORMAL');

-- CreateEnum
CREATE TYPE "ScholarCanAssist" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "ScholarCondition" AS ENUM ('ACTIVE', 'RESIGNATION', 'WITHDRAWAL', 'ALUMNI');

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
    "chat_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,
    "scholar_id" TEXT NOT NULL,

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
    "chat_id" TEXT NOT NULL,

    CONSTRAINT "ChatSpeaker_pkey" PRIMARY KEY ("id")
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
    "hours" DOUBLE PRECISION NOT NULL,
    "year" "WorkshopYear"[],
    "modality" "Modality" NOT NULL,
    "asociated_skill" "Skill" NOT NULL,
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
    "satisfaction_form_filled" BOOLEAN,

    CONSTRAINT "WorkshopAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "chapterName" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAccount" (
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

    CONSTRAINT "AdminAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "lastLogin" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "role" "AdminRoles" NOT NULL,
    "responsibility" TEXT NOT NULL,
    "chapterId" TEXT,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminVerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ScholarCollageInformation" (
    "id" TEXT NOT NULL,
    "academic_load_completed" BOOLEAN,
    "collage" "Collages",
    "career" "Careers",
    "study_area" "StudyArea",
    "evaluation_scale" "EvaluationScale" NOT NULL,
    "study_regime" "StudyRegime" NOT NULL,

    CONSTRAINT "ScholarCollageInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCollageAverageQualificationByPeriod" (
    "id" TEXT NOT NULL,
    "current_academic_period" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "class_modality" "Modality" NOT NULL,
    "record" TEXT,
    "scholarCollageInformationId" TEXT,

    CONSTRAINT "ScholarCollageAverageQualificationByPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCVAInformation" (
    "id" TEXT NOT NULL,
    "is_in_cva" BOOLEAN NOT NULL DEFAULT false,
    "not_started_cva_reason" TEXT,
    "cva_location" TEXT,
    "cva_modality" TEXT,
    "certificate" TEXT,

    CONSTRAINT "ScholarCVAInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCvaModule" (
    "id" TEXT NOT NULL,
    "module" INTEGER NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL,
    "record" TEXT,
    "scholarCVAInformationId" TEXT,

    CONSTRAINT "ScholarCvaModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "is_working" BOOLEAN NOT NULL DEFAULT false,
    "job_title" TEXT,
    "job_company" TEXT,
    "local_phone_number" TEXT,
    "cell_phone_Number" TEXT,
    "whatsapp_number" TEXT,
    "state_of_origin" TEXT,
    "address" TEXT,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "facebook_user" TEXT,
    "linkedin_user" TEXT,
    "program_information_id" TEXT,
    "collage_information_id" TEXT,
    "cva_information_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarProgramInformation" (
    "id" TEXT NOT NULL,
    "avaa_admission_year" TIMESTAMP(3) NOT NULL,
    "scholar_status" "ScholarStatus" NOT NULL DEFAULT 'NORMAL',
    "scholar_condition" "ScholarCondition",
    "can_assist_to_chats" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_workshops" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_volunteers" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "chapter_id" TEXT,
    "is_chat_speaker" BOOLEAN NOT NULL DEFAULT false,
    "chat_speaker_id" TEXT,

    CONSTRAINT "ScholarProgramInformation_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_WorkshopToWorkshopSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Chat_title_modality_activity_status_level_idx" ON "Chat"("title", "modality", "activity_status", "level");

-- CreateIndex
CREATE INDEX "ChatAttendance_chat_id_idx" ON "ChatAttendance"("chat_id");

-- CreateIndex
CREATE INDEX "ChatAttendance_scholar_id_idx" ON "ChatAttendance"("scholar_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatAttendance_chat_id_scholar_id_key" ON "ChatAttendance"("chat_id", "scholar_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatsTempData_chat_id_key" ON "ChatsTempData"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatSpeaker_chat_id_key" ON "ChatSpeaker"("chat_id");

-- CreateIndex
CREATE INDEX "Workshop_title_modality_activity_status_asociated_skill_idx" ON "Workshop"("title", "modality", "activity_status", "asociated_skill");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopTempData_workshop_id_key" ON "WorkshopTempData"("workshop_id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopAttendance_workshop_id_key" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_scholar_id_idx" ON "WorkshopAttendance"("scholar_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_workshop_id_idx" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE INDEX "AdminAccount_userId_idx" ON "AdminAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAccount_provider_providerAccountId_key" ON "AdminAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_sessionToken_key" ON "AdminSession"("sessionToken");

-- CreateIndex
CREATE INDEX "AdminSession_userId_idx" ON "AdminSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_chapterId_idx" ON "AdminUser"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminVerificationToken_token_key" ON "AdminVerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "AdminVerificationToken_identifier_token_key" ON "AdminVerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "ScholarCollageAverageQualificationByPeriod_scholarCollageIn_idx" ON "ScholarCollageAverageQualificationByPeriod"("scholarCollageInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCvaModule_scholarCVAInformationId_module_key" ON "ScholarCvaModule"("scholarCVAInformationId", "module");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE INDEX "User_program_information_id_idx" ON "User"("program_information_id");

-- CreateIndex
CREATE INDEX "User_collage_information_id_idx" ON "User"("collage_information_id");

-- CreateIndex
CREATE INDEX "User_cva_information_id_idx" ON "User"("cva_information_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_program_information_id_collage_information_id_cva_info_key" ON "User"("program_information_id", "collage_information_id", "cva_information_id");

-- CreateIndex
CREATE INDEX "ScholarProgramInformation_chapter_id_idx" ON "ScholarProgramInformation"("chapter_id");

-- CreateIndex
CREATE INDEX "ScholarProgramInformation_chat_speaker_id_idx" ON "ScholarProgramInformation"("chat_speaker_id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProgramInformation_chapter_id_chat_speaker_id_key" ON "ScholarProgramInformation"("chapter_id", "chat_speaker_id");

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
CREATE UNIQUE INDEX "_WorkshopToWorkshopSpeaker_AB_unique" ON "_WorkshopToWorkshopSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkshopToWorkshopSpeaker_B_index" ON "_WorkshopToWorkshopSpeaker"("B");
