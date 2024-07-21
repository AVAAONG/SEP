-- AlterEnum
ALTER TYPE "KinOfUser" ADD VALUE 'APPLICANT';

-- AlterTable
ALTER TABLE "Probation" ALTER COLUMN "probation_reason" DROP NOT NULL;