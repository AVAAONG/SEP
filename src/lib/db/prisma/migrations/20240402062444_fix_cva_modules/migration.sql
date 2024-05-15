-- DropIndex
DROP INDEX "ScholarCvaModule_scholar_cva_information_id_key";

-- AlterTable
ALTER TABLE "ScholarCvaModule" ADD COLUMN     "createdAtt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
