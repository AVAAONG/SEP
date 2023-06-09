import authOptions from '@/lib/auth/nextAuthOptions/authOptions';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import { createEvent, getCalendarEvents, listCalendars } from '@/lib/calendar/calendar';
import { Workshop } from '@/types/Workshop';
import shortUUID from 'short-uuid';
import { authenticateWithZoom, getUserInfo } from '@/lib/zoom/zoom';
import { createGoogleForm, updateFormInfo } from '@/lib/form/form';
import { copyFile } from '@/lib/drive/drive';
import { createWorkshopCalendarDescription } from '@/lib/calendar/calendarDescription';
import { getPrimaryEmailsFromContactGroup, getGroupOfContacts } from '@/lib/contacts/contacts';
import { getSpreadsheetValues } from '@/lib/sheets/sheets';
import { createScholar } from '@/lib/database/users';
import moment from 'moment';

const workshop: Workshop = {
    "name": "Funcion surpucasfsdfasdfas",
    "pensum": "Liderazgo",
    "date": "2023-06-25",
    "startHour": "18:33",
    "endHour": "22:30",
    "speaker": "Luis Lopéz",
    "numberOfParticipants": 20,
    "kindOfWorkshop": "virtual",
    "platform": "google meet",
    "avaaYear": [
        "V",
        "+V"
    ],
    "description": "Este taller...",
    "id": "guy2a9Z8oo7Nb45z343teEyBNAq" as shortUUID.SUUID
}

export async function GET(req: NextApiRequest, res: NextResponse) {
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken, token.refreshToken)
    const values = await getSpreadsheetValues("1UpTuisAcdb7Gs79cmYAyA4kb7GnXqvNjf8i_enhZqzk", "'Activos '!A2:AH224") as string[][]
    values.forEach(async (value) => {
        const scholar = new ScholarOldSpreadshetDatabase(...value)
        scholar.dni = scholar.dni.trim()
        scholar.dni = scholar.dni.replace(/\./g, "")
        scholar.dni = scholar.dni.replace(/-/g, "")
        scholar.dni = scholar.dni.replace(/v/g, "")
        scholar.dni = scholar.dni.replace(/V/g, "")
        scholar.dni = scholar.dni.replace(/e/g, "")
        delete scholar.id
        scholar.dni = scholar.dni.replace(/E/g, "")

        scholar.currentlyWorking = null
        scholar.academicLoadCompleted = null

        scholar.birthDate = null
        scholar.ceremonyDate = null

        delete scholar["haveWatsApp"]
        delete scholar["age"]
        delete scholar["avaaYear"]
        delete scholar["volunteerInAnother"]
        await createScholar(scholar)
    })
    return NextResponse.json("Se estan creando los usuarios")
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
