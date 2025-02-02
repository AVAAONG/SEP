-- CreateEnum
CREATE TYPE "InstitutionDependency" AS ENUM ('PUBLIC', 'PRIVATE', 'SUBSIDY');

-- CreateEnum
CREATE TYPE "GraduationTitle" AS ENUM ('BACHELOR_IN_SCIENCE', 'MEDIAN_TECHNICIAN');

-- CreateTable
CREATE TABLE "high_school" (
    "id" TEXT NOT NULL,
    "institution_name" TEXT NOT NULL,
    "institution_dependency" "InstitutionDependency" NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "graduation_title" "GraduationTitle" NOT NULL,
    "mention" TEXT,
    "extracurricular_activities" TEXT,
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "high_school_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "high_school_applicantId_key" ON "high_school"("applicantId");

-- AddForeignKey
ALTER TABLE "high_school" ADD CONSTRAINT "high_school_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
