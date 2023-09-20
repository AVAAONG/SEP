import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { PrismaClient, ScholarCondition } from '@prisma/client';
import { NextResponse } from 'next/server';

const SCHOLARS_SPREADSHEET = '1Fuut0jNZ4Onp4UO_yKmcVfThzRWpvlZpNPMf0I6HjtY';
const SCHOLARS_SHEET_NAME = 'Database';
const SCHOLARS_SHEET_RANGE = `'${SCHOLARS_SHEET_NAME}'!A4:Q4`;
const prismaClient = new PrismaClient();

export const GET = async (req: Request) => {
  return NextResponse.json({ message: 'saf' });
};

const createScholarsInBulkFromSheet = async () => {
  const values = (await getSpreadsheetValues(
    SCHOLARS_SPREADSHEET,
    SCHOLARS_SHEET_RANGE
  )) as string[][];
  const scholars = values.forEach(async (row) => {
    const [
      lastName,
      firstName,
      dni,
      spreadsheetGender,
      spreadSheetBirthdate,
      email,
      localPhone,
      mobilePhone,
      address,
      collage,
      career,
      academicRegime,
      classModality,
      isInCVA,
      isWorking,
      avaaStartedDate,
      status,
    ] = row;
    try {
      await prismaClient.user.create({
        data: {
          first_names: firstName,
          last_names: lastName,
          dni: dni,
          birthdate: new Date(spreadSheetBirthdate),
          email: email,
          local_phone_number: localPhone,
          cell_phone_Number: mobilePhone,
          whatsapp_number: mobilePhone,
          address: address,
          gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
          program_information: {
            create: {
              avaa_admission_year: new Date(avaaStartedDate),
              is_chat_speaker: false,
              scholar_condition: parseStatus(status) as ScholarCondition,
              chapter: {
                connect: {
                  id: 'klfodKd93Js8astdadspf',
                }
              },
            }
          },
          collage_information: {
            create: {
              collage,
              career,
              study_regime: parseStudyRegime(academicRegime),
              evaluation_scale: 'CERO_TO_TWENTY'
            }
          },
          cva_information: {
            create: {
              is_in_cva: isInCVA === 'No' ? false : true,
            }
          }
        }
      });
      console.log("El becario", firstName, lastName, "se ha creado correctamente")

    }
    catch (error) {
      console.log("El becario", firstName, lastName, "no se ha podido crear correctamente")
      console.log(error)
    }
  })

  return scholars;
};


const parseStatus = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return "ACTIVE";
    case "EGRESADO":
      return "ALUMNI";
    case "RETIRO":
      return "WITHDRAWAL";
    case "RENUNCIO":
      return "RESIGNATION";
  }


}

const parseStudyRegime = (regime: string) => {
  switch (regime) {
    case "Semestral":
      return "SEMESTER";
    case "Anual":
      return "ANNUAL";
    case "Trimestral":
      return "QUARTER";
    default:
      return "ANNUAL";
  }
}