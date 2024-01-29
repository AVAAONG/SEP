/*
  Warnings:

  - The `meeting_link` column on the `ChatsTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meeting_id` column on the `ChatsTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meeting_password` column on the `ChatsTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `whatsapp_link` column on the `ChatsTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meeting_link` column on the `WorkshopTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meeting_id` column on the `WorkshopTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meeting_password` column on the `WorkshopTempData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ChatsTempData" DROP COLUMN "meeting_link",
ADD COLUMN     "meeting_link" TEXT[],
DROP COLUMN "meeting_id",
ADD COLUMN     "meeting_id" TEXT[],
DROP COLUMN "meeting_password",
ADD COLUMN     "meeting_password" TEXT[],
DROP COLUMN "whatsapp_link",
ADD COLUMN     "whatsapp_link" TEXT[];

-- AlterTable
ALTER TABLE "WorkshopTempData" DROP COLUMN "meeting_link",
ADD COLUMN     "meeting_link" TEXT[],
DROP COLUMN "meeting_id",
ADD COLUMN     "meeting_id" TEXT[],
DROP COLUMN "meeting_password",
ADD COLUMN     "meeting_password" TEXT[];
