/*
  Warnings:

  - The values [IUTA,IUT,IUTJOSE,IUNE,ICEE,IUAII,IFH,CAE,IUTRBF,IPSM] on the enum `Collages` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Collages_new" AS ENUM ('ENAHP', 'UCSAR', 'UNIMET', 'IUPSM', 'UCV', 'UCAB', 'USB', 'UNE', 'UNEXPO', 'UNESR', 'UMA', 'UNEARTE', 'UJMV', 'UMC', 'UPEL', 'CUR', 'UNEFA', 'USM', 'UNEXCA', 'ENAPH', 'UAH', 'UBV');
ALTER TABLE "ScholarCollageInformation" ALTER COLUMN "collage" TYPE "Collages_new" USING ("collage"::text::"Collages_new");
ALTER TYPE "Collages" RENAME TO "Collages_old";
ALTER TYPE "Collages_new" RENAME TO "Collages";
DROP TYPE "Collages_old";
COMMIT;
