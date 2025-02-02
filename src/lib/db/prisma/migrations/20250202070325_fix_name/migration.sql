/*
  Warnings:

  - You are about to drop the column `classModality` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `collageStartDate` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `currentAcademicPeriod` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `haveScholarship` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `kindOfCollage` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `scholarshipPercentage` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `studyArea` on the `CollageInfo` table. All the data in the column will be lost.
  - You are about to drop the column `studyRegime` on the `CollageInfo` table. All the data in the column will be lost.
  - Added the required column `class_modality` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collage_start_date` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_academic_period` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `have_scholarship` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind_of_collage` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_area` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_regime` to the `CollageInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollageInfo" DROP COLUMN "classModality",
DROP COLUMN "collageStartDate",
DROP COLUMN "currentAcademicPeriod",
DROP COLUMN "haveScholarship",
DROP COLUMN "kindOfCollage",
DROP COLUMN "scholarshipPercentage",
DROP COLUMN "studyArea",
DROP COLUMN "studyRegime",
ADD COLUMN     "class_modality" "Modality" NOT NULL,
ADD COLUMN     "collage_start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "current_academic_period" TEXT NOT NULL,
ADD COLUMN     "have_scholarship" BOOLEAN NOT NULL,
ADD COLUMN     "kind_of_collage" "KindOfCollage" NOT NULL,
ADD COLUMN     "scholarship_percentage" DOUBLE PRECISION,
ADD COLUMN     "study_area" "StudyArea" NOT NULL,
ADD COLUMN     "study_regime" "StudyRegime" NOT NULL;
