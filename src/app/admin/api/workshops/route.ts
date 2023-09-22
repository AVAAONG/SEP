import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import { getSpreadsheetValues, getSpreadsheetValuesByUrl } from '@/lib/googleAPI/sheets';
import { Platform } from '@/types/General';
import { ActivityStatus, Modality, ScholarAttendance, User, WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: Response, res: Response) {
  const token = await getToken({ req });
  setTokens(token.accessToken, token.refreshToken);
  await createWorkshopsInbulkFromSpreadsheet()
  return NextResponse.json({ message: "flour" });
}

const addAttendaceToScholar = async (workshopId: string, user: User, attendance: ScholarAttendance) => {
  await prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId
        }
      },
      scholar: {
        connect: {
          id: user?.program_information_id!
        }
      },
      attendance: attendance as ScholarAttendance
    },
  })
}




const createWorkshopsInbulkFromSpreadsheet = async () => {
  const WORKSHOP_SPREADSHEET = '1u-fDi_uggUCvK1v4DPPCwfx3pu8-Q2-VHnQ6ivbTi4k';
  const WORKSHOP_SHEET = 'Registro de talleres';
  const WORKSHOP_RANGE = `'${WORKSHOP_SHEET}'!A8:N96`;
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPREADSHEET,
    WORKSHOP_RANGE
  )) as string[][];

  for (const value of values) {
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
    const [dates, hours] = parseDates(date, startHour, endHour)
    const workshopId = nanoid()
    try {
      await prisma.workshop.create({
        data: {
          id: workshopId,
          title,
          asociated_skill: parseSkill(skill),
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
      console.log("✅✅✅✅✅✅✅ Taller creado " + title + " ✅✅✅✅✅✅✅")
    }
    catch (e) {
      console.log("❌❌❌❌❌ No se pudo crear el taller ❌❌❌❌❌", title)
      continue
    }
    if (status === 'SUSPENDIDO' || status === 'SCHEDULED') continue;
    else {
      console.log("Colocando asistencia " + title);
      const ATTENDANCE_RANGE1 = `'${sheetName}'!B8:G${spots}`;
      const attendance = await getSpreadsheetValuesByUrl(spreadsheet, ATTENDANCE_RANGE1) as string[][];
      for (const a of attendance) {
        if (a[2].length === 0) break;
        const dni = a[2].toLowerCase().trim().replaceAll('.', '').replaceAll("v-", "");
        const attendance = parseScholarAttendace(status, a[5]);
        let user;
        try {
          user = await prisma.user.findUnique({
            where: {
              dni
            }
          })
          addAttendaceToScholar(workshopId, user!, attendance as ScholarAttendance);
        }
        catch (e) {
          console.log("no se pudo colocar a ", dni, "en", title, spreadsheet)
        }
      }
      const ATTENDANCE_RANGE2 = `'${sheetName}'!B${spots}:G`;
      const attendance2 = await getSpreadsheetValuesByUrl(spreadsheet, ATTENDANCE_RANGE2) as string[][]
      if (attendance2 === undefined || attendance2.length === 0) continue
      else {
        for (const a of attendance2) {
          if (a[0].length === 0) break
          const dni = a[2].toLowerCase().trim().replaceAll('.', '').replaceAll("v-", "")
          const attendance = parseScholarAttendace(status, a[5])
          let user;
          try {
            user = await prisma.user.findUnique({
              where: {
                dni
              }
            })
            addAttendaceToScholar(workshopId, user!, attendance as ScholarAttendance);
          }
          catch (e) {
            console.log("no se pudo colocar a ", dni, "en el taller", title, spreadsheet)
          }
        }
      }
    }
  }
}


// ======================================================= UTILS 
const parseWorkshopYear = (year: string) => {
  const years = year.includes(',') ? year.split(',') : [year]
  return years.map((y) => y.trim().toLocaleUpperCase() as WorkshopYear)
}
const parseSkill = (skill: string) => {
  switch (skill.trim()) {
    case "Ejercicio Ciudadano":
      return "CITIZEN_EXERCISE";
    case "Emprendimiento":
      return "ENTREPRENEURSHIP";
    case "Gerencia de si mismo":
      return "SELF_MANAGEMENT";
    case "Liderazgo":
      return "LEADERSHIP";
    case "TIC":
      return "ICT";
    default:
      return "CITIZEN_EXERCISE";

  }
}
const parseWorkshopStatus = (statuss: string) => {
  switch (statuss) {
    case "SCHEDULED":
      return "SCHEDULED";
    case "SUSPENDIDO":
      return "SUSPENDED";
    case "REALIZADO":
      return "ATTENDANCE_CHECKED";
    case "ENVIADO":
      return "SENT";
    case "SIN_ASISTENCIA":
      return "DONE"
  }
}
const parseWorkshopModality = (modality: string) => {
  switch (modality) {
    case "Presencial":
      return "IN_PERSON";
    case "Virtual":
      return "ONLINE";
    case "Asincrono":
      return "ONLINE";
  }
}
const parseDates = (date: string, startHour: string, endHour: string): [{
  start_dates: string[];
  end_dates: string[];
}, number] => {
  const dates = date.includes(',') ? date.split(',') : [date]
  let hours: number = 0
  const start_dates: string[] = []
  const end_dates: string[] = []
  dates.forEach((d) => {
    d = d.trim()
    const [startDate, endDate] = getFormatedDate(d, startHour.trim(), endHour.trim());
    hours = hours + moment(endDate).diff(moment(startDate), 'minutes') / 60
    start_dates.push(startDate)
    end_dates.push(endDate)
  })
  const newDates = {
    start_dates,
    end_dates
  }
  return [newDates, hours]
}

const parseScholarAttendace = (status: string, attendance: "Si" | "No") => {
  let parseAttendance;
  if (status === 'ENVIADO') parseAttendance = "ENROLLED"
  else parseAttendance = attendance === "Si" ? "ATTENDED" : "WAITING_LIST"
  return parseAttendance
}

const findUser = async (dni: string) => {
  const user = await prisma.user.findUnique({
    where: {
      dni
    }
  })
  return user
}
