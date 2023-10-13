/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Controller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[allowedActions_id]` on the table `AdminProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allowedActions_id` to the `AdminProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Controller" DROP CONSTRAINT "Controller_admin_id_fkey";

-- DropIndex
DROP INDEX "Controller_admin_id_key";

-- AlterTable
ALTER TABLE "AdminProfile" ADD COLUMN     "allowedActions_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Controller" DROP COLUMN "admin_id";

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_allowedActions_id_key" ON "AdminProfile"("allowedActions_id");

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_allowedActions_id_fkey" FOREIGN KEY ("allowedActions_id") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
