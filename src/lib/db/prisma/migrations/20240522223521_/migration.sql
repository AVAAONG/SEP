-- Drop existing foreign key and index
ALTER TABLE "AdminProfile" DROP CONSTRAINT "AdminProfile_allowedActions_id_fkey";
DROP INDEX "AdminProfile_chapter_id_allowedActions_id_idx";

-- Add new foreign key and index
ALTER TABLE "AdminProfile" ADD COLUMN "role_id" TEXT;
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "AdminProfile_chapter_id_role_id_idx" ON "AdminProfile"("chapter_id", "role_id");

-- Remove old column (after data migration, if necessary)
ALTER TABLE "AdminProfile" DROP COLUMN "allowedActions_id";
