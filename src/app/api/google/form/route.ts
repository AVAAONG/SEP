import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from 'next';
import { createEvent } from "@/lib/calendar/calendar";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { createWorkshopCalendarDescription } from "@/lib/calendar/calendarDescription";
import { Workshop } from "@/types/Workshop";
import { createWorkshop } from "@/lib/database/Workshops";
import shortUUID from "short-uuid";
import { getFormatedDate } from "@/lib/calendar/utils";

const addDays = (date: number, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
}

const createFormDescription = (workshop: Workshop) => {
    const { name, pensum, date, startHour, endHour, speaker, modality, platform, description } = workshop;
    const formDescription = `Taller: ${name}
Competencia Asociada: ${pensum}
${modality === "asincrona" ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(addDays(new Date(date), 3)).toLocaleDateString()}` : `Fecha: ${date}`}
${modality === "asincrona" ? `` : `Horario: de ${startHour} hasta las ${endHour}`}
Facilitador: ${speaker}
Modalidad: ${modality}
${modality === "presencial" ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
    return formDescription;

};

const BASE_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'

export async function POST(req: NextRequest, res: NextResponse) {
    const reqData = await req.json()
    const token = await getToken({ req });

    reqData.workshops.forEach(async (workshop: Workshop) => {
        setTokens(token.accessToken, token.refreshToken)
        const { name, speaker, pensum, date, startHour, endHour, platform, description, avaaYear, modality } = workshop
        const [calendarEventId, addUrl, meetLink, meetId, meetingPassword] = await createEvent('workshop', workshop)
        const formDescription = createFormDescription(workshop)
        const respon = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activityName: name,
                description: formDescription,
                addUrl: addUrl
            })
        })
        const speakerId = ''
        const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
        const datesObj = {
            id: shortUUID.generate(),
            start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
            end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
        }
        const tempDataObj = {
            id: shortUUID.generate(),
            workshop,
            workshopId: workshop.id,
            calendaID: calendarEventId,
            meetingPassword,
            meetingLink: meetLink,
            meetingId: meetId,
        }
        createWorkshop(workshop, datesObj, speakerId, tempDataObj)
        const data = await respon.json()

    })
    return NextResponse.json({ a: 'adsfasds' })
}
