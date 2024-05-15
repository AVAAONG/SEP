-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "avalible_spots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "calendar_ids" TEXT[];
