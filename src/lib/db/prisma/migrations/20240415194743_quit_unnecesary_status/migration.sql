/*
  Warnings:

  - The values [DONE,SUSPENDED] on the enum `VolunteerStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VolunteerStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SENT');
ALTER TABLE "Volunteer" ALTER COLUMN "status" TYPE "VolunteerStatus_new" USING ("status"::text::"VolunteerStatus_new");
ALTER TYPE "VolunteerStatus" RENAME TO "VolunteerStatus_old";
ALTER TYPE "VolunteerStatus_new" RENAME TO "VolunteerStatus";
DROP TYPE "VolunteerStatus_old";
COMMIT;
