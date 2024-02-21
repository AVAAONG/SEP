/*
  Warnings:

  - The values [EXTERNO,INTERNO] on the enum `KindOfVolunteer` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KindOfVolunteer_new" AS ENUM ('INTERNAL', 'EXTERNAL');
ALTER TABLE "Volunteer" ALTER COLUMN "kind_of_volunteer" TYPE "KindOfVolunteer_new" USING ("kind_of_volunteer"::text::"KindOfVolunteer_new");
ALTER TYPE "KindOfVolunteer" RENAME TO "KindOfVolunteer_old";
ALTER TYPE "KindOfVolunteer_new" RENAME TO "KindOfVolunteer";
DROP TYPE "KindOfVolunteer_old";
COMMIT;
