-- AlterEnum
ALTER TYPE "ScholarCondition" ADD VALUE 'TO_BE_ALUMNI';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VolunteerStatus" ADD VALUE 'DONE';
ALTER TYPE "VolunteerStatus" ADD VALUE 'SUSPENDED';

-- AlterTable
ALTER TABLE "ScholarCollagePeriod" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
