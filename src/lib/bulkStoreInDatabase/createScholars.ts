import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { Collages } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  if (token === null) return NextResponse.redirect('/api/auth/signin');
  setTokens(token.accessToken as string, token.refreshToken as string);
  await prisma.jobInformation.deleteMany();
  await prisma.scholarCVAInformation.deleteMany();
  await prisma.scholarCollageInformation.deleteMany();
  await prisma.scholarProgramInformation.deleteMany();
  await prisma.speaker.deleteMany({
    where: {
      speaker_kind: 'CHATS',
    },
  });

  await prisma.scholar.deleteMany();
  await createScholarsInBulkFromSheet();

  return NextResponse.json({ message: 'ok' });
}

const SCHOLARS_SPREADSHEET = '1ZYH_EClgE329U9DrYsR10jzU-1ZUIGrBoOQxE3wPDXA';
const SCHOLAR_SHEET = 'Database';
const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:S276`;
const createScholarsInBulkFromSheet = async (chapterID: string = 'Rokk6_XCAJAg45heOEzYb') => {
  const values = (await getSpreadsheetValues(
    SCHOLARS_SPREADSHEET,
    SCHOLARS_SHEET_RANGE
  )) as string[][];
  const scholars = values.map(async (row) => {
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
      chatSpeakerId,
    ] = row;
    const evaluationScale = parseEvaluationScale(collage as Collages);
    const scholar_condition = parseStatus(status);
    const isAlumni = scholar_condition === 'ALUMNI' ? true : false;
    const kind_of_collage = () => {
      if (
        collage === 'UCAB' ||
        collage === 'USM' ||
        collage === 'UNIMET' ||
        collage === 'UCSAR' ||
        'UMA' ||
        collage === ''
      ) {
        return 'PRIVATE';
      } else {
        return 'PUBLIC';
      }
    };

    try {
      await prisma.scholar.create({
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
              program_admission_date: new Date(avaaStartedDate),
              scholar_condition,
              chapter: {
                connect: {
                  id: chapterID,
                },
              },
              is_chat_speaker: chatSpeakerId.trim() === 'No' ? false : true,
            },
          },
          job_information: {
            create: {
              is_working: isWorking === 'No' ? false : true,
            },
          },
          collage_information: {
            create: {
              collage: collage as Collages,
              career: career,
              study_area: parseStudyArea(studyArea),
              study_regime: parseStudyRegime(academicRegime),
              evaluation_scale: evaluationScale,
              kind_of_collage: kind_of_collage(),
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

const parseStatus = (status: string) => {
  switch (status) {
    case 'ACTIVO':
      return 'ACTIVE';
    case 'EGRESADO':
      return 'ALUMNI';
    case 'RENUNCIO':
      return 'RESIGNATION';
    case 'RETIRO':
      return 'WITHDRAWAL';
    default:
      return 'ACTIVE';
  }
};
