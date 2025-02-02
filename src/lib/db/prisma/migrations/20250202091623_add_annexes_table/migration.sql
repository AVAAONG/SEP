-- CreateTable
CREATE TABLE "annexes" (
    "id" TEXT NOT NULL,
    "dni_card" TEXT,
    "rif" TEXT,
    "high_school_grades" TEXT,
    "university_grades" TEXT,
    "study_proof" TEXT,
    "professor_reference_letter_i" TEXT,
    "professor_reference_letter_ii" TEXT,
    "utility_bill_verification" TEXT,
    "personal_essay" TEXT,
    "applicant_id" TEXT NOT NULL,

    CONSTRAINT "annexes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "annexes_applicant_id_key" ON "annexes"("applicant_id");

-- AddForeignKey
ALTER TABLE "annexes" ADD CONSTRAINT "annexes_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
