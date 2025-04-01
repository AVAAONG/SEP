-- DropForeignKey
ALTER TABLE "CollageInfo" DROP CONSTRAINT "CollageInfo_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "additional_info" DROP CONSTRAINT "additional_info_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "annexes" DROP CONSTRAINT "annexes_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "contact_info" DROP CONSTRAINT "contact_info_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "family_info" DROP CONSTRAINT "family_info_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "high_school" DROP CONSTRAINT "high_school_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "job_info" DROP CONSTRAINT "job_info_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "language_knowledge" DROP CONSTRAINT "language_knowledge_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "personal_info" DROP CONSTRAINT "personal_info_applicantId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_info" ADD CONSTRAINT "contact_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_info" ADD CONSTRAINT "family_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_info" ADD CONSTRAINT "job_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_knowledge" ADD CONSTRAINT "language_knowledge_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "high_school" ADD CONSTRAINT "high_school_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_info" ADD CONSTRAINT "additional_info_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollageInfo" ADD CONSTRAINT "CollageInfo_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annexes" ADD CONSTRAINT "annexes_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
