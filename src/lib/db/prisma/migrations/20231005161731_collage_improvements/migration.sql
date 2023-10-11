/*
  Warnings:

  - The values [BASIC_SCIENCES,SOCIAL_ECONOMIC_SCIENCES,ARTS] on the enum `StudyArea` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `career` to the `ScholarCollageInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Collages" ADD VALUE 'UNEXCA';
ALTER TYPE "Collages" ADD VALUE 'UNESR';
ALTER TYPE "Collages" ADD VALUE 'UNEARTE';

-- AlterEnum
BEGIN;
CREATE TYPE "StudyArea_new" AS ENUM ('ARCHITECTURE_URBANISM', 'HEALTH_SCIENCES', 'JURIDICAL_POLITICAL_SCIENCES', 'SOCIAL_SCIENCES', 'HUMANITIES_EDUCATION', 'STEM', 'OTHER');
ALTER TABLE "ScholarCollageInformation" ALTER COLUMN "study_area" TYPE "StudyArea_new" USING ("study_area"::text::"StudyArea_new");
ALTER TYPE "StudyArea" RENAME TO "StudyArea_old";
ALTER TYPE "StudyArea_new" RENAME TO "StudyArea";
DROP TYPE "StudyArea_old";
COMMIT;

-- AlterTable
ALTER TABLE "ScholarCollageInformation" DROP COLUMN "career",
ADD COLUMN     "career" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Careers";
