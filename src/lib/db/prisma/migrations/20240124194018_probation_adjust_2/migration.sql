-- AlterTable
ALTER TABLE "Probation" ADD COLUMN     "observations" TEXT,
ALTER COLUMN "ending_date" DROP NOT NULL;
