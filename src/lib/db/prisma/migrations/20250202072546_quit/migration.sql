/*
  Warnings:

  - The values [NONE] on the enum `InternetConnectionStability` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InternetConnectionStability_new" AS ENUM ('VERY_STABLE', 'STABLE', 'UNSTABLE', 'VERY_UNSTABLE');
ALTER TABLE "additional_info" ALTER COLUMN "internet_connection_stability" TYPE "InternetConnectionStability_new" USING ("internet_connection_stability"::text::"InternetConnectionStability_new");
ALTER TYPE "InternetConnectionStability" RENAME TO "InternetConnectionStability_old";
ALTER TYPE "InternetConnectionStability_new" RENAME TO "InternetConnectionStability";
DROP TYPE "InternetConnectionStability_old";
COMMIT;
