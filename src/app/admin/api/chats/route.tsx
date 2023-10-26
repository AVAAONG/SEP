import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import {
    appendSpreadsheetValuesByRange,
    createSpreadsheetAndReturnUrl,
    getSpreadsheetValues,
    getSpreadsheetValuesByUrl,
    insertSpreadsheetValue,
} from '@/lib/googleAPI/sheets';
import { Level, Modality, Scholar, ScholarAttendance, WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  if (token === null) return NextResponse.redirect('/api/auth/signin');
  setTokens(token.accessToken as string, token.refreshToken as string);
  await prisma.chatAttendance.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.chatsTempData.deleteMany();
  await createChatsInBulkFromSpreadsheet();
  return NextResponse.json({ message: 'ok' });
}

const FEBRUARY_RANGE = 'B2:K15';
const MARCH_RANGE = 'B16:K34';

const WORKSHOP_SPREADSHEET = '1y4lTjgqSQvBNtoWF_v6G2UR3a4eS-Et_dDD9XoQcYlM';
const WORKSHOP_SHEET = 'Sheet1';
const WORKSHOP_RANGE = `'${WORKSHOP_SHEET}'!${FEBRUARY_RANGE}`;

const createChatsInBulkFromSpreadsheet = async () => {
  console.log('\x1b[36m%s\x1b[0m', '++++++ COMENZANDO EJECICION ++++++');
  // indice desde donde se empieza a extraer los datos de los talleres (se coloca la fila 2 porque la fila 1 son los titulos de las columnas)
  console.log('\x1b[34m%s\x1b[0m', 'Extrayendo datos');

  const values = (await getSpreadsheetValues(WORKSHOP_SPREADSHEET, WORKSHOP_RANGE)) as string[][];
  //   console.log(values);

  for (const [index, value] of values.entries()) {
    const [
      status,
      date,
      startHour,
      level,
      title,
      speakerName,
      speakerId,
      chatModality,
      platform,
      spreadsheet,
    ] = value;

    let spreadsheetForErrors: null | string = null; // dejamos la variable en null hasta que ocurra un problema, en caso de apareceer. colocamos la spreadsheet aqui.
    //parseamos los datos del taller

    const [dates, hours] = parseDates(date, startHour);
    const chatId = nanoid();
    const chatLevel = parseLevel(level);
    const modality = parseChatModality(chatModality) as Modality;
    const activity_status = status === 'TRUE' ? 'ATTENDANCE_CHECKED' : 'SUSPENDED';
    const speakersDni = parseSpeakerId(speakerId);
    const speakersId = speakersDni.map(async (dni) => {
      const speaker = await prisma.scholar.findUnique({
        where: {
          dni,
        },
      });
      if (speaker === null) return dni;
      else return speaker?.id;
    });
    console.log('\x1b[34m%s\x1b[0m', 'Parseando datos del taller de ' + title);

    try {
      const speakerIds = await Promise.all(speakersId);
      await prisma.chat.create({
        data: {
          id: chatId,
          title: title,
          ...dates,
          modality: modality,
          platform: platform,
          level: chatLevel,
          activity_status: activity_status,
          avalible_spots: 15,
          description: '',
          speaker: {
            connect: speakerIds.map((id) => ({ id })),
          },
        },
      });
      console.log('\x1b[32m%s\x1b[0m', '✅✅✅ chat ' + title + ' creado correctamente');
    } catch (e) {
      console.log(e);
      console.log('\x1b[31m%s\x1b[0m', '❌❌❌ No se pudo crear el chat ', title);
      continue;
    }
    if (activity_status === 'SUSPENDED') continue;
    //asistencia de la lista principal
    console.log('\x1b[34m%s\x1b[0m', 'Obteniendo datos de la lista principal');
    const attendanceRangeMainList = `A12:D${15 + 11}`;
    const mainListAttendance = (await getSpreadsheetValuesByUrl(
      spreadsheet,
      attendanceRangeMainList
    )) as string[][];

    if (mainListAttendance === undefined || mainListAttendance.length === 0) {
      console.log('   No hay asistencia en lista principal');
      continue;
    }
    console.log('\x1b[34m%s\x1b[0m', 'Colocando asistencia de lista principal');
    for (const a of mainListAttendance) {
      if (a === undefined) continue;
      const email = a[2] ?? 'NOEXISTE';
      let attendaci;
      if (speakerId === 'h3hPNMMFtpkrGEBQ8kq8M3') attendaci = 'ATTENDED';
      else attendaci = parseScholarAttendace(status, a[3] as 'TRUE' | 'FALSE');
      let scholar;
      try {
        scholar = await prisma.scholar.findUniqueOrThrow({
          where: {
            allowedEmail: email,
          },
        });
      } catch (e) {
        if (spreadsheetForErrors === null) {
          spreadsheetForErrors = await createSpreadsheetForErrors(title, index);
        }
        console.log('     Colocando a ' + a[0] + ' en el spreadsheet de errores', email);
        a.push('MAIN_LIST');
        await appendSpreadsheetValuesByRange(spreadsheetForErrors, [a]);
        continue;
      }
      console.log('     Dando asistencia a ' + a[0]);
      await addAttendaceToScholar(chatId, scholar!, attendaci as ScholarAttendance);
    }

    //ASISTENCIA DE LA LSITA DE ESPERA.
    const attendanceRangeWaitingList = `A${12 + 16}:D`;

    const attendanceWhaitingList = (await getSpreadsheetValuesByUrl(
      spreadsheet,
      attendanceRangeWaitingList
    )) as string[][];

    if (attendanceWhaitingList === undefined || attendanceWhaitingList.length === 0) {
      console.log('No hay asistencia en lista de espera');
      continue;
    } else {
      console.log('Colocando asistencia de lista de espera');
      for (const a of attendanceWhaitingList) {
        if (a === undefined || a[3] === undefined || a[2].length === 0) {
          console.log('Asistencia finalizada');
          break;
        }
        const email = a[2] ?? 'NOEXISTE';
        const attendance = parseScholarAttendaceWaitingList(status, a[3] as 'TRUE' | 'FALSE');
        let user;
        try {
          user = await prisma.scholar.findUniqueOrThrow({
            where: {
              allowedEmail: email,
            },
          });
        } catch (e) {
          if (spreadsheetForErrors === null) {
            spreadsheetForErrors = await createSpreadsheetForErrors(title, index);
          }
          console.log('colocando a ' + a[0] + ' en el spreadsheet de errores');
          a.push('WAITING_LIST');
          await appendSpreadsheetValuesByRange(spreadsheetForErrors, [a]);
          continue;
        }
        console.log('     Dando asistencia a ' + a[0]);
        await addAttendaceToScholar(chatId, user, attendance as ScholarAttendance);
      }
    }
  }
  console.log('\x1b[36m%s\x1b[0m', '++++++ EJECICION FINALIZADA ++++++');
};

