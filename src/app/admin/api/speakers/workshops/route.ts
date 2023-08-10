import { createWorkshopSpeaker } from '@/lib/database/Workshops';
import { getWorkshopSpeakersWithParams } from '@/lib/database/speaker';
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { WorkshopSpeaker } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B3:I81`;

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  setTokens(token.accessToken, token.refreshToken);
  const toSelect = {
    id: true,
    first_names: true,
    last_names: true,
    email: true,
  };
  const data = await getWorkshopSpeakersWithParams(toSelect);
  return NextResponse.json(data);
}

const createWorkshopSpeakerFromSheet = async () => {
  // await deleteWorkshopSpeakers();
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPEAKERS_SPREADSHEET,
    WORKSHOP_SPEAKERS_RANGE
  )) as string[][];

  const workshopSpeakers = values.map(async (value) => {
    const [first_names, last_names, , id, email, phone_number, job_company, speakerGender] = value;
    const gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
    const workshopSpeaker: WorkshopSpeaker = {
      id,
      first_names,
      last_names,
      email,
      phone_number,
      job_company,
      gender,
    };
    await createWorkshopSpeaker(workshopSpeaker);
    return workshopSpeaker;
  });

  return workshopSpeakers;
};
