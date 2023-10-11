// import { prisma } from "@/lib/db/utils/prisma";
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { Collages, PrismaClient, ScholarCondition } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  if (token === null) return NextResponse.redirect('/api/auth/signin');
  setTokens(token.accessToken as string, token.refreshToken as string);
  return NextResponse.json({ message: 'ok' });
}

const SCHOLARS_SPREADSHEET = '1Fuut0jNZ4Onp4UO_yKmcVfThzRWpvlZpNPMf0I6HjtY';
const SCHOLAR_SHEET = 'Database';
const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:R275`;

const createScholarsInBulkFromSheet = async (chapterID: string = 'YOXA5dBmHyHv7EC0ndO6y') => {
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
      studyArea,
      academicRegime,
      classModality,
      isInCVA,
      isWorking,
      avaaStartedDate,
      status,
    ] = row;
    const evaluationScale = parseEvaluationScale(collage as Collages);
    try {
      await prisma.scholar.create({
        data: {
          first_names: firstName,
          last_names: lastName,
          dni: dni,
          birthdate: new Date(spreadSheetBirthdate),
          allowedEmail: email,
          local_phone_number: localPhone,
          cell_phone_Number: mobilePhone,
          whatsapp_number: mobilePhone,
          address: address,
          gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
          is_working: isWorking === 'No' ? false : true,
          program_information: {
            create: {
              avaa_admission_year: new Date(avaaStartedDate),
              is_chat_speaker: false,
              scholar_condition: parseStatus(status) as ScholarCondition,
              chapter: {
                connect: {
                  id: chapterID,
                },
              },
            },
          },
          collage_information: {
            create: {
              collage: collage.toUpperCase() as Collages,
              career,
              study_area: parseStudyArea(studyArea),
              study_regime: parseStudyRegime(academicRegime),
              evaluation_scale: evaluationScale,
            },
          },
          cva_information: {
            create: {
              is_in_cva: isInCVA === 'No' ? false : true,
            },
          },
        },
      });
      console.log('✅ El becario', firstName, lastName, 'se ha creado correctamente');
    } catch (error) {
      console.error('El becario', firstName, lastName, 'no se ha podido crear');
      console.error(error);
    }
  });

  return scholars;
};

const parseStatus = (status: string) => {
  switch (status) {
    case 'ACTIVO':
      return 'ACTIVE';
    case 'EGRESADO':
      return 'ALUMNI';
    case 'RETIRO':
      return 'WITHDRAWAL';
    case 'RENUNCIO':
      return 'RESIGNATION';
  }
};

const parseStudyRegime = (regime: string) => {
  switch (regime) {
    case 'Semestral':
      return 'SEMESTER';
    case 'Anual':
      return 'ANNUAL';
    case 'Trimestral':
      return 'QUARTER';
    default:
      return 'ANNUAL';
  }
};

const parseEvaluationScale = (collage: Collages) => {
  switch (collage) {
    case 'USB':
      return 'CERO_TO_FIVE';
    case 'UPEL':
      return 'CERO_TO_TEN';
    default:
      return 'CERO_TO_TWENTY';
  }
};

const parseStudyArea = (area: string) => {
  switch (area) {
    case 'Arquitectura y Urbanismo':
      return 'ARCHITECTURE_URBANISM';
    case 'Ciencias de la Salud':
      return 'HEALTH_SCIENCES';
    case 'Ciencias Jurídicas y Políticas':
      return 'JURIDICAL_POLITICAL_SCIENCES';
    case 'Ciencias Sociales':
      return 'SOCIAL_SCIENCES';
    case 'Humanidades y Educación':
      return 'HUMANITIES_EDUCATION';
    case 'STEM':
      return 'STEM';
    default:
      return 'OTHER';
  }
};
