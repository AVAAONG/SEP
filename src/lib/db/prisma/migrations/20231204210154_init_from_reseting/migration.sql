-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "KindOfSpeaker" AS ENUM ('CHATS', 'WORKSHOPS', 'CHATS_AND_WORKSHOPS');

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
CREATE TYPE "MentorProgramStatus" AS ENUM ('PENDING', 'ACCEPTED', 'NOT_ACCEPTED');

-- CreateEnum
CREATE TYPE "MentorMenteeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AvaaYear" AS ENUM ('I', 'II', 'III', 'IV', 'V', 'V0', 'TODOS');

-- CreateEnum
CREATE TYPE "AdminRoles" AS ENUM ('STAFF_PROEXCELENCIA', 'STAFF_COMMUNICATIONS', 'STAFF_ADMON', 'STAFF_MENTORSHIP', 'STAFF_RECRUITMENT', 'COMITEE', 'PROYECT', 'CHAT');

-- CreateEnum
CREATE TYPE "EvaluationScale" AS ENUM ('CERO_TO_TEN', 'CERO_TO_FIVE', 'CERO_TO_TWENTY');

-- CreateEnum
CREATE TYPE "StudyRegime" AS ENUM ('SEMESTER', 'QUARTER', 'QUARTIER', 'ANNUAL');

-- CreateEnum
CREATE TYPE "StudyArea" AS ENUM ('ARCHITECTURE_URBANISM', 'HEALTH_SCIENCES', 'JURIDICAL_POLITICAL_SCIENCES', 'SOCIAL_SCIENCES', 'HUMANITIES_EDUCATION', 'STEM', 'OTHER');

-- CreateEnum
CREATE TYPE "Collages" AS ENUM ('ENAHP', 'UCSAR', 'UNIMET', 'IUPSM', 'UCV', 'UCAB', 'USB', 'UNE', 'UNEXPO', 'UNESR', 'UMA', 'UNEARTE', 'UJMV', 'UMC', 'UPEL', 'CUR', 'UNEFA', 'USM', 'UNEXCA', 'UAH', 'UBV');

-- CreateEnum
CREATE TYPE "KindOfCollage" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "CvaLocation" AS ENUM ('MERCEDES', 'CENTRO');

-- CreateEnum
CREATE TYPE "JobSector" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ZULIA', 'CARABOBO', 'CARACAS');

-- CreateEnum
CREATE TYPE "ScholarStatus" AS ENUM ('PROBATORIO_1', 'PROBATORIO_2', 'NORMAL');

-- CreateEnum
CREATE TYPE "JobHours" AS ENUM ('PART_TIME', 'FULL_TIME', 'WEEKENDS');

-- CreateEnum
CREATE TYPE "KindOfJob" AS ENUM ('FREELANCE', 'FORMAL', 'INFORMAL');

-- CreateEnum
CREATE TYPE "ScholarCanAssist" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "ScholarCondition" AS ENUM ('ACTIVE', 'RESIGNATION', 'WITHDRAWAL', 'ALUMNI');

