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
    setTokens(token.accessToken)
    // const copyId = await copyFile("Taller para el liderazgo social", "11Ws31Y5yhY34KClYte-QhYOYd9ioqon6E8l9NWSQeLM","1f6JD_QxQzDe1EijDUbpA8zEcKAuEL3tB" )
    // const cal = createWorkshopCalendarDescription(workshop.pensum,workshop.speaker, workshop.kindOfWorkshop, workshop.platform, workshop.description, workshop.avaaYear)
    // const t = await updateFormInfo(copyId!, "Taller de prueba", cal) 
    const values = await getSpreadsheetValues("1UpTuisAcdb7Gs79cmYAyA4kb7GnXqvNjf8i_enhZqzk", "'Activos '!A1:AI224") as string[][]
// console.log(values)
    values.forEach((value) => {
        const scholar = new ScholarOldSpreadshetDatabase(...value)
        scholar.dni = scholar.dni.trim()
        scholar.dni = scholar.dni.replace(/\./g, "")
        scholar.dni = scholar.dni.replace(/-/g, "")
        scholar.dni = scholar.dni.replace(/v/g, "")
        scholar.dni = scholar.dni.replace(/V/g, "")
        scholar.dni = scholar.dni.replace(/e/g, "")
        scholar.dni = scholar.dni.replace(/E/g, "")
        delete scholar["haveWatsApp"]
        delete scholar["avaaYear"]
        delete scholar["volunteerInAnother"]
        createScholar(scholar);
        console.log("Adding to the database:" + scholar.firstNames)
    })
    return NextResponse.json('Creating')
    // const t = await getUserInfo()
    // console.log(contactsGroups)

    //se copia el formulario, se acomoda el titulo y la description, se envia a apscript para ponerle el mensaje de confirmacion. y se crea el triger. 
}

class ScholarOldSpreadshetDatabase {
    constructor(
        public id: shortUUID.SUUID,
        public lastNames: string,
        public firstNames: string,
        public dni: string,
        public gender: string,
        public birthdate: Date,
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
        public notStartedCvaReasion: string,
        public avaaAdmissionYear: number,
        public avaaYear: number,
        public volunteerInAnother: boolean,
        public volunteeringOrganizationName?: string,
        public academicLoadCompleted?: number,
        public currentStatus?: string,
        public ceremonyDane?: Date,
        public currentlyWorking?: boolean,
        public organizationName?: string,
        public positionHeld?: string,
        public workshopModality?: string,
    ) {
    }
}
