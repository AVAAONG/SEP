import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import { getSpreadsheetValues, getSpreadsheetValuesByUrl } from '@/lib/googleAPI/sheets';
import { Platform } from '@/types/General';
import { ActivityStatus, Modality, Skill, WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';



export async function GET(req: Response, res: Response) {
  const token = await getToken({ req });
  setTokens(token.accessToken, token.refreshToken);
  return NextResponse.json({ message: "ok" });
}

const createWorkshopsInbulkFromSpreadsheet = async () => {
  const WORKSHOP_SPREADSHEET = '1u-fDi_uggUCvK1v4DPPCwfx3pu8-Q2-VHnQ6ivbTi4k';
  const WORKSHOP_SHEET = 'Registro de talleres';
  const WORKSHOP_RANGE = `'${WORKSHOP_SHEET}'!A2:N96`;
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPREADSHEET,
    WORKSHOP_RANGE
  )) as string[][];

  const example = values.map(async (value) => {
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
    ] = value; 7
    const [dates, hours] = parseDates(date, startHour, endHour)
    const workshopId = nanoid()

    prisma.workshop.create({
      data: {
        id: workshopId,
        title,
        asociated_skill: skill as Skill,
        ...dates,
        hours: hours,
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
      }
    })
    const ATTENDANCE_RANGE = `'${sheetName}'!B8:G`;
    const attendance = await getSpreadsheetValuesByUrl(spreadsheet, ATTENDANCE_RANGE) as string[][]

    const attendanceMap = attendance.map(async (a) => {
      const dni = a[2].toLowerCase().trim().replaceAll('.', '').replaceAll("v-", "")
      const attendance = a[5] === "Si" ? "ATTENDED" : "NOT_ATTENDED"
      let user;
      try {
        user = await prisma.user.findUnique({
          where: {
            dni
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
          attendance: attendance
        },
      })
    })
    return []
  })
  return Promise.all(example);
}

const parseWorkshopYear = (year: string): WorkshopYear[] => {
  const years = year.includes(',') ? year.split(',') : [year]
  return years.map((y) => y.trim().toLocaleUpperCase() as WorkshopYear)
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

const parseDates = (date: string, startHour: string, endHour: string): [{
  start_date: string;
  end_date: string;
}[], number] => {
  const dates = date.includes(',') ? date.split(',') : [date]
  let hours: number = 0

  const newDates = dates.map((d) => {
    d = d.trim()
    const [startDate, endDate] = getFormatedDate(d, startHour.trim(), endHour.trim())
    hours = hours + moment(endDate).diff(moment(startDate), 'minutes') / 60
    return {
      start_date: new Date(startDate).toLocaleString(),
      end_date: new Date(endDate).toLocaleString(),
    }
  })

  return [newDates, hours]
}
