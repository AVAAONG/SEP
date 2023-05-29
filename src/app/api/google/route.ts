import authOptions from '@/lib/auth/nextAuth/providerConfig';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import { createEvent, getCalendarEvents, listCalendars } from '@/lib/calendar/calendar';
import { Workshop } from '@/types/Workshop';
import shortUUID from 'short-uuid';
import { authenticateWithZoom, getUserInfo } from '@/lib/zoom/zoom';

const workshop: Workshop= {
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
    const t = await createEvent('workshop', workshop)
    // const t = await getUserInfo()
    console.log(t)
}