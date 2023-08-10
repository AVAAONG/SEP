import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import shortUUID from 'short-uuid';
import { getSpreadsheetValues } from '@/lib/sheets/sheets';
import { Pensum } from '@/types/Workshop';
import {
  Attendance,
  Level,
  Modality,
  Platform,
  WorkshopDates,
  activityStatus,
} from '@prisma/client';
import { createWorkshop, createWorkshopSpeaker } from '@/lib/database/Workshops';
import { addHours, getFormatedDate } from '@/lib/calendar/utils';
import { create } from 'domain';
import {
  createScholar,
  deleteAllScholars,
  getScholars,
  getScholarsCount,
} from '@/lib/database/users';
import {
  convertScholarToSpeaker,
  countChatSpeakers,
  createChat,
  createChatSpeaker,
  deleteAllChatSpeakers,
  deleteAllChats,
} from '@/lib/database/chats';

const facilitadores = "'Hoja 2'!C3:D34";
const talleres = "'Vista principal de talleres'!C10:P57";

const createScholarsInbatch = async (values: any[][]) => {
  values.forEach(async (value) => {
    const scholar = new ScholarOldSpreadshetDatabase(...value);
    scholar.dni = scholar.dni.trim();
    scholar.dni = scholar.dni.replace(/\./g, '');
    scholar.dni = scholar.dni.replace(/-/g, '');
    scholar.dni = scholar.dni.replace(/v/g, '');
    scholar.dni = scholar.dni.replace(/V/g, '');
    scholar.dni = scholar.dni.replace(/e/g, '');
    scholar.dni = scholar.dni.replace(/E/g, '');
    scholar.scholarStatus = 'ALUMNI';

    scholar.isCurrentlyWorking = null;
    scholar.academicLoadCompleted = null;
    scholar.birthDate = null;
    scholar.ceremonyDate = null;
    scholar.birthDate = new Date(scholar.birthDate);

    delete scholar['haveWatsApp'];
    delete scholar['age'];
    delete scholar['avaaYear'];
    delete scholar.id;
    delete scholar['volunteerInAnother'];
    await createScholar(scholar);
  });
};

// values.forEach(async(value) => {
//     await createWorkshopSpeaker({
//         id: shortUUID.generate(),
//         name: value[0],
//         email: value[1]
//     })
// })

// values.forEach(value => {
//     const workshop = new WokshopOldDatabase(...value);
//     workshop.id = shortUUID.generate();

//     delete workshop['startHour']
//     delete workshop['endHour']
//     delete workshop['date']
//     delete workshop['takenSpots']

//     const [speaker1, speaker2] = splitSpeakers(workshop.speaker)

//     const [startDate, endDate] = getFormatedDate(value[3], value[4], value[5])
//     const datesObj = [{
//         start_date: new Date(startDate),
//         end_date: new Date(endDate),
//     }]
//     workshop.title = workshop.title.trim();

//     workshop.modality = workshop.modality.toUpperCase() as Modality;
//     workshop.pensum = workshop.pensum.replaceAll(" ", "_").toLocaleUpperCase() as Pensum
//     workshop.spots = parseInt(workshop.spots as any);
//     // workshop.takenSpots = parseInt(workshop.spots as any);

//     workshop.activityStatus = workshop.activityStatus.toUpperCase() as activityStatus

//     createWorkshop(workshop, datesObj, speaker1);
// })

const chats = 'Sheet1!A2:H104';
const chatsSpeakers = 'Sheet2!E2:E27';

export async function GET(req: NextApiRequest, res: NextResponse) {
  const token = await getToken({ req });
  //@ts-ignore
  setTokens(token.accessToken, token.refreshToken);
  await deleteAllChats();
  const values = (await getSpreadsheetValues(
    '1y4lTjgqSQvBNtoWF_v6G2UR3a4eS-Et_dDD9XoQcYlM',
    chats
  )) as string[][];
  values.forEach(async (value) => {
    const chat = new ChatOldDatabase(...value);
    chat.id = shortUUID.generate();
    const [startDate, s] = getFormatedDate(chat.date, chat.hour, chat.hour);
    const endDate = addHours(new Date(startDate), 2);
    chat.modality = chat.modality.toUpperCase() as Modality;
    chat.activityStatus = chat.activityStatus === 'TRUE' ? 'REALIZADO' : 'SUSPENDIDO';
    chat.level = chat.level.toUpperCase() as Level;

    delete chat['hour'];
    delete chat['date'];

    const datesObj = [
      {
        startDate,
        endDate,
      },
    ];
    chat.dates = datesObj;
    chat.spots = 15;

    await createChat(chat);
  });

  return NextResponse.json({ message: 'ok' });
}

const splitSpeakers = (speakerId: string) => {
  if (speakerId.includes(',')) {
    const [speaker1, speaker2] = speakerId.split(',');
    return [speaker1, speaker2];
  } else {
    return [speakerId];
  }
};

class ScholarOldSpreadshetDatabase {
  constructor(
    public id: shortUUID.SUUID,
    public lastNames: string,
    public firstNames: string,
    public dni: string,
    public gender: string,
    public birthDate: Date,
    public age: number,
    public localPhoneNumber: string,
    public cellPhoneNumber: string,
    public haveWatsApp: boolean,
    public whatsAppNumber: string,
    public stateOfOrigin: string,
    public currentZone: string,
    public email: string,
    public collage: string,
    public carrer: string,
    public studyArea: string,
    public currentAcademicPeriod: string,
    public academicYear: number,
    public classModality: string,
    public cvaLocation: string,
    public englishLevel: string,
    public notStartedCvaRreason: string,
    public avaaAdmissionYear: number,
    public avaaYear: number,
    public volunteerInAnother?: boolean,
    public volunteeringOrganizationName?: string,
    public academicLoadCompleted?: boolean,
    public currentStatus?: string,
    public ceremonyDate?: Date,
    public isCurrentlyWorking?: boolean,
    public organizationName?: string,
    public positionHeld?: string,
    public workModality?: string,
    public canAssistToWorkshops?: boolean,
    public canAssistToChats?: boolean,
    public canAssistToVolunteers?: boolean,
    public region?: string,
    public userId?: null,
    public scholarStatus?: string
  ) {}
}

class WokshopOldDatabase {
  constructor(
    public id: shortUUID.SUUID,
    public title: string,
    public pensum: Pensum,
    public date: string,
    public startHour: string,
    public endHour: string,
    public speaker: String,
    public spots: number,
    public modality: Modality,
    public platform: Platform,
    public description?: string,
    public year?: string,
    public takenSpots?: number,
    public activityStatus?: activityStatus,
    public attendance?: Attendance[],
    public dates?: WorkshopDates[]
  ) {}
}

class ChatOldDatabase {
  constructor(
    public activityStatus: activityStatus,
    public date: string,
    public hour: string,
    public level: Level,
    public title: string,
    public speaker: string,
    public platform: Platform,
    public modality: Modality,
    public id: string,
    public spots: number,
    public calendarID: string
  ) {}
}
