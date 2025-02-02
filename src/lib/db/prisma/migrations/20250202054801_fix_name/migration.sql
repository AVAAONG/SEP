/*
  Warnings:

  - You are about to drop the column `applicantId` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `hasInternetConnection` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `internetConnectionStability` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `isReferredByScholar` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `programDiscoverySource` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `referredScholarName` on the `additional_info` table. All the data in the column will be lost.
  - You are about to drop the column `scholarshipApplicationReason` on the `additional_info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[applicant_id]` on the table `additional_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicant_id` to the `additional_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_internet_connection` to the `additional_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_referred_by_scholar` to the `additional_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program_discovery_source` to the `additional_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scholarship_application_reason` to the `additional_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "additional_info" DROP CONSTRAINT "additional_info_applicantId_fkey";

-- DropIndex
DROP INDEX "additional_info_applicantId_key";

-- AlterTable
ALTER TABLE "additional_info" DROP COLUMN "applicantId",
DROP COLUMN "hasInternetConnection",
DROP COLUMN "internetConnectionStability",
DROP COLUMN "isReferredByScholar",
DROP COLUMN "programDiscoverySource",
DROP COLUMN "referredScholarName",
DROP COLUMN "scholarshipApplicationReason",
ADD COLUMN     "applicant_id" TEXT NOT NULL,
ADD COLUMN     "has_internet_connection" BOOLEAN NOT NULL,
ADD COLUMN     "internet_connection_stability" "InternetConnectionStability",
ADD COLUMN     "is_referred_by_scholar" BOOLEAN NOT NULL,
ADD COLUMN     "program_discovery_source" "ProgramDiscoverySource" NOT NULL,
ADD COLUMN     "referred_scholar_name" TEXT,
ADD COLUMN     "scholarship_application_reason" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "additional_info_applicant_id_key" ON "additional_info"("applicant_id");

-- AddForeignKey
ALTER TABLE "additional_info" ADD CONSTRAINT "additional_info_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
