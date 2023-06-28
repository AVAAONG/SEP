import { setTokens } from "@/lib/auth/auth"
import { createEvent } from "@/lib/calendar/calendar"
import { getFormatedDate } from "@/lib/calendar/utils"
import { createWorkshop, getScheduledWorkshops, getWorkshops, getWorkshopsCount } from "@/lib/database/Workshops"
import { getSpeakerName, getSpeakerNames } from "@/lib/database/speaker"
import { createFormDescription } from "@/lib/form/form"
import { Workshop } from "@/types/Workshop"
import { ActivityStatus, Prisma } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import shortUUID from "short-uuid"

export async function GET(req: NextRequest, res: NextResponse) {
    const workshops = await getWorkshops()
    return NextResponse.json(workshops)
}

interface WorkshopPrismaObj extends Workshop{
    calendarID: string,
    activityStatus: ActivityStatus,
    dates: Prisma.JsonArray
}

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    const BASE_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'
    const token = await getToken({ req });
    setTokens(token?.accessToken as string, token?.refreshToken as string)

    data.forEach(async (workshop: WorkshopPrismaObj) => {

        const { title, date, startHour, endHour, modality, spots, id, speaker } = workshop;

        const speakerId = speaker
        const speakerName = await getSpeakerName(speakerId)
        workshop.speaker = speakerName?.name || ''

        const [calendarEventId, addToCalendarUrl, meetingLink, meetingId, meetingPassword] = await createEvent('workshop', workshop)

        const formDescription = createFormDescription(workshop)

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
                id: shortUUID.generate(),
                start_date: new Date(startDate),
                end_date: new Date(endDate),
            }

            const tempDataObj = {
                id: shortUUID.generate(),
                workshop,
                workshopId: workshop.id,
                calendaID: calendarEventId,
                meetingPassword,
                meetingLink,
                meetingId
            }
            workshop.calendarID = calendarEventId!;
            workshop.activityStatus = 'AGENDADO';

            createWorkshop(workshop, datesObj, speakerId, tempDataObj)

            const data = await response.json()
        })
        console.log(data)
        return NextResponse.json(data)
    }