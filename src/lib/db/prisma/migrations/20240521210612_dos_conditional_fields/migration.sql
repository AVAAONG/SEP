-- AlterTable
ALTER TABLE "DOSExchangeProgram" ALTER COLUMN "usa_state" DROP NOT NULL,
ALTER COLUMN "usa_university" DROP NOT NULL,
ALTER COLUMN "program_duration" DROP NOT NULL,
ALTER COLUMN "usa_contact" DROP NOT NULL,
ALTER COLUMN "currently_working_org" DROP NOT NULL,
ALTER COLUMN "usa_connection" DROP NOT NULL;
