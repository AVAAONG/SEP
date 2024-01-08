/*
  Warnings:

  - You are about to drop the column `cva_modality` on the `ScholarCvaModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScholarCvaModule" DROP COLUMN "cva_modality",
ADD COLUMN     "modality" "Modality";
