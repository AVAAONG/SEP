import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { WorkshopSpeaker } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req });
  setTokens(token.accessToken, token.refreshToken);
  const workshopSpeakers = await createWorkshopSpeakerFromSpreadsheet();
  console.log(workshopSpeakers);
  return NextResponse.json(workshopSpeakers);
};
const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B2:I87`;

const createWorkshopSpeakerFromSpreadsheet = async () => {
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPEAKERS_SPREADSHEET,
    WORKSHOP_SPEAKERS_RANGE
  )) as string[][];

  const workshopSpeakers = values.map((value) => {
    const [
      first_names,
      last_names1,
      last_names2,
      id,
      email,
      phone_number,
      job_company,
      speakerGender,
    ] = value;
    const gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
    const workshopSpeaker: WorkshopSpeaker = {
      id,
      first_names,
      last_names: `${last_names1} ${last_names2}`,
      email: email ? email.toLowerCase() : null,
      birthdate: null,
      years_of_exp: null,
      job_title: null,
      job_company: job_company ? job_company.toLowerCase() : null,
      actual_city: null,
      gender,
      actual_country: null,
      curriculum: null,
      description: null,
      facebook_user: null,
      image: null,
      instagram_user: null,
      linkedin_user: null,
      phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
      twitter_user: null,
    };
    // await createWorkshopSpeaker(workshopSpeaker);
    return workshopSpeaker;
  });

  return workshopSpeakers;
};
