import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { createFormDescription } from "@/lib/form/form";
import { getSpeakerName } from "@/lib/database/speaker";
import { Modality, Pensum, Workshop, WorkshopTempData } from "@prisma/client";
import shortUUID from "short-uuid";
import { createEvent } from "@/lib/calendar/calendar";
import { Platform } from "@/types/General";
import { getFormatedDate } from "@/lib/calendar/utils";
import { createWorkshop } from "@/lib/database/Workshops";
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';


const FORM_CREATION_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'

export async function POST(req: NextRequest, res: NextResponse) {
    const workshop = await req.json();
    console.log(workshop)
    return NextResponse.json({ messagge: "ok" })
}

// const temp = async (workshop) => {
//     const { speaker, title, modality, spots } = workshop;
//     const formDescription = createFormDescription(workshop)
//     const workshopId = shortUUID.generate()

//     const [
//         calendarEventId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword
//     ] = await createEvent('workshop', workshop)

//     const formUrl = await createForm(
//         title,
//         modality,
//         spots,
//         workshopId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         formDescription

//     )
//     const speakerId = speaker
    
//     const tempDataObj: WorkshopTempData = {
//         id: shortUUID.generate(),
//         meetingPassword,
//         meetingLink,
//         meetingId,
//         formLink: formUrl
//     }
//     const normalizedWorkshop = normalizeWorkshopData(workshop, workshopId, tempDataObj, calendarEventId)

//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     createWorkshop(normalizedWorkshop, speakerId, tempDataObj)
// }


// const createForm = async (title, modality, spots, id, addToCalendarUrl, meetingLink, meetingId, meetingPassword, addToCalendarUrl, meetingLink, meetingId, formDescription) => {
//     const response = await fetch(FORM_CREATION_APPSCRIPT_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             kindOfActivity: 'workshop',
//             modality,
//             activityName: title,
//             activityId: id,
//             meetingId,
//             meetingPassword,
//             meetingLink,
//             addToCalendarUrl,
//             limit: spots,
//             formDescription
//         })
//     })
//     const { formUrl } = await response.json()

//     return formUrl
// }


// const normalizeWorkshopData = (workshop: FormTypeWorkshop, id, tempDataObj, calendarEventId): Workshop => {
//     const { title, pensum, startHour, endHour, date, spots, modality, description, platform, workshopYear } = workshop;
//     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
//     const normalizeWorkshopObject: Workshop = {
//         id,
//         title: title,
//         spots: parseInt(spots),
//         platform: platform.trim().toUpperCase().replace(' ', '_') as Platform,
//         description,
//         workshopYear: workshopYear,
//         modality: modality.toUpperCase() as Modality,
//         pensum: pensum.toUpperCase() as Pensum,
//         dates: {
//             start_date: new Date(startDate),
//             end_date: new Date(endDate),
//         },
//         activityStatus: "AGENDADO",
//         tempData: tempDataObj,
//         calendarID: calendarEventId,


//     }
//     return normalizeWorkshopObject;
// }



export async function PATCH(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)
    return NextResponse.json({ messagge: "ok" })
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)
    return NextResponse.json({ messagge: "ok" })
}
export async function PUT(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)
    return NextResponse.json({ messagge: "ok" })
}


export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)

    return NextResponse.json({ messagge: "ok" })
}