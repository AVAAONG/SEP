/*
  Warnings:

  - You are about to drop the `ChatsTempData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkshopTempData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatsTempData" DROP CONSTRAINT "ChatsTempData_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkshopTempData" DROP CONSTRAINT "WorkshopTempData_workshop_id_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "meeting_id" TEXT[],
ADD COLUMN     "meeting_link" TEXT[],
ADD COLUMN     "meeting_password" TEXT[],
ADD COLUMN     "whatsapp_link" TEXT[];

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "meeting_id" TEXT[],
ADD COLUMN     "meeting_link" TEXT[],
ADD COLUMN     "meeting_password" TEXT[];

-- DropTable
DROP TABLE "ChatsTempData";

-- DropTable
DROP TABLE "WorkshopTempData";
