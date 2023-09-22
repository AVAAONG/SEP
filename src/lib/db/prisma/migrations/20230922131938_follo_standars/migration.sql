/*
  Warnings:

  - You are about to drop the column `chapterId` on the `AdminUser` table. All the data in the column will be lost.
  - You are about to drop the column `chapterName` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `scholarCollageInformationId` on the `ScholarCollageAverageQualificationByPeriod` table. All the data in the column will be lost.
  - You are about to drop the column `scholarCVAInformationId` on the `ScholarCvaModule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scholar_cva_information_id,module]` on the table `ScholarCvaModule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AdminUser_chapterId_idx";

-- DropIndex
DROP INDEX "ScholarCollageAverageQualificationByPeriod_scholarCollageIn_idx";

-- DropIndex
DROP INDEX "ScholarCvaModule_scholarCVAInformationId_module_key";

-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "chapterId",
ADD COLUMN     "chapter_id" TEXT;

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapterName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScholarCollageAverageQualificationByPeriod" DROP COLUMN "scholarCollageInformationId",
ADD COLUMN     "scholar_collage_nformation_id" TEXT;

-- AlterTable
ALTER TABLE "ScholarCvaModule" DROP COLUMN "scholarCVAInformationId",
ADD COLUMN     "scholar_cva_information_id" TEXT;

-- CreateIndex
CREATE INDEX "AdminUser_chapter_id_idx" ON "AdminUser"("chapter_id");

-- CreateIndex
CREATE INDEX "ScholarCollageAverageQualificationByPeriod_scholar_collage__idx" ON "ScholarCollageAverageQualificationByPeriod"("scholar_collage_nformation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCvaModule_scholar_cva_information_id_module_key" ON "ScholarCvaModule"("scholar_cva_information_id", "module");
