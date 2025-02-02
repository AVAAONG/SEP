-- CreateEnum
CREATE TYPE "ProgramDiscoverySource" AS ENUM ('FRIEND_RELATIVE', 'MEDIA', 'AVAA_WEBSITE', 'INSTAGRAM', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'INTERNET_SEARCH');

-- CreateEnum
CREATE TYPE "InternetConnectionStability" AS ENUM ('VERY_STABLE', 'STABLE', 'UNSTABLE', 'VERY_UNSTABLE', 'NONE');

-- CreateTable
CREATE TABLE "additional_info" (
    "id" TEXT NOT NULL,
    "hasInternetConnection" BOOLEAN NOT NULL,
    "internetConnectionStability" "InternetConnectionStability",
    "programDiscoverySource" "ProgramDiscoverySource" NOT NULL,
    "isReferredByScholar" BOOLEAN NOT NULL,
    "referredScholarName" TEXT,
    "scholarshipApplicationReason" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "additional_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "additional_info_applicantId_key" ON "additional_info"("applicantId");

-- AddForeignKey
ALTER TABLE "additional_info" ADD CONSTRAINT "additional_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
