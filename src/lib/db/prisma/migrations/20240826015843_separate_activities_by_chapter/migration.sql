-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "chapterId" TEXT NOT NULL DEFAULT 'Rokk6_XCAJAg45heOEzYb';

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "chapterId" TEXT NOT NULL DEFAULT 'Rokk6_XCAJAg45heOEzYb';

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "chapterId" TEXT NOT NULL DEFAULT 'Rokk6_XCAJAg45heOEzYb';

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
