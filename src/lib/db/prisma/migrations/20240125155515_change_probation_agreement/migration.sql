/*
  Warnings:

  - Changed the type of `agreement` on the `Probation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Probation" DROP COLUMN "agreement",
ADD COLUMN     "agreement" JSONB NOT NULL;
