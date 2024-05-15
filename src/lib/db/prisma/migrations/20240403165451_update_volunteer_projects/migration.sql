-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VolunteerProject" ADD VALUE 'OFFICE';
ALTER TYPE "VolunteerProject" ADD VALUE 'CHAT_CLUBS';
ALTER TYPE "VolunteerProject" ADD VALUE 'EXTERNAL';

