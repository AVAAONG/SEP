-- AlterTable
ALTER TABLE IF EXISTS "Controller" RENAME TO "Role";
ALTER TABLE "Role" 
RENAME COLUMN "allowedActions" TO "permissions";
