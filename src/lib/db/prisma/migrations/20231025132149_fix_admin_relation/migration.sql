-- DropIndex
DROP INDEX "AdminProfile_allowedActions_id_key";

-- DropIndex
DROP INDEX "AdminProfile_chapter_id_idx";

-- CreateIndex
CREATE INDEX "AdminProfile_chapter_id_allowedActions_id_idx" ON "AdminProfile"("chapter_id", "allowedActions_id");
