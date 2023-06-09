import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import shortUUID from 'short-uuid';
import { getSpreadsheetValues } from '@/lib/sheets/sheets';
import { Pensum } from "@/types/Workshop";
import { Attendance, Modality, Platform, Scholar, WorkshopDates, WorkshopSpeakers, WorkshopTempData, activityStatus } from "@prisma/client";

export async function GET(req: NextApiRequest, res: NextResponse) {
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken, token.refreshToken)
    const values = await getSpreadsheetValues("1BVWubj5NIdV5gMEqed9so0CDek-JaRQl1AMFO0Z-Ee4", "'Vista principal de talleres'!D10:P56") as string[][]

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
        public tittle: string,
        public pensum: Pensum,
        public dates: WorkshopDates[],
        public speaker: WorkshopSpeakers[],
        public spots: number,
        public modality: Modality,
        public platform: Platform,
        public description?: string,
        public avaaYear?: string,
        public takenSpots?: number,
        public activityStatus?: activityStatus,
        public attendance?: Attendance[],
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