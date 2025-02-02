-- CreateTable
CREATE TABLE "job_info" (
    "id" TEXT NOT NULL,
    "currently_working" BOOLEAN NOT NULL,
    "job_company" TEXT,
    "job_title" TEXT,
    "job_modality" "Modality",
    "job_schedule" "JobSchedule",
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "job_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_info_applicantId_key" ON "job_info"("applicantId");

-- AddForeignKey
ALTER TABLE "job_info" ADD CONSTRAINT "job_info_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
