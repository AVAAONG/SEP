import { setTokens } from "@/lib/auth/auth"
import { createEvent } from "@/lib/calendar/calendar"
import { getFormatedDate } from "@/lib/calendar/utils"
import { createWorkshop, getScheduledWorkshops, getWorkshops, getWorkshopsCount } from "@/lib/database/Workshops"
import { getSpeakerName, getSpeakerNames } from "@/lib/database/speaker"
import { createFormDescription } from "@/lib/form/form"
import { Workshop } from "@/types/Workshop"
import { activityStatus, Prisma, WorkshopTempData } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import shortUUID from "short-uuid"

export async function GET(req: NextRequest, res: NextResponse) {
    const workshops = await getWorkshops()
    return NextResponse.json(workshops)
}

interface WorkshopPrismaObj extends Workshop {
    calendarID: string,
    activityStatus: activityStatus,
    dates: Prisma.JsonArray
}

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    const BASE_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'
    const token = await getToken({ req });
    setTokens(token?.accessToken as string, token?.refreshToken as string)

    const { title, date, startHour, endHour, modality, spots, id, speaker } = data;

    const speakerId = speaker
    const speakerName = await getSpeakerName(speakerId)
    data.speaker = speakerName?.name || ''

    const [calendarEventId, addToCalendarUrl, meetingLink, meetingId, meetingPassword] = await createEvent('workshop', data)

    const formDescription = createFormDescription(data)

    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            kindOfActivity: 'workshop',
            modality,
            activityName: title,
            activityId: id,
            meetingId,
            meetingPassword,
            meetingLink,
            addToCalendarUrl,
            limit: spots,
            formDescription
        })
    })
    const [startDate, endDate] = getFormatedDate(date, startHour, endHour)

    const datesObj = {
        start_date: new Date(startDate),
        end_date: new Date(endDate),
    }
    const { formUrl } = await response.json()

    delete data['startHour']
    delete data['endHour']
    delete data['date']
    data.modality = data.modality.toUpperCase()
    data.spots = parseInt(data.spots)
    data.pensum = data.pensum.toUpperCase().replace(' ', '_')

    const tempDataObj: WorkshopTempData = {
        id: shortUUID.generate(),
        meetingPassword,
        meetingLink,
        meetingId,
        formLink: formUrl
    }
    data.calendarID = calendarEventId!;
    data.activityStatus = 'AGENDADO';
    data.year = data.workshopYear[0]
    console.log(data)
    console.log(speakerId)

    createWorkshop(data, datesObj, speakerId, tempDataObj)

    return NextResponse.json({ message: "ok" })
}