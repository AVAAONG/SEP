// import { prisma } from "@/lib/db/utils/prisma";
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { PrismaClient } from '@prisma/client';
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

const SCHOLARS_SPREADSHEET = '1hdrhSHNWlavKt1Mmjn4KHBwDFRA_IHlxYomLv3DMu-s';
const SCHOLAR_SHEET = 'Respuestas de formulario 1';
const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!B2:AO154`;

const updateScholarsInBatch = async () => {
  const values = (await getSpreadsheetValues(
    SCHOLARS_SPREADSHEET,
    SCHOLARS_SHEET_RANGE
  )) as string[][];

  const scholar = values.map(async (row) => {
    const [
      allowedEmail,
      last_names,
      first_names,
      dni,
      email_not_use, // no usar
      local_phone_number,
      cell_phone_Number,
      yearsOld, // not use
      collage,
      career,
      study_regime,
      current_academic_period,
      observation, // not use
      knowsGrade, // not use
      grade,
      record,
      why_not_have_record, // not use
      when_whould_know_academic_record, // not use
      class_modality,
      howManyClases, // not use
      incription_prove,
      is_in_cva,
      cva_modality,
      module,
      level,
      cva_location,
      not_started_cva_reason,
      waiting_for_cva, // not use
      certificate,
      is_working,
      jobModality, // add
      job_hours, //  add
      kind_of_job, // add
      job_company,
      job_title,
      have_entrepeneurship, // add
      entrepreneurship_name, // add
      entrepreneurship_kind, // add
      entrepreneurship_services, // add
      entrepreneurship_social_media, // add
    ] = row

    const modality = parseModality(class_modality)
    const regime = parseStudyRegime(study_regime)
    const currentlyWorking = is_working === 'Sí' ? true : false;
    const haveEntrepenurship = have_entrepeneurship === 'Sí' ? true : false;
    const jobModalityParsed = parseModality(jobModality)
    const currentlyInCva = is_in_cva === 'Sí' ? true : false;

    await prisma.scholar.update({
      where: { dni },
      data: {
        last_names,
        first_names,
        dni,
        local_phone_number,
        cell_phone_Number,
        is_working: currentlyWorking,
        job_company,
        job_title,
        have_entrepreneurship: haveEntrepenurship, // add
        entrepreneurship_name, // add
        entrepreneurship_kind, // add
        entrepreneurship_services, // add
        entrepreneurship_social_media,
        job_amount_of_hours: job_hours,
        job_modality: jobModalityParsed,
        kind_of_job,
        cva_information: {
          update: {
            data: {
              is_in_cva: currentlyInCva,
              cva_modality,
              cva_location,
              not_started_cva_reason,
              certificate,
              modules: {
                create: {
                  module: Number(module),
                  qualification: 0,
                }
              }
            }
          }
        },
        collage_information: {
          update: {
            data: {
              study_regime: regime,
              inscription_comprobant: incription_prove.split(',')[0],
              career_schedule: incription_prove.split(',')[1],
              career,
              collage_period: {
                create: {
                  grade: Number(grade),
                  record,
                  class_modality: modality,
                  current_academic_period: Number(current_academic_period),
                }
              },
            }
          }
        },
      },
    });
  });

}

const parseModality = (modality: string) => {
  if (modality === 'Presencial') return 'IN_PERSON';
  if (modality === 'Virtual') return 'ONLINE';
  if (modality === 'Mixta') return 'HYBRID';
  return 'IN_PERSON';
}

const parseStudyRegime = (regime: string) => {
  switch (regime) {
    case 'Semestral':
      return 'SEMESTER';
    case 'Anual':
      return 'ANNUAL';
    case 'Trimestral':
      return 'QUARTER';
    case 'Cuatrimestral':
      return 'QUARTIER'
    default:
      return 'ANNUAL';
  }
};