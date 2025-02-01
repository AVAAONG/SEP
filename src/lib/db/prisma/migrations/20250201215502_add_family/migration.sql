-- CreateEnum
CREATE TYPE "WhitWhoDoYouLive" AS ENUM ('PARENTS', 'RELATIVES', 'OTHERS');

-- CreateEnum
CREATE TYPE "KindOfHouse" AS ENUM ('OWNED', 'RENTED', 'MORTGAGED');

-- CreateTable
CREATE TABLE "family_info" (
    "id" TEXT NOT NULL,
    "average_family_income" INTEGER NOT NULL,
    "whit_who_do_you_live" "WhitWhoDoYouLive" NOT NULL,
    "kind_of_house" "KindOfHouse" NOT NULL,
    "contribute_to_family_income" BOOLEAN NOT NULL,
    "family_members" TEXT NOT NULL,
    "father_job" TEXT NOT NULL,
    "fathers_company_name" TEXT NOT NULL,
    "mother_job" TEXT NOT NULL,
    "mothers_company_name" TEXT NOT NULL,

    CONSTRAINT "family_info_pkey" PRIMARY KEY ("id")
);
