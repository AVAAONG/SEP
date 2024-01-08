-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Collages" ADD VALUE 'UNICA';
ALTER TYPE "Collages" ADD VALUE 'URBE';
ALTER TYPE "Collages" ADD VALUE 'UJGH';
ALTER TYPE "Collages" ADD VALUE 'URU';
ALTER TYPE "Collages" ADD VALUE 'LUZ';
ALTER TYPE "Collages" ADD VALUE 'PSM';

-- AlterTable
ALTER TABLE "Scholar" ALTER COLUMN "birthdate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ScholarCollageInformation" ALTER COLUMN "evaluation_scale" DROP NOT NULL;
