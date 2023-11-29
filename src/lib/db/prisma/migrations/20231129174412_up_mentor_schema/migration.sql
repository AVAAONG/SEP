/*
  Warnings:

  - You are about to drop the column `how_know_us` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Mentor_mentee` table. All the data in the column will be lost.
  - Added the required column `how_know_avaa` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiktok_profile` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `endDate` to the `Mentor_mentee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MentorProgramStatus" AS ENUM ('PENDING', 'ACCEPTED', 'NOT_ACCEPTED', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "how_know_us",
ADD COLUMN     "how_know_avaa" TEXT NOT NULL,
ADD COLUMN     "tiktok_profile" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "MentorProgramStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Mentor_mentee" DROP COLUMN "status",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "MentorStatus";

-- DropEnum
DROP TYPE "MentorStaus";
