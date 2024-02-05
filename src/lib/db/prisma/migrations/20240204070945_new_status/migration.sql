/*
  Warnings:

  - The values [IN_PROGRESS,DONE] on the enum `ActivityStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [WAITING_LIST] on the enum `ScholarAttendance` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityStatus_new" AS ENUM ('SCHEDULED', 'SENT', 'ATTENDANCE_CHECKED', 'SUSPENDED');
ALTER TABLE "Chat" ALTER COLUMN "activity_status" TYPE "ActivityStatus_new" USING ("activity_status"::text::"ActivityStatus_new");
ALTER TABLE "Workshop" ALTER COLUMN "activity_status" TYPE "ActivityStatus_new" USING ("activity_status"::text::"ActivityStatus_new");
ALTER TYPE "ActivityStatus" RENAME TO "ActivityStatus_old";
ALTER TYPE "ActivityStatus_new" RENAME TO "ActivityStatus";
DROP TYPE "ActivityStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ScholarAttendance_new" AS ENUM ('ENROLLED', 'ATTENDED', 'NOT_ATTENDED', 'CANCELLED', 'JUSTIFY');
ALTER TABLE "ChatAttendance" ALTER COLUMN "attendance" TYPE "ScholarAttendance_new" USING ("attendance"::text::"ScholarAttendance_new");
ALTER TABLE "VolunteerAttendance" ALTER COLUMN "attendance" TYPE "ScholarAttendance_new" USING ("attendance"::text::"ScholarAttendance_new");
ALTER TABLE "WorkshopAttendance" ALTER COLUMN "attendance" TYPE "ScholarAttendance_new" USING ("attendance"::text::"ScholarAttendance_new");
ALTER TYPE "ScholarAttendance" RENAME TO "ScholarAttendance_old";
ALTER TYPE "ScholarAttendance_new" RENAME TO "ScholarAttendance";
DROP TYPE "ScholarAttendance_old";
COMMIT;
