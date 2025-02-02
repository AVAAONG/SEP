-- CreateTable
CREATE TABLE "CollageInfo" (
    "id" TEXT NOT NULL,
    "kindOfCollage" "KindOfCollage" NOT NULL,
    "collage" TEXT NOT NULL,
    "studyArea" "StudyArea" NOT NULL,
    "studyRegime" "StudyRegime" NOT NULL,
    "career" TEXT NOT NULL,
    "collageStartDate" TIMESTAMP(3) NOT NULL,
    "currentAcademicPeriod" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "classModality" "Modality" NOT NULL,
    "haveScholarship" BOOLEAN NOT NULL,
    "scholarshipPercentage" DOUBLE PRECISION,
    "applicant_id" TEXT NOT NULL,

    CONSTRAINT "CollageInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollageInfo_applicant_id_key" ON "CollageInfo"("applicant_id");

-- AddForeignKey
ALTER TABLE "CollageInfo" ADD CONSTRAINT "CollageInfo_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
