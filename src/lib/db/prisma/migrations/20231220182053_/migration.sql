/*
  Warnings:

  - A unique constraint covering the columns `[scholar_cva_information_id]` on the table `ScholarCvaModule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ScholarCvaModule_scholar_cva_information_id_module_key";

-- CreateIndex
CREATE UNIQUE INDEX "ScholarCvaModule_scholar_cva_information_id_key" ON "ScholarCvaModule"("scholar_cva_information_id");
