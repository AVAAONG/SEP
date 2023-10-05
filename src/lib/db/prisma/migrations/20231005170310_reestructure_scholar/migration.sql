/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cell_phone_Number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `collage_information_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cva_information_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dni` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_names` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_working` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `job_company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_names` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `local_phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `program_information_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state_of_origin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp_number` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scholarId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scholarId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_collage_information_id_idx";

-- DropIndex
DROP INDEX "User_cva_information_id_idx";

-- DropIndex
DROP INDEX "User_dni_key";

-- DropIndex
DROP INDEX "User_program_information_id_collage_information_id_cva_info_key";

-- DropIndex
DROP INDEX "User_program_information_id_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "birthdate",
DROP COLUMN "cell_phone_Number",
DROP COLUMN "collage_information_id",
DROP COLUMN "cva_information_id",
DROP COLUMN "dni",
DROP COLUMN "facebook_user",
DROP COLUMN "first_names",
DROP COLUMN "gender",
DROP COLUMN "instagram_user",
DROP COLUMN "is_working",
DROP COLUMN "job_company",
DROP COLUMN "job_title",
DROP COLUMN "last_names",
DROP COLUMN "linkedin_user",
DROP COLUMN "local_phone_number",
DROP COLUMN "program_information_id",
DROP COLUMN "state_of_origin",
DROP COLUMN "twitter_user",
DROP COLUMN "whatsapp_number",
ADD COLUMN     "scholarId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Scholar" (
    "id" TEXT NOT NULL,
    "allowedEmail" TEXT,
    "first_names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "is_working" BOOLEAN NOT NULL DEFAULT false,
    "job_title" TEXT,
    "job_company" TEXT,
    "local_phone_number" TEXT,
    "cell_phone_Number" TEXT,
    "whatsapp_number" TEXT,
    "state_of_origin" TEXT,
    "address" TEXT,
    "instagram_user" TEXT,
    "twitter_user" TEXT,
    "facebook_user" TEXT,
    "linkedin_user" TEXT,
    "program_information_id" TEXT,
    "collage_information_id" TEXT,
    "cva_information_id" TEXT,

    CONSTRAINT "Scholar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_allowedEmail_key" ON "Scholar"("allowedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_dni_key" ON "Scholar"("dni");

-- CreateIndex
CREATE INDEX "Scholar_program_information_id_idx" ON "Scholar"("program_information_id");

-- CreateIndex
CREATE INDEX "Scholar_collage_information_id_idx" ON "Scholar"("collage_information_id");

-- CreateIndex
CREATE INDEX "Scholar_cva_information_id_idx" ON "Scholar"("cva_information_id");

-- CreateIndex
CREATE UNIQUE INDEX "Scholar_program_information_id_collage_information_id_cva_i_key" ON "Scholar"("program_information_id", "collage_information_id", "cva_information_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_scholarId_key" ON "User"("scholarId");
