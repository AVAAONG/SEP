-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('SCHEDULED', 'SENT', 'IN_PROGRESS', 'DONE', 'ATTENDANCE_CHECKED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ScholarAttendance" AS ENUM ('ENROLLED', 'WAITING_LIST', 'ATTENDED', 'NOT_ATTENDED', 'JUSTIFY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "KindOfVolunteer" AS ENUM ('EXTERNO', 'INTERNO');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('CITIZEN_EXERCISE', 'LEADERSHIP', 'SELF_MANAGEMENT', 'ICT', 'ENTREPRENEURSHIP');

-- CreateEnum
CREATE TYPE "WorkshopYear" AS ENUM ('I', 'II', 'III', 'IV', 'V');

-- CreateEnum
CREATE TYPE "KinOfUser" AS ENUM ('ADMIN', 'SCHOLAR');

-- CreateEnum
CREATE TYPE "AvaaYear" AS ENUM ('I', 'II', 'III', 'IV', 'V', 'V0', 'TODOS');

-- CreateEnum
CREATE TYPE "AdminRoles" AS ENUM ('STAFF_PROEXCELENCIA', 'STAFF_COMMUNICATIONS', 'STAFF_ADMON', 'STAFF_MENTORSHIP', 'STAFF_RECRUITMENT', 'COMITEE', 'PROYECT', 'CHAT');

-- CreateEnum
CREATE TYPE "EvaluationScale" AS ENUM ('CERO_TO_TEN', 'CERO_TO_FIVE', 'CERO_TO_TWENTY');

-- CreateEnum
CREATE TYPE "StudyRegime" AS ENUM ('SEMESTER', 'QUARTER', 'ANNUAL');

-- CreateEnum
CREATE TYPE "StudyArea" AS ENUM ('ARCHITECTURE_URBANISM', 'HEALTH_SCIENCES', 'JURIDICAL_POLITICAL_SCIENCES', 'SOCIAL_SCIENCES', 'HUMANITIES_EDUCATION', 'STEM', 'OTHER');

-- CreateEnum
CREATE TYPE "Collages" AS ENUM ('ENAHP', 'UCSAR', 'UNIMET', 'IUPSM', 'UCV', 'UCAB', 'USB', 'UNE', 'UNEXPO', 'UNESR', 'UMA', 'UNEARTE', 'UJMV', 'UMC', 'UPEL', 'CUR', 'UNEFA', 'USM', 'UNEXCA', 'UAH', 'UBV');

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
    "scholar_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,
    "satisfaction_form_filled" BOOLEAN,

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
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "raiting" DOUBLE PRECISION,
    "place" TEXT NOT NULL,
    "photoAlbum" TEXT,
    "kind_of_volunteer" TEXT NOT NULL,
    "constancia" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerAttendance" (
    "id" TEXT NOT NULL,
    "scholarId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,

    CONSTRAINT "VolunteerAttendance_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "kind_of_user" "KinOfUser" NOT NULL,
    "adminId" TEXT,
    "scholarId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "allowedEmail" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "responsibility" TEXT NOT NULL,
    "chapter_id" TEXT,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Controller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "allowedActions" JSONB[],

    CONSTRAINT "Controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCollageInformation" (
    "id" TEXT NOT NULL,
    "academic_load_completed" BOOLEAN,
    "collage" "Collages",
    "career" TEXT NOT NULL,
    "study_area" "StudyArea",
    "evaluation_scale" "EvaluationScale" NOT NULL,
    "study_regime" "StudyRegime" NOT NULL,

    CONSTRAINT "ScholarCollageInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCollagePeriod" (
    "id" TEXT NOT NULL,
    "current_academic_period" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "class_modality" "Modality" NOT NULL,
    "record" TEXT,
    "scholar_collage_nformation_id" TEXT,

    CONSTRAINT "ScholarCollagePeriod_pkey" PRIMARY KEY ("id")
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
    "scholar_cva_information_id" TEXT,

    CONSTRAINT "ScholarCvaModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholar" (
    "id" TEXT NOT NULL,
    "allowedEmail" TEXT,
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
    "is_chat_speaker" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Scholar_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "ScholarProgramInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Probation" (
    "id" TEXT NOT NULL,
    "kind_of_probation" "ScholarStatus" NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "ending_date" TIMESTAMP(3) NOT NULL,
    "done_at_the_moment" JSONB NOT NULL,
    "probation_reason" TEXT NOT NULL,
    "agreement" JSONB NOT NULL,
    "meetings" TIMESTAMP(3)[],
    "next_meeting" TIMESTAMP(3) NOT NULL,
    "scholar_id" TEXT NOT NULL,

    CONSTRAINT "Probation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToScholar" (
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
CREATE UNIQUE INDEX "ChatsTempData_chat_id_key" ON "ChatsTempData"("chat_id");

-- CreateIndex
CREATE INDEX "VolunteerAttendance_volunteerId_idx" ON "VolunteerAttendance"("volunteerId");

-- CreateIndex
CREATE INDEX "VolunteerAttendance_scholarId_idx" ON "VolunteerAttendance"("scholarId");

-- CreateIndex
CREATE INDEX "Workshop_title_modality_activity_status_asociated_skill_idx" ON "Workshop"("title", "modality", "activity_status", "asociated_skill");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopTempData_workshop_id_key" ON "WorkshopTempData"("workshop_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_scholar_id_idx" ON "WorkshopAttendance"("scholar_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_workshop_id_idx" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_adminId_key" ON "User"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "User_scholarId_key" ON "User"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_allowedEmail_key" ON "AdminProfile"("allowedEmail");

-- CreateIndex
CREATE INDEX "AdminProfile_chapter_id_idx" ON "AdminProfile"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_name_key" ON "Controller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_admin_id_key" ON "Controller"("admin_id");

-- CreateIndex
CREATE INDEX "ScholarCollagePeriod_scholar_collage_nformation_id_idx" ON "ScholarCollagePeriod"("scholar_collage_nformation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCvaModule_scholar_cva_information_id_module_key" ON "ScholarCvaModule"("scholar_cva_information_id", "module");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_allowedEmail_key" ON "Scholar"("allowedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_dni_key" ON "Scholar"("dni");

-- CreateIndex
CREATE INDEX "Scholar_program_information_id_idx" ON "Scholar"("program_information_id");

-- CreateIndex
CREATE INDEX "Scholar_collage_information_id_idx" ON "Scholar"("collage_information_id");

-- CreateIndex
CREATE INDEX "Scholar_cva_information_id_idx" ON "Scholar"("cva_information_id");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_program_information_id_collage_information_id_cva_i_key" ON "Scholar"("program_information_id", "collage_information_id", "cva_information_id");

-- CreateIndex
CREATE INDEX "ScholarProgramInformation_chapter_id_idx" ON "ScholarProgramInformation"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProgramInformation_chapter_id_key" ON "ScholarProgramInformation"("chapter_id");

-- CreateIndex
CREATE INDEX "Probation_scholar_id_idx" ON "Probation"("scholar_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToScholar_AB_unique" ON "_ChatToScholar"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToScholar_B_index" ON "_ChatToScholar"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkshopToWorkshopSpeaker_AB_unique" ON "_WorkshopToWorkshopSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkshopToWorkshopSpeaker_B_index" ON "_WorkshopToWorkshopSpeaker"("B");

-- AddForeignKey
ALTER TABLE "ChatAttendance" ADD CONSTRAINT "ChatAttendance_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAttendance" ADD CONSTRAINT "ChatAttendance_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatsTempData" ADD CONSTRAINT "ChatsTempData_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerAttendance" ADD CONSTRAINT "VolunteerAttendance_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ScholarProgramInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerAttendance" ADD CONSTRAINT "VolunteerAttendance_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopTempData" ADD CONSTRAINT "WorkshopTempData_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopAttendance" ADD CONSTRAINT "WorkshopAttendance_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopAttendance" ADD CONSTRAINT "WorkshopAttendance_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controller" ADD CONSTRAINT "Controller_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "AdminProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCollagePeriod" ADD CONSTRAINT "ScholarCollagePeriod_scholar_collage_nformation_id_fkey" FOREIGN KEY ("scholar_collage_nformation_id") REFERENCES "ScholarCollageInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCvaModule" ADD CONSTRAINT "ScholarCvaModule_scholar_cva_information_id_fkey" FOREIGN KEY ("scholar_cva_information_id") REFERENCES "ScholarCVAInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholar" ADD CONSTRAINT "Scholar_program_information_id_fkey" FOREIGN KEY ("program_information_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholar" ADD CONSTRAINT "Scholar_collage_information_id_fkey" FOREIGN KEY ("collage_information_id") REFERENCES "ScholarCollageInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholar" ADD CONSTRAINT "Scholar_cva_information_id_fkey" FOREIGN KEY ("cva_information_id") REFERENCES "ScholarCVAInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarProgramInformation" ADD CONSTRAINT "ScholarProgramInformation_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Probation" ADD CONSTRAINT "Probation_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToScholar" ADD CONSTRAINT "_ChatToScholar_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToScholar" ADD CONSTRAINT "_ChatToScholar_B_fkey" FOREIGN KEY ("B") REFERENCES "Scholar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkshopToWorkshopSpeaker" ADD CONSTRAINT "_WorkshopToWorkshopSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkshopToWorkshopSpeaker" ADD CONSTRAINT "_WorkshopToWorkshopSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkshopSpeaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
