import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import shortUUID from 'short-uuid';
import { getSpreadsheetValues } from '@/lib/sheets/sheets';
import { Pensum } from "@/types/Workshop";
import { Attendance, Modality, Platform, WorkshopDates, WorkshopSpeakers, activityStatus } from "@prisma/client";
import { createWorkshop, createWorkshopSpeaker } from "@/lib/database/Workshops";
import { getFormatedDate } from "@/lib/calendar/utils";
import { create } from "domain";

const facilitadores = "'Hoja 2'!B2:C32"
const talleres = "'Vista principal de talleres'!C10:P55"

export async function GET(req: NextApiRequest, res: NextResponse) {
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken, token.refreshToken)
    const values = await getSpreadsheetValues("1BVWubj5NIdV5gMEqed9so0CDek-JaRQl1AMFO0Z-Ee4", talleres) as string[][]
    // values.forEach(value => {
    //     createWorkshopSpeaker({
    //         id: shortUUID.generate(),
    //         name: value[0],
    //         email: value[1]
    //     })
    // })

    values.forEach(value => {
        const workshop = new WokshopOldDatabase(...value);
        delete workshop['startHour']
        const [speaker1, speaker2] = workshop.speaker.split(" y ")
        delete workshop['endHour']
        delete workshop['date']
        workshop.id = shortUUID.generate();
        const [startDate, endDate] = getFormatedDate(value[3], value[4], value[5])
        const datesObj = {
            id: shortUUID.generate(),
            start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
            end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
        }
        workshop.title = workshop.title.trim();

        workshop.modality = workshop.modality.toUpperCase() as Modality;
        workshop.pensum = workshop.pensum.replaceAll(" ", "_").toLocaleUpperCase() as Pensum
        workshop.spots = parseInt(workshop.spots as any);
        workshop.takenSpots = parseInt(workshop.spots as any);
        workshop.activityStatus = "REALIZADO";

        createWorkshop(workshop, datesObj, speaker1);

    })

    return NextResponse.json(values)
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
        public currentlyWorking?: boolean,
        public organizationName?: string,
        public positionHeld?: string,
        public workshopModality?: string,
        public canAssistToWorkshops?: boolean,
        public canAssistToChats?: boolean,
        public canAssistToVolunteers?: boolean,
        public region?: string,

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


// const createScholarsInbatch = (values: any[][]) => {
//     values.forEach(async (value) => {
//         const scholar = new ScholarOldSpreadshetDatabase(...value)
//         scholar.dni = scholar.dni.trim()
//         scholar.dni = scholar.dni.replace(/\./g, "")
//         scholar.dni = scholar.dni.replace(/-/g, "")
//         scholar.dni = scholar.dni.replace(/v/g, "")
//         scholar.dni = scholar.dni.replace(/V/g, "")
//         scholar.dni = scholar.dni.replace(/e/g, "")
//         delete scholar.id
//         scholar.dni = scholar.dni.replace(/E/g, "")

//         scholar.currentlyWorking = null
//         scholar.academicLoadCompleted = null

//         scholar.birthDate = null
//         scholar.ceremonyDate = null

//         delete scholar["haveWatsApp"]
//         delete scholar["age"]
//         delete scholar["avaaYear"]
//         delete scholar["volunteerInAnother"]
//         await createScholar(scholar)
//     })
// }