/*
  Warnings:

  - Made the column `role_id` on table `AdminProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdminProfile" DROP CONSTRAINT "AdminProfile_role_id_fkey";

UPDATE "AdminProfile"
SET "role_id" = 'CheUBJvQ5Bxl_BkWZRDv-'
WHERE "role_id" IS NULL;

-- AlterTable
ALTER TABLE "AdminProfile" ALTER COLUMN "role_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Role" 
RENAME CONSTRAINT "Controller_pkey" TO "Role_pkey";

ALTER TABLE "Role" 
ALTER COLUMN "permissions" DROP NOT NULL,
ALTER COLUMN "permissions" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Controller_name_key" RENAME TO "Role_name_key";