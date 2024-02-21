/*
  Warnings:

  - You are about to drop the column `STATUS` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Volunteer` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "STATUS",
DROP COLUMN "place",
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "status" "VolunteerStatus" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "proof" DROP NOT NULL,
ALTER COLUMN "supervisor" DROP NOT NULL,
ALTER COLUMN "supervisor_email" DROP NOT NULL;
