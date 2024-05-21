-- CreateTable
CREATE TABLE "DOSExchangeProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aplication_date" TIMESTAMP(3) NOT NULL,
    "reached_stage" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "usa_state" TEXT NOT NULL,
    "usa_university" TEXT NOT NULL,
    "program_duration" TEXT NOT NULL,
    "usa_contact" TEXT NOT NULL,
    "currently_working_org" TEXT NOT NULL,
    "usa_connection" TEXT NOT NULL,
    "scholar_id" TEXT,

    CONSTRAINT "DOSExchangeProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DOSExchangeProgram" ADD CONSTRAINT "DOSExchangeProgram_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "Scholar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
