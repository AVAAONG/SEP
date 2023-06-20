import { setTokens } from "@/lib/auth/auth"
import { createEvent } from "@/lib/calendar/calendar"
import { getFormatedDate } from "@/lib/calendar/utils"
import { createWorkshop, getScheduledWorkshops, getWorkshops, getWorkshopsCount } from "@/lib/database/Workshops"
import { createFormDescription } from "@/lib/form/form"
import { Workshop } from "@/types/Workshop"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import shortUUID from "short-uuid"

export async function GET(req: NextRequest, res: NextResponse) {
    const workshops = await getWorkshops()
    return NextResponse.json(workshops)
}

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    const BASE_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'
    const token = await getToken({ req });
    const { workshops, group, subject } = data;

    setTokens(token.accessToken, token.refreshToken)

    workshops.forEach(async (workshop: Workshop) => {

        const { title, date, startHour, endHour, modality, spots, id } = workshop;

        const [calendarEventId, addToCalendarUrl, meetingLink, meetingId, meetingPassword] = await createEvent('workshop', workshop)

        const formDescription = createFormDescription(workshop)

        const respon = await fetch(BASE_URL, {
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
            meetingLink,
            meetingId
        }

        createWorkshop(workshop, datesObj, speakerId, tempDataObj)

        const data = await respon.json()
    })
    return NextResponse.json({ messagge: "ok", })
}