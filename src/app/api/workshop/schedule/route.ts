import { setTokens } from "@/lib/auth/auth";
import { createEvent } from "@/lib/calendar/calendar";
import { getToken } from "next-auth/jwt";
import { Workshop } from "@/types/Workshop";
import { NextRequest, NextResponse } from "next/server";
import shortUUID from "short-uuid";
import { createWorkshop, deleteWorkshopFromDatabase, getScheduledWorkshops, getWorkshops } from "@/lib/database/Workshops";
import { getFormatedDate } from "@/lib/calendar/utils";

export async function POST(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    const reqData = await req.json()
    if (token) setTokens(token.accessToken as string, token.refreshToken as string);
    else return NextResponse
    await ScheduleWorkshops(reqData);
    return NextResponse.json({ message: "ok" })

}

export const UPDATE = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req });
    if (token) setTokens(token.accessToken as string, token.refreshToken as string);
    else return NextResponse

}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req });
    const reqData = await req.json()
    console.log("deleting " + reqData)
    if (token) setTokens(token.accessToken as string, token.refreshToken as string);
    else return NextResponse
    await deleteWorkshopFromDatabase(reqData.id)
    return NextResponse.json({ message: "ok" })

}
const createFormDescription = (workshop: Workshop) => {
    const { title, pensum, date, startHour, endHour, speaker, modality, platform, description } = workshop;
    const formDescription = `Taller: ${title}
Competencia Asociada: ${pensum}
${modality === "asincrona" ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(addDays(new Date(date), 3)).toLocaleDateString()}` : `Fecha: ${date}`}
${modality === "asincrona" ? `` : `Horario: de ${startHour} hasta las ${endHour}`}
Facilitador: ${speaker}
Modalidad: ${modality}
${modality === "presencial" ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
    return formDescription;

};

const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
}
const BASE_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'


const ScheduleWorkshops = async (workshop: Workshop) => {
    const { date, startHour, endHour } = workshop
    const [calendarEventId, addUrl, meetLink, meetId, meetingPassword] = await createEvent('workshop', workshop);
    const formDescription = createFormDescription(workshop)
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activityName: workshop.title,
            description: formDescription,
            addUrl: addUrl
        })
    })
    const data = await response.json()
    const [startDate, endDate] = getFormatedDate(date, startHour, endHour)

    const datesObj = {
        id: shortUUID.generate(),
        start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
        end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
    }
    const tempDataObj = {
        id: shortUUID.generate(),
        calendarID: calendarEventId,
        meetingPassword,
        meetingLink: meetLink,
        meetingId: meetId,
        formLink: data.formUrl,
    }
    delete workshop.date
    delete workshop.startHour
    delete workshop.endHour
    workshop.pensum = workshop.pensum.toUpperCase().replaceAll(" ", "_")
    workshop.modality = workshop.modality.toUpperCase().replaceAll(" ", "_")
    workshop.avaaYear = workshop.avaaYear.toString().replaceAll(',', ' y ')
    workshop.spots = parseInt(workshop.spots)
    await createWorkshop(workshop, datesObj, workshop.speaker, tempDataObj)
}


export async function GET(req: NextRequest, res: NextResponse)  {
    const workshops = await getScheduledWorkshops()
    return NextResponse.json(workshops)
}