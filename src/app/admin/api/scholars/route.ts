import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

const SCHOLARS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const SCHOLARS_SHEET_NAME = 'Facilitadores de talleres';
const SCHOLARS_SHEET_RANGE = `'${SCHOLARS_SHEET_NAME}'!B2:I87`;

export const GET = async (req: Request) => {
  return NextResponse.json({ message: 'Hello World' });
};

const createScholarsInBulkFromSheet = async () => {
  const values = (await getSpreadsheetValues(
    SCHOLARS_SPREADSHEET,
    SCHOLARS_SHEET_RANGE
  )) as string[][];
  const scholars = values.map((row) => {
    const [
      lastName,
      firstName,
      dni,
      gender,
      birthdate,
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
    const scholar: User = {};
    const scholarGender = gender.toLowerCase() === 'masculino' ? 'M' : 'F';
  });
};