// ======================================================= UTILS
const parseWorkshopYear = (year: string) => {
  const years = year.includes(',') ? year.split(',') : [year];
  return years.map((y) => y.trim().toLocaleUpperCase() as WorkshopYear);
};
const parseLevel = (skill: string): Level => {
  switch (skill.trim()) {
    case 'BASICO':
      return 'BASICO';
    case 'INTERMEDIO':
      return 'INTERMEDIO';
    case 'AVANZADO':
      return 'AVANZADO';
    default:
      return 'BASICO';
  }
};

const parseWorkshopStatus = (statuss: string) => {
  switch (statuss) {
    case 'AGENDADO':
      return 'SCHEDULED';
    case 'SUSPENDIDO':
      return 'SUSPENDED';
    case 'REALIZADO':
      return 'ATTENDANCE_CHECKED';
    case 'ENVIADO':
      return 'SENT';
    case 'SIN_ASISTENCIA':
      return 'DONE';
  }
};
const parseChatModality = (modality: string) => {
  switch (modality) {
    case 'PRESENCIAL':
      return 'IN_PERSON';
    case 'VIRTUAL':
      return 'ONLINE';
    case 'Asincrono':
      return 'ONLINE';
  }
};

const parseDates = (
  date: string,
  startHour: string
): [
  {
    start_dates: string[];
    end_dates: string[];
  },
  number,
] => {
  const dates = date.includes(',') ? date.split(',') : [date];
  let hours: number = 0;
  const start_dates: string[] = [];
  const end_dates: string[] = [];
  dates.forEach((d) => {
    d = d.trim();
    const [startDate, endDate] = getFormatedDate(d, startHour.trim());
    hours = hours + moment(endDate).diff(moment(startDate), 'minutes') / 60;
    start_dates.push(startDate);
    end_dates.push(endDate);
  });
  const newDates = {
    start_dates,
    end_dates,
  };
  return [newDates, hours];
};

const parseScholarAttendaceWaitingList = (status: string, attendance: 'TRUE' | 'FALSE') => {
  let parseAttendance;
  if (status === 'ENVIADO') parseAttendance = 'ENROLLED';
  else if (status === 'SIN_ASISTENCIA') parseAttendance = 'ENROLLED';
  else parseAttendance = attendance === 'TRUE' ? 'ATTENDED' : 'WAITING_LIST';
  return parseAttendance;
};
const parseScholarAttendace = (status: string, attendance: 'TRUE' | 'FALSE') => {
  let parseAttendance;
  if (status === 'ENVIADO') parseAttendance = 'ENROLLED';
  else if (status === 'SIN_ASISTENCIA') parseAttendance = 'ENROLLED';
  else parseAttendance = attendance === 'TRUE' ? 'ATTENDED' : 'NOT_ATTENDED';
  return parseAttendance;
};

const parseDni = (dni: string) =>
  dni
    .trim()
    .toLowerCase()
    .replace(/[^0-9]/g, '');

const addAttendaceToScholar = async (
  workshopId: string,
  user: Scholar,
  attendance: ScholarAttendance
) => {
  await prisma.chatAttendance.create({
    data: {
      chat: {
        connect: {
          id: workshopId,
        },
      },
      scholar: {
        connect: {
          id: user.program_information_id!,
        },
      },
      attendance: attendance as ScholarAttendance,
    },
  });
};

const parseSpeakerId = (speakersId: string) => {
  const speakersIdArr = speakersId.includes(',') ? speakersId.split(',') : [speakersId];

  return speakersIdArr.map((speaker) => speaker.trim() as string);
};

const createSpreadsheetForErrors = async (activityTitle: string, index: number) => {
  // colocamos ese mas 2 porque la fila 1 son los titulos de las columnas y el indice comienza desde 0
  const cellToPutSpreadsheet = `'${WORKSHOP_SHEET}'!L${index + 2}:L${index + 2}`;
  console.log('\x1b[36m%s\x1b[0m', 'Creando Spreadsheet de errores');
  const spreadsheetForErrors = (await createSpreadsheetAndReturnUrl(activityTitle)) as string;
  await insertSpreadsheetValue(WORKSHOP_SPREADSHEET, cellToPutSpreadsheet, [
    [spreadsheetForErrors],
  ]);
  return spreadsheetForErrors;
};
