-- CreateTable
CREATE TABLE "language_knowledge" (
    "id" TEXT NOT NULL,
    "speaks_other_language" BOOLEAN NOT NULL,
    "specified_language" TEXT,
    "language_level" "Level",
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "language_knowledge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_knowledge_applicantId_key" ON "language_knowledge"("applicantId");

-- AddForeignKey
ALTER TABLE "language_knowledge" ADD CONSTRAINT "language_knowledge_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
