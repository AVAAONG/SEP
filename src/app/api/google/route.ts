import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import shortUUID from 'short-uuid';
import { getSpreadsheetValues } from '@/lib/sheets/sheets';
import { Pensum } from "@/types/Workshop";
import { Attendance, Modality, Platform, WorkshopDates, activityStatus } from "@prisma/client";
import { createWorkshop, createWorkshopSpeaker } from "@/lib/database/Workshops";
import { getFormatedDate } from "@/lib/calendar/utils";
import { create } from "domain";
import { createScholar, deleteAllScholars, getScholarsCount } from "@/lib/database/users";

const facilitadores = "'Hoja 2'!B2:C32"
const talleres = "'Vista principal de talleres'!C10:P55"


const createScholarsInbatch = async (values: any[][]) => {
    values.forEach(async (value) => {
        const scholar = new ScholarOldSpreadshetDatabase(...value)
        scholar.dni = scholar.dni.trim()
        scholar.dni = scholar.dni.replace(/\./g, "")
        scholar.dni = scholar.dni.replace(/-/g, "")
        scholar.dni = scholar.dni.replace(/v/g, "")
        scholar.dni = scholar.dni.replace(/V/g, "")
        scholar.dni = scholar.dni.replace(/e/g, "")
        scholar.dni = scholar.dni.replace(/E/g, "")
        scholar.scholarStatus = "ALUMNI"

        scholar.isCurrentlyWorking = null
        scholar.academicLoadCompleted = null
        scholar.birthDate = null
        scholar.ceremonyDate = null
        scholar.birthDate = new Date(scholar.birthDate)

        delete scholar["haveWatsApp"]
        delete scholar["age"]
        delete scholar["avaaYear"]
        delete scholar.id
        delete scholar["volunteerInAnother"]
        await createScholar(scholar)

    })
}

export async function GET(req: NextApiRequest, res: NextResponse) {
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken, token.refreshToken)
    const values = await getSpreadsheetValues("1hGxwp8LEIyf3SJQOT3KpN8P9XaaQk0qrHXZV682SWws", "'Activos'!A255:AH256") as string[][]
    await createScholarsInbatch(values)
    // const count = await getScholarsCount()
    // await deleteAllScholars()
    // values.forEach(value => {
    //     createWorkshopSpeaker
    //         id: shortUUID.generate(),
    //         name: value[0],
    //         email: value[1]
    //     })
    // })

    // values.forEach(value => {
    //     const workshop = new WokshopOldDatabase(...value);
    //     delete workshop['startHour']
    //     const [speaker1, speaker2] = workshop.speaker.split(" y ")
    //     delete workshop['endHour']
    //     delete workshop['date']
    //     workshop.id = shortUUID.generate();
    //     const [startDate, endDate] = getFormatedDate(value[3], value[4], value[5])
    //     const datesObj = {
    //         id: shortUUID.generate(),
    //         start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
    //         end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
    //     }
    //     workshop.title = workshop.title.trim();

    //     workshop.modality = workshop.modality.toUpperCase() as Modality;
    //     workshop.pensum = workshop.pensum.replaceAll(" ", "_").toLocaleUpperCase() as Pensum
    //     workshop.spots = parseInt(workshop.spots as any);
    //     workshop.takenSpots = parseInt(workshop.spots as any);
    //     workshop.activityStatus = "REALIZADO";

    //     createWorkshop(workshop, datesObj, speaker1);

    // })

    return NextResponse.json({ total: "total"})
}

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
        public scholarStatus?: string,   

    ) {
    }
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
        public avaaYear?: string,
        public takenSpots?: number,
        public activityStatus?: activityStatus,
        public attendance?: Attendance[],
        public dates?: WorkshopDates[]
    ) { }
}