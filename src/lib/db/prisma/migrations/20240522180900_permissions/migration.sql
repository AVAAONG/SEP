/*
  Warnings:

  - Changed the type of `allowedActions` on the `Controller` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Controller" 
DROP COLUMN "allowedActions",
ADD COLUMN "allowedActions" JSONB NOT NULL DEFAULT '{}';
