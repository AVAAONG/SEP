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

export async function GET(req: NextApiRequest) {
    const session = await getServerSession(authOptions);
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken)
    // const copyId = await copyFile("Taller para el liderazgo social", "11Ws31Y5yhY34KClYte-QhYOYd9ioqon6E8l9NWSQeLM","1f6JD_QxQzDe1EijDUbpA8zEcKAuEL3tB" )
    // const cal = createWorkshopCalendarDescription(workshop.pensum,workshop.speaker, workshop.kindOfWorkshop, workshop.platform, workshop.description, workshop.avaaYear)
    // const t = await updateFormInfo(copyId!, "Taller de prueba", cal) 
    const values = await getSpreadsheetValues("1BVWubj5NIdV5gMEqed9so0CDek-JaRQl1AMFO0Z-Ee4", "C9:T54")
    console.log(values)
    // const t = await getUserInfo()
    // console.log(contactsGroups)

    //se copia el formulario, se acomoda el titulo y la description, se envia a apscript para ponerle el mensaje de confirmacion. y se crea el triger. 

}