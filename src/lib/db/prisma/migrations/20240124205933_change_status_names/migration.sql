/*
  Warnings:

  - The values [PROBATORIO_1,PROBATORIO_2] on the enum `ScholarStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ScholarStatus_new" AS ENUM ('PROBATION_I', 'PROBATION_II', 'NORMAL');
ALTER TABLE "ScholarProgramInformation" ALTER COLUMN "scholar_status" DROP DEFAULT;
ALTER TABLE "ScholarProgramInformation" ALTER COLUMN "scholar_status" TYPE "ScholarStatus_new" USING ("scholar_status"::text::"ScholarStatus_new");
ALTER TABLE "Probation" ALTER COLUMN "kind_of_probation" TYPE "ScholarStatus_new" USING ("kind_of_probation"::text::"ScholarStatus_new");
ALTER TYPE "ScholarStatus" RENAME TO "ScholarStatus_old";
ALTER TYPE "ScholarStatus_new" RENAME TO "ScholarStatus";
DROP TYPE "ScholarStatus_old";
ALTER TABLE "ScholarProgramInformation" ALTER COLUMN "scholar_status" SET DEFAULT 'NORMAL';
COMMIT;
