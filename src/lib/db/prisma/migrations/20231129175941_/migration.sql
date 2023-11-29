/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `MentorProgramStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Mentor_mentee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MentorMenteeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "MentorProgramStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'NOT_ACCEPTED');
ALTER TABLE "Mentor" ALTER COLUMN "status" TYPE "MentorProgramStatus_new" USING ("status"::text::"MentorProgramStatus_new");
ALTER TYPE "MentorProgramStatus" RENAME TO "MentorProgramStatus_old";
ALTER TYPE "MentorProgramStatus_new" RENAME TO "MentorProgramStatus";
DROP TYPE "MentorProgramStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Mentor_mentee" ADD COLUMN     "status" "MentorMenteeStatus" NOT NULL;
