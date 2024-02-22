-- CreateEnum
CREATE TYPE "CVASchedule" AS ENUM ('DIARY', 'INTERDIARY', 'SABATINO');

-- AlterTable
ALTER TABLE "ScholarCVAInformation" ADD COLUMN     "already_finished_cva" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cva_ended_date" TIMESTAMP(3),
ADD COLUMN     "cva_started_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ScholarCvaModule" ADD COLUMN     "schedule" "CVASchedule";