-- CreateEnum
CREATE TYPE "RecruitmentStatus" AS ENUM ('PHASE_1_PENDING', 'PHASE_1_APPROVED', 'PHASE_1_REJECTED', 'PHASE_2_PENDING', 'PHASE_2_APPROVED', 'PHASE_2_REJECTED', 'PHASE_3_PENDING', 'PHASE_3_APPROVED', 'PHASE_3_REJECTED', 'PHASE_4_PENDING', 'PHASE_4_APPROVED', 'PHASE_4_REJECTED');

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
    "modality" "Modality" NOT NULL,
    "level" "Level" NOT NULL,
    "activity_status" "ActivityStatus" NOT NULL,
    "slides" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAttendance" (
    "id" TEXT NOT NULL,
    "program_information_scholar_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "raiting" DOUBLE PRECISION,
    "justification" TEXT,
    "satisfaction_form_filled" BOOLEAN,

    CONSTRAINT "ChatAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatsTempData" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "meeting_link" TEXT,
    "meeting_id" TEXT,
    "meeting_password" TEXT,
    "whatsapp_link" TEXT,

    CONSTRAINT "ChatsTempData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSafisfactionForm" (
    "id" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "speaker_satisfaction" DOUBLE PRECISION NOT NULL,
    "speaker_strategies_satisfaction" DOUBLE PRECISION NOT NULL,
    "meeting_software_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_pourpose_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_duration" DOUBLE PRECISION NOT NULL,
    "activity_schedule" DOUBLE PRECISION NOT NULL,
    "acivity_anticipation_time" DOUBLE PRECISION NOT NULL,
    "chat_attendance_id" TEXT NOT NULL,

    CONSTRAINT "ChatSafisfactionForm_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start_dates" TIMESTAMP(3)[],
    "end_dates" TIMESTAMP(3)[],
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
    "hours" DOUBLE PRECISION NOT NULL,
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
    "year" "WorkshopYear"[],
    "modality" "Modality" NOT NULL,
    "asociated_skill" "Skill" NOT NULL,
    "activity_status" "ActivityStatus" NOT NULL,
    "slides" TEXT,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopTempData" (
    "id" TEXT NOT NULL,
    "workshop_id" TEXT NOT NULL,
    "meeting_link" TEXT,
    "meeting_id" TEXT,
    "meeting_password" TEXT,

    CONSTRAINT "WorkshopTempData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopAttendance" (
    "id" TEXT NOT NULL,
    "program_information_scholar_id" TEXT NOT NULL,
    "workshop_id" TEXT NOT NULL,
    "attendance" "ScholarAttendance" NOT NULL,
    "justification" TEXT,
    "satisfaction_form_filled" BOOLEAN,

    CONSTRAINT "WorkshopAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopSafisfactionForm" (
    "id" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "speaker_satisfaction" DOUBLE PRECISION NOT NULL,
    "speaker_strategies_satisfaction" DOUBLE PRECISION NOT NULL,
    "meeting_software_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_pourpose_satisfaction" DOUBLE PRECISION NOT NULL,
    "activity_duration" DOUBLE PRECISION NOT NULL,
    "activity_schedule" DOUBLE PRECISION NOT NULL,
    "acivity_anticipation_time" DOUBLE PRECISION NOT NULL,
    "workshop_attendance_id" TEXT NOT NULL,

    CONSTRAINT "WorkshopSafisfactionForm_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "cell_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "birthdate" TIMESTAMP(3),
    "city_of_residence" TEXT,
    "profession" TEXT,
    "gender" "Gender",
    "company" TEXT,
    "company_position" TEXT,
    "other_activities" TEXT,
    "image" TEXT,
    "hobbies" TEXT,
    "instagram_profile" TEXT,
    "linkedin_profile" TEXT,
    "facebook_profile" TEXT,
    "twitter_profile" TEXT,
    "tiktok_profile" TEXT,
    "areas_of_interest" TEXT,
    "how_know_avaa" TEXT,
    "motivation" TEXT,
    "curriculum" TEXT,
    "status" "MentorProgramStatus" NOT NULL,

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
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "mentorId" TEXT,
    "status" "MentorMenteeStatus" NOT NULL,

    CONSTRAINT "Mentor_mentee_pkey" PRIMARY KEY ("id")
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
    "allowedActions_id" TEXT NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Controller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "allowedActions" JSONB[],

    CONSTRAINT "Controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCollageInformation" (
    "id" TEXT NOT NULL,
    "academic_load_completed" BOOLEAN,
    "have_schooolarship" BOOLEAN NOT NULL DEFAULT false,
    "scholarship_percentage" INTEGER,
    "collage_start_date" TIMESTAMP(3),
    "collage_end_date" TIMESTAMP(3),
    "grade_special_mention" TEXT,
    "collage_opinion_study_quality" TEXT NOT NULL,
    "inscription_comprobant" TEXT,
    "career_schedule" TEXT,
    "kind_of_collage" "KindOfCollage" NOT NULL,
    "collage" "Collages",
    "career" TEXT NOT NULL,
    "mention" TEXT,
    "study_area" "StudyArea",
    "evaluation_scale" "EvaluationScale" NOT NULL,
    "study_regime" "StudyRegime" NOT NULL,
    "collage_acceptance_scan" TEXT,
    "collage_study_proof" TEXT,
    "collage_proffessor_card1" TEXT,
    "collage_proffessor_card2" TEXT,
    "scholar_id" TEXT,

    CONSTRAINT "ScholarCollageInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCollagePeriod" (
    "id" TEXT NOT NULL,
    "current_academic_period" INTEGER NOT NULL,
    "inscription_proof" TEXT,
    "collage_schedule" TEXT,
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
    "cva_location" "CvaLocation" NOT NULL,
    "certificate" TEXT,
    "scholarId" TEXT NOT NULL,

    CONSTRAINT "ScholarCVAInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarCvaModule" (
    "id" TEXT NOT NULL,
    "module" INTEGER NOT NULL,
    "cva_modality" TEXT,
    "qualification" DOUBLE PRECISION NOT NULL,
    "record" TEXT,
    "scholar_cva_information_id" TEXT,

    CONSTRAINT "ScholarCvaModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholar" (
    "id" TEXT NOT NULL,
    "photo" TEXT,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "local_phone_number" TEXT,
    "cell_phone_Number" TEXT,
    "whatsapp_number" TEXT,
    "email" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "facebook_user" TEXT,
    "linkedin_user" TEXT,
    "tiktok_user" TEXT,
    "youtube_user" TEXT,

    CONSTRAINT "Scholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarProgramInformation" (
    "id" TEXT NOT NULL,
    "program_admission_date" TIMESTAMP(3) NOT NULL,
    "program_end_date" TIMESTAMP(3) NOT NULL,
    "is_chat_speaker" BOOLEAN NOT NULL DEFAULT false,
    "scholar_status" "ScholarStatus" NOT NULL DEFAULT 'NORMAL',
    "scholar_condition" "ScholarCondition" DEFAULT 'ACTIVE',
    "can_assist_to_chats" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_workshops" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "can_assist_to_volunteers" "ScholarCanAssist" NOT NULL DEFAULT 'YES',
    "chapter_id" TEXT,
    "scholarId" TEXT NOT NULL,
    "chat_speaker_id" TEXT,

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
CREATE TABLE "RecruitmentInformation" (
    "id" TEXT NOT NULL,
    "infomation_fill" TIMESTAMP(3) NOT NULL,
    "information_update" TIMESTAMP(3) NOT NULL,
    "recruitmentStatus" "RecruitmentStatus" NOT NULL,
    "contribute_to_family_income" BOOLEAN NOT NULL DEFAULT false,
    "average_family_income" TEXT,
    "whit_who_do_you_live" TEXT,
    "kind_of_house" TEXT,
    "family_members" TEXT,
    "father_job" TEXT,
    "fathers_company_name" TEXT,
    "fathers_yearsof_experience" TEXT,
    "mother_job" TEXT,
    "mothers_company_name" TEXT,
    "mothers_yearsof_experience" TEXT,
    "parent_phone_number" TEXT,
    "parent_name" TEXT,
    "high_school_name" TEXT,
    "high_school_address" TEXT,
    "high_school_title" TEXT,
    "high_school_director_name" TEXT,
    "high_school_average_grade" TEXT,
    "high_school_grade_proof" TEXT,
    "extracurricular_activities" TEXT,
    "social_labour_place" TEXT,
    "social_labour_learning" TEXT,
    "speaked_other_languages" BOOLEAN,
    "speaked_languages" TEXT,
    "how_knows_program" TEXT,
    "internet_connection" BOOLEAN NOT NULL DEFAULT false,
    "internet_connection_stability" TEXT,
    "why_wants_to_be_scholar" TEXT,
    "dni_scan" TEXT,
    "rif_scan" TEXT,
    "cnu_opsu_scan" TEXT,
    "esay" TEXT,
    "last_tax_declaration" TEXT,
    "receipt_of_payment" TEXT,
    "speaked_languages_level" "Level",
    "referred_by" TEXT,
    "scholar_id" TEXT NOT NULL,

    CONSTRAINT "RecruitmentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumniSatisfactionForm" (
    "id" TEXT NOT NULL,
    "do_interships" BOOLEAN NOT NULL DEFAULT true,
    "company" TEXT,
    "company_sector" "JobSector" NOT NULL,
    "intership_start_date" TIMESTAMP(3) NOT NULL,
    "intership_end_date" TIMESTAMP(3) NOT NULL,
    "stipend_satisfaction" DOUBLE PRECISION NOT NULL,
    "intership_comments" TEXT NOT NULL,
    "intership_specialty" TEXT NOT NULL,
    "english_chats" DOUBLE PRECISION NOT NULL,
    "workshops" DOUBLE PRECISION NOT NULL,
    "Volunteer" DOUBLE PRECISION NOT NULL,
    "Mentorship" DOUBLE PRECISION NOT NULL,
    "intership__and_job_placement" DOUBLE PRECISION NOT NULL,
    "comments_about_program_component" TEXT NOT NULL,
    "skills_developed_during_the_program" TEXT NOT NULL,
    "values_developed_during_the_program" TEXT NOT NULL,
    "program_suggestions" TEXT NOT NULL,
    "program_support" TEXT NOT NULL,
    "how_would_like_to_participate_as_alumni" TEXT NOT NULL,
    "future_activities" TEXT NOT NULL,

    CONSTRAINT "AlumniSatisfactionForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobInformation" (
    "id" TEXT NOT NULL,
    "is_working" BOOLEAN DEFAULT false,
    "job_title" TEXT,
    "job_company" TEXT,
    "job_modality" "Modality",
    "job_schedule" "JobHours",
    "kind_of_job" "KindOfJob",
    "job_sector" "JobSector",
    "aspects_that_influenced_getting_job" TEXT,
    "job_start_date" TIMESTAMP(3) NOT NULL,
    "job_end_date" TIMESTAMP(3) NOT NULL,
    "laboral_conditions" TEXT,
    "actions_to_get_job" TEXT,
    "why_dint_get_job" TEXT,
    "scholarId" TEXT NOT NULL,

    CONSTRAINT "JobInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrepenourshipInformation" (
    "id" TEXT NOT NULL,
    "have_entrepreneurship" BOOLEAN NOT NULL DEFAULT false,
    "entrepreneurship_name" TEXT,
    "entrepreneurship_kind" TEXT,
    "entrepreneurship_services" TEXT,
    "entrepreneurship_social_media" TEXT,
    "motivations_to_be_entrepeneur" TEXT,
    "proexcelencia_motivates_it" TEXT,
    "entrepreneurship_start_date" TIMESTAMP(3),
    "scholarId" TEXT NOT NULL,

    CONSTRAINT "EntrepenourshipInformation_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "Chat_title_modality_activity_status_level_idx" ON "Chat"("title", "modality", "activity_status", "level");

-- CreateIndex
CREATE UNIQUE INDEX "ChatsTempData_chat_id_key" ON "ChatsTempData"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatSafisfactionForm_chat_attendance_id_key" ON "ChatSafisfactionForm"("chat_attendance_id");

-- CreateIndex
CREATE INDEX "VolunteerAttendance_volunteerId_idx" ON "VolunteerAttendance"("volunteerId");

-- CreateIndex
CREATE INDEX "VolunteerAttendance_scholarId_idx" ON "VolunteerAttendance"("scholarId");

-- CreateIndex
CREATE INDEX "Workshop_title_modality_activity_status_asociated_skill_idx" ON "Workshop"("title", "modality", "activity_status", "asociated_skill");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopTempData_workshop_id_key" ON "WorkshopTempData"("workshop_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_program_information_scholar_id_idx" ON "WorkshopAttendance"("program_information_scholar_id");

-- CreateIndex
CREATE INDEX "WorkshopAttendance_workshop_id_idx" ON "WorkshopAttendance"("workshop_id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopSafisfactionForm_workshop_attendance_id_key" ON "WorkshopSafisfactionForm"("workshop_attendance_id");

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
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_dni_key" ON "Mentor"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_allowedEmail_key" ON "AdminProfile"("allowedEmail");

-- CreateIndex
CREATE INDEX "AdminProfile_chapter_id_allowedActions_id_idx" ON "AdminProfile"("chapter_id", "allowedActions_id");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_name_key" ON "Controller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCollageInformation_scholar_id_key" ON "ScholarCollageInformation"("scholar_id");

-- CreateIndex
CREATE INDEX "ScholarCollageInformation_scholar_id_idx" ON "ScholarCollageInformation"("scholar_id");

-- CreateIndex
CREATE INDEX "ScholarCollagePeriod_scholar_collage_nformation_id_idx" ON "ScholarCollagePeriod"("scholar_collage_nformation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCVAInformation_scholarId_key" ON "ScholarCVAInformation"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCvaModule_scholar_cva_information_id_module_key" ON "ScholarCvaModule"("scholar_cva_information_id", "module");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_dni_key" ON "Scholar"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_email_key" ON "Scholar"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProgramInformation_scholarId_key" ON "ScholarProgramInformation"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProgramInformation_chat_speaker_id_key" ON "ScholarProgramInformation"("chat_speaker_id");

-- CreateIndex
CREATE INDEX "ScholarProgramInformation_chapter_id_idx" ON "ScholarProgramInformation"("chapter_id");

-- CreateIndex
CREATE INDEX "Probation_scholar_id_idx" ON "Probation"("scholar_id");

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentInformation_scholar_id_key" ON "RecruitmentInformation"("scholar_id");

-- CreateIndex
CREATE INDEX "RecruitmentInformation_scholar_id_idx" ON "RecruitmentInformation"("scholar_id");

-- CreateIndex
CREATE UNIQUE INDEX "JobInformation_scholarId_key" ON "JobInformation"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "EntrepenourshipInformation_scholarId_key" ON "EntrepenourshipInformation"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToSpeaker_AB_unique" ON "_ChatToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToSpeaker_B_index" ON "_ChatToSpeaker"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpeakerToWorkshop_AB_unique" ON "_SpeakerToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_SpeakerToWorkshop_B_index" ON "_SpeakerToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "ChatAttendance" ADD CONSTRAINT "ChatAttendance_program_information_scholar_id_fkey" FOREIGN KEY ("program_information_scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAttendance" ADD CONSTRAINT "ChatAttendance_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatsTempData" ADD CONSTRAINT "ChatsTempData_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSafisfactionForm" ADD CONSTRAINT "ChatSafisfactionForm_chat_attendance_id_fkey" FOREIGN KEY ("chat_attendance_id") REFERENCES "ChatAttendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerAttendance" ADD CONSTRAINT "VolunteerAttendance_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ScholarProgramInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerAttendance" ADD CONSTRAINT "VolunteerAttendance_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopTempData" ADD CONSTRAINT "WorkshopTempData_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopAttendance" ADD CONSTRAINT "WorkshopAttendance_program_information_scholar_id_fkey" FOREIGN KEY ("program_information_scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopAttendance" ADD CONSTRAINT "WorkshopAttendance_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopSafisfactionForm" ADD CONSTRAINT "WorkshopSafisfactionForm_workshop_attendance_id_fkey" FOREIGN KEY ("workshop_attendance_id") REFERENCES "WorkshopAttendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentee_mentor_activities" ADD CONSTRAINT "Mentee_mentor_activities_mentor_menteeId_fkey" FOREIGN KEY ("mentor_menteeId") REFERENCES "Mentor_mentee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor_mentee" ADD CONSTRAINT "Mentor_mentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_allowedActions_id_fkey" FOREIGN KEY ("allowedActions_id") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCollageInformation" ADD CONSTRAINT "ScholarCollageInformation_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "Scholar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCollagePeriod" ADD CONSTRAINT "ScholarCollagePeriod_scholar_collage_nformation_id_fkey" FOREIGN KEY ("scholar_collage_nformation_id") REFERENCES "ScholarCollageInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCVAInformation" ADD CONSTRAINT "ScholarCVAInformation_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarCvaModule" ADD CONSTRAINT "ScholarCvaModule_scholar_cva_information_id_fkey" FOREIGN KEY ("scholar_cva_information_id") REFERENCES "ScholarCVAInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarProgramInformation" ADD CONSTRAINT "ScholarProgramInformation_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarProgramInformation" ADD CONSTRAINT "ScholarProgramInformation_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Probation" ADD CONSTRAINT "Probation_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "ScholarProgramInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentInformation" ADD CONSTRAINT "RecruitmentInformation_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobInformation" ADD CONSTRAINT "JobInformation_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrepenourshipInformation" ADD CONSTRAINT "EntrepenourshipInformation_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToSpeaker" ADD CONSTRAINT "_ChatToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToSpeaker" ADD CONSTRAINT "_ChatToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToWorkshop" ADD CONSTRAINT "_SpeakerToWorkshop_A_fkey" FOREIGN KEY ("A") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToWorkshop" ADD CONSTRAINT "_SpeakerToWorkshop_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
