/*
  Warnings:

  - You are about to drop the column `constancia` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `photoAlbum` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `raiting` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `spots` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `VolunteerAttendance` table. All the data in the column will be lost.
  - Added the required column `STATUS` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beneficiary` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modality` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proof` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor_email` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `kind_of_volunteer` on the `Volunteer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `asigned_hours` to the `VolunteerAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VolunteerProject" AS ENUM ('UMAA', 'OAL', 'ALV', 'UVPL', 'GA');

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "constancia",
DROP COLUMN "photoAlbum",
DROP COLUMN "raiting",
DROP COLUMN "spots",
DROP COLUMN "status",
ADD COLUMN     "STATUS" "VolunteerStatus" NOT NULL,
ADD COLUMN     "VolunteerProject" "VolunteerProject",
ADD COLUMN     "beneficiary" TEXT NOT NULL,
ADD COLUMN     "modality" "Modality" NOT NULL,
ADD COLUMN     "proof" TEXT NOT NULL,
ADD COLUMN     "supervisor" TEXT NOT NULL,
ADD COLUMN     "supervisor_email" TEXT NOT NULL,
DROP COLUMN "kind_of_volunteer",
ADD COLUMN     "kind_of_volunteer" "KindOfVolunteer" NOT NULL;

-- AlterTable
ALTER TABLE "VolunteerAttendance" DROP COLUMN "hours",
ADD COLUMN     "asigned_hours" DOUBLE PRECISION NOT NULL;
