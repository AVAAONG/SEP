/*
  Warnings:

  - The values [PHASE_1_PENDING,PHASE_1_APPROVED,PHASE_1_REJECTED,PHASE_2_PENDING,PHASE_2_APPROVED,PHASE_2_REJECTED,PHASE_3_PENDING,PHASE_3_APPROVED,PHASE_3_REJECTED,PHASE_4_PENDING,PHASE_4_APPROVED,PHASE_4_REJECTED] on the enum `RecruitmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecruitmentStatus_new" AS ENUM ('PHASE_I', 'PHASE_II_PENDING', 'PHASE_II_APPROVED', 'PHASE_II_REJECTED', 'PHASE_III_PENDING', 'PHASE_III_APPROVED', 'PHASE_III_REJECTED');
ALTER TYPE "RecruitmentStatus" RENAME TO "RecruitmentStatus_old";
ALTER TYPE "RecruitmentStatus_new" RENAME TO "RecruitmentStatus";
DROP TYPE "RecruitmentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
