/*
  Warnings:

  - You are about to drop the `RecruitmentInformation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicantId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RecruitmentInformation" DROP CONSTRAINT "RecruitmentInformation_scholar_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "applicantId" TEXT,
ALTER COLUMN "kind_of_user" SET DEFAULT 'APPLICANT';

-- DropTable
DROP TABLE "RecruitmentInformation";

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 1,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_info" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "personal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_info" (
    "id" TEXT NOT NULL,
    "local_phone_number" TEXT NOT NULL,
    "whatsApp_phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "parental_phone_number" TEXT NOT NULL,
    "parental" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personal_info_dni_key" ON "personal_info"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "personal_info_applicantId_key" ON "personal_info"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_info_email_key" ON "contact_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_info_applicantId_key" ON "contact_info"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "User_applicantId_key" ON "User"("applicantId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_info" ADD CONSTRAINT "contact_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
