import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import { appendSpreadsheetValuesByRange, createSpreadsheetAndReturnUrl, getSpreadsheetValues, getSpreadsheetValuesByUrl, insertSpreadsheetValue } from '@/lib/googleAPI/sheets';
import { Platform } from '@/types/General';
import { ActivityStatus, Modality, ScholarAttendance, User, WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  if (token === null) return NextResponse.redirect('/api/auth/signin');
  setTokens(token.accessToken as string, token.refreshToken as string);
  return NextResponse.json({ message: "ok" });
}







const createWorkshopsInbulkFromSpreadsheet = async () => {
  let index = 2;  // indice desde donde se empieza a extraer los datos de los talleres (se coloca la fila 2 porque la fila 1 son los titulos de las columnas)

  const WORKSHOP_SPREADSHEET = '1u-fDi_uggUCvK1v4DPPCwfx3pu8-Q2-VHnQ6ivbTi4k';
  const WORKSHOP_SHEET = 'Registro de talleres';
  const WORKSHOP_RANGE = `'${WORKSHOP_SHEET}'!A${index}:O96`;

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
      workshopModality,
      platform,
      description,
      workshopYear,
      status,
      spreadsheet,
      sheetName,
    ] = value;

    let spreadsheetForErrors: null | string = null // dejamos la variable en null hasta que ocurra un problema, en caso de apareceer. colocamos la spreadsheet aqui. 

    //parseamos los datos del taller
    const [dates, hours] = parseDates(date, startHour, endHour)
    const workshopId = nanoid()
    const asociated_skill = parseSkill(skill)
    const avalible_spots = parseInt(spots)
    const modality = parseWorkshopModality(workshopModality) as Modality
    const year = parseWorkshopYear(workshopYear)
    const activity_status = parseWorkshopStatus(status) as ActivityStatus
    const speakersId = parseSpeakerId(speakerId)

    // creamos el taller
    try {
      await prisma.workshop.create({
        data: {
          id: workshopId,
          title,
          asociated_skill,
          ...dates,
          hours: hours,
          speaker: {
            connect: speakersId.map((id) => ({ id }))
          },
          avalible_spots,
          modality,
          platform: platform as Platform,
          description,
          year,
          activity_status
        }
      })
      console.log("✅✅✅ Taller creado " + title)
    }
    catch (e) {
      console.log(e)
      console.log("❌❌❌ No se pudo crear el taller ", title)
      continue
    }

    if (status === 'SUSPENDIDO' || status === 'SCHEDULED') continue;

    else {


      //asistencia de la lista principal
      const ATTENDANCE_RANGE1 = `'${sheetName}'!B8:G${spots + 8}`;
      const attendance = await getSpreadsheetValuesByUrl(spreadsheet, ATTENDANCE_RANGE1) as string[][];

      if (attendance === undefined || attendance.length === 0 || attendance === undefined) {
        console.log("   No hay asistencia en lista principal")
        continue
      }
      console.log("   Colocando asistencia " + title);
      for (const a of attendance) {
        if (a === undefined || a[2] === undefined || a[2].length === 0) continue;
        const dni = parseDni(a[2])
        const attendaci = parseScholarAttendace(status, a[5] as "Si" | "No");
        let user;
        try {
          user = await prisma.user.findUniqueOrThrow({
            where: {
              dni
            }
          })
        }
        catch (e) {
          if (spreadsheetForErrors === null) {
            console.log("       Creando Spreadsheet de errores")
            spreadsheetForErrors = await createSpreadsheetAndReturnUrl(title) as string
            console.log("   Colocando Spreadsheet ")
            await insertSpreadsheetValue(WORKSHOP_SPREADSHEET, `'${WORKSHOP_SHEET}'!O${index}:O${index}`, [[spreadsheetForErrors]])
          }
          console.log('     Colocando a ' + a[0] + ' en el spreadsheet de errores', dni, user)
          a.push("MAIN_LIST")
          await appendSpreadsheetValuesByRange(spreadsheetForErrors, attendance)
          continue
        }
        console.log('     Dando asistencia a ' + a[0])
        await addAttendaceToScholar(workshopId, user!, attendaci as ScholarAttendance);
      }


      //ASISTENCIA DE LA LSITA DE ESPERA. 
      const ATTENDANCE_RANGE2 = `'${sheetName}'!B${spots + 8}:G`;
      const attendance2 = await getSpreadsheetValuesByUrl(spreadsheet, ATTENDANCE_RANGE2) as string[][]
      if (attendance2 === undefined || attendance2.length === 0) {
        console.log("No hay asistencia en lista de espera")
        continue;
      }
      else {
        for (const a of attendance2) {
          if (a === undefined || a[2] === undefined || a[2].length === 0) {
            console.log("Asistencia finalizada")
            break
          };
          const dni = parseDni(a[2])
          const attendance = parseScholarAttendaceWaitingList(status, a[5] as "Si" | "No")
          let user;
          try {
            user = await prisma.user.findUniqueOrThrow({
              where: {
                dni
              }
            })
          }
          catch (e) {
            if (spreadsheetForErrors === null) {
              console.log("   Creando Spreadsheet de errores")
              spreadsheetForErrors = await createSpreadsheetAndReturnUrl(title) as string
              console.log("   colocando Spreadsheet ")
              await insertSpreadsheetValue(WORKSHOP_SPREADSHEET, `'${WORKSHOP_SHEET}'!O${index}:O${index}`, [[spreadsheetForErrors]])
            }
            console.log('colocando a ' + a[1] + ' en el spreadsheet de errores')
            a.push("WAITING_LIST")
            await appendSpreadsheetValuesByRange(spreadsheetForErrors, attendance2)
            continue
          }
          console.log('     Dando asistencia a ' + a[0])

          await addAttendaceToScholar(workshopId, user, attendance as ScholarAttendance);
        }
      }
    }
    index = index + 1
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

const parseScholarAttendaceWaitingList = (status: string, attendance: "Si" | "No") => {
  let parseAttendance;
  if (status === 'ENVIADO') parseAttendance = "ENROLLED"
  else if (status === 'SIN_ASISTENCIA') parseAttendance = "ENROLLED"
  else parseAttendance = attendance === "Si" ? "ATTENDED" : "WAITING_LIST"
  return parseAttendance
}
const parseScholarAttendace = (status: string, attendance: "Si" | "No") => {
  let parseAttendance;
  if (status === 'ENVIADO') parseAttendance = "ENROLLED"
  else if (status === 'SIN_ASISTENCIA') parseAttendance = "ENROLLED"
  else parseAttendance = attendance === "Si" ? "ATTENDED" : "NOT_ATTENDED"
  return parseAttendance
}



const parseDni = (dni: string) => dni.trim().toLowerCase().replace(/[^0-9]/g, '');

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
          id: user.program_information_id!
        }
      },
      attendance: attendance as ScholarAttendance
    },
  })
}

const parseSpeakerId = (speakersId: string) => {
  const speakersIdArr = speakersId.includes(',') ? speakersId.split(',') : [speakersId]
  return speakersIdArr.map((speaker) => speaker.trim() as string)
}