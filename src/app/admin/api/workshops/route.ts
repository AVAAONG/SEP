import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
import { prisma } from '@/lib/db/utils/prisma';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { Platform } from '@/types/General';
import { ActivityStatus, Modality, Skill, WorkshopYear } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

const FORM_CREATION_APPSCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec';

const WORKSHOP_SPREADSHEET = '1u-fDi_uggUCvK1v4DPPCwfx3pu8-Q2-VHnQ6ivbTi4k';
const WORKSHOP_SHEET = 'Registro de talleres';
const WORKSHOP_RANGE = `'${WORKSHOP_SHEET}'!A2:N96`;

export async function GET(req: Response, res: Response) {
  const workshops = await getScheduledWorkshops();
  return NextResponse.json(workshops);
}

const parseDates = (date: string, startHour: string, endHour: string) => {
  const dates = date.includes(',') ? date.split(',') : [date]

  const newDates = dates.map((d) => {
    d = d.trim()
    const [startDate, endDate] = getFormatedDate(d, startHour.trim(), endHour.trim())
    return {
      start_date: new Date(startDate),
      end_date: new Date(endDate),
    }
  })
  return newDates
}

const createWorkshopsInbulkFromSpreadsheet = async () => {
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPREADSHEET,
    WORKSHOP_RANGE
  )) as string[][];
  const workshopId = nanoid()

  values.forEach(async (value) => {
    const [
      title,
      skill,
      date,
      startHour,
      endHour,
      speakerId,
      spots,
      modality,
      platform,
      description,
      workshopYear,
      status,
      spreadsheet,
      sheetName,
    ] = value;
    const dates = parseDates(date, startHour, endHour)

    prisma.workshop.create({
      data: {
        id: workshopId,
        title,
        asociated_skill: skill as Skill,
        ...dates,
        speaker: {
          connect: {
            id: speakerId,
          },
        },
        avalible_spots: parseInt(spots),
        modality: parseWorkshopModality(modality) as Modality,
        platform: platform as Platform,
        description,
        year: parseWorkshopYear(workshopYear),
        activity_status: parseWorkshopStatus(status) as ActivityStatus,
      },
    })

    const ATTENDANCE_SHEET = sheetName;
    const ATTENDANCE_RANGE = `'${ATTENDANCE_SHEET}'!A2:N96`;

    const attendance = await getSpreadsheetValues(spreadsheet, ATTENDANCE_RANGE) as string[][]

    const attendanceMap = attendance.map(async (a) => {
      const dni = a[3].toLowerCase().trim().replaceAll('.', '').replaceAll("v-", "")
      const attendance = a[6] === "Si" ? "ATTENDED" : "NOT_ATTENDED"

    })
  })
}

const createAttendance = async () => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        dni: 'dni'
      }
    })
  }
  catch (e) {
    console.log(e)
  }

  prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId
        }
      },
      scholar: {
        connect: {
          id: user?.id
        }
      },
      attendance: 'ATTENDED'
    },
  })
}

const parseWorkshopYear = (year: string): WorkshopYear[] => {
  const years = year.includes(',') ? year.split(',') : [year]
  years.map((y) => {
    y = y.trim()
    return y
  })
  return years as WorkshopYear[]
}








const parseWorkshopStatus = (statuss: string) => {
  switch (statuss) {
    case "SCHEDULED":
      return "SCHEDULED";
    case "SUSPENDIDO":
      return "SUSPENDED";
    case "REALIZADO":
      return "DONE";
    case "ENVIADO":
      return "SENT";
  }
}
const parseWorkshopModality = (modality: string) => {
  switch (modality) {
    case "Presencial":
      return "IN_PERSON";
    case "Virtual":
      return "ONLINE";
  }

}

// const temp = async (workshop) => {
//     const { speaker, title, modality, spots } = workshop;
//     const formDescription = createFormDescription(workshop)
//     const workshopId = shortUUID.generate()

//     const [
//         calendarEventId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword
//     ] = await createEvent('workshop', workshop)

//     const formUrl = await createForm(
//         title,
//         modality,
//         spots,
//         workshopId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         formDescription

//     )
//     const speakerId = speaker

//     const tempDataObj: WorkshopTempData = {
//         id: shortUUID.generate(),
//         meetingPassword,
//         meetingLink,
//         meetingId,
//         formLink: formUrl
//     }
//     const normalizedWorkshop = normalizeWorkshopData(workshop, workshopId, tempDataObj, calendarEventId)

//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     createWorkshop(normalizedWorkshop, speakerId, tempDataObj)
// }

// const normalizeWorkshopData = (workshop: FormTypeWorkshop, id, tempDataObj, calendarEventId): Workshop => {
//     const { title, pensum, startHour, endHour, date, spots, modality, description, platform, workshopYear } = workshop;
//     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
//     const normalizeWorkshopObject: Workshop = {
//         id,
//         title: title,
//         spots: parseInt(spots),
//         platform: platform.trim().toUpperCase().replace(' ', '_') as Platform,
//         description,
//         workshopYear: workshopYear,
//         modality: modality.toUpperCase() as Modality,
//         pensum: pensum.toUpperCase() as Pensum,
//         dates: {
//             start_date: new Date(startDate),
//             end_date: new Date(endDate),
//         },
//         activityStatus: "AGENDADO",
//         tempData: tempDataObj,
//         calendarID: calendarEventId,

//     }
//     return normalizeWorkshopObject;
// }

// export async function PATCH(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function DELETE(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }
// export async function PUT(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function GET(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)

//     return NextResponse.json({ messagge: "ok" })
// }
