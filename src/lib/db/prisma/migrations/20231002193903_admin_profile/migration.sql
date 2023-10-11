/*
  Warnings:

  - You are about to drop the column `chapter_id` on the `AdminUser` table. All the data in the column will be lost.
  - You are about to drop the column `responsibility` on the `AdminUser` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `AdminUser` table. All the data in the column will be lost.
  - You are about to drop the `AllowedAdmins` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[adminProfileId]` on the table `AdminUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminProfileId` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AdminUser_chapter_id_idx";

-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "chapter_id",
DROP COLUMN "responsibility",
DROP COLUMN "role",
ADD COLUMN     "adminProfileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AllowedAdmins";

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "profileImage" TEXT,
    "allowedEmail" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "AdminRoles" NOT NULL,
    "responsibility" TEXT NOT NULL,
    "chapter_id" TEXT,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_allowedEmail_key" ON "AdminProfile"("allowedEmail");

-- CreateIndex
CREATE INDEX "AdminProfile_chapter_id_idx" ON "AdminProfile"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_adminProfileId_key" ON "AdminUser"("adminProfileId");
