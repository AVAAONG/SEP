import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { createFormDescription } from "@/lib/form/form";
import { getSpeakerName } from "@/lib/database/speaker";
import { WorkshopTempData } from "@prisma/client";
import shortUUID from "short-uuid";


const FORM_CREATION_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'



export async function POST(req: NextRequest, res: NextResponse) {
    const workshop = await req.json();
    // const { speaker } = workshop;
    console.log(workshop)
    // const c = createFormDescription(workshop)

    // const speakerId = speaker
    // const speakerName = await getSpeakerName(speakerId)


    // const [calendarEventId, addToCalendarUrl, meetingLink, meetingId, meetingPassword] = await createEvent('workshop', data)

    // const formUrl = await createForm()
    // const tempDataObj: WorkshopTempData = {
    //     id: shortUUID.generate(),
    //     meetingPassword,
    //     meetingLink,
    //     meetingId,
    //     formLink: formUrl
    // }
    // workshop.calendarID = calendarEventId!;

    // // const token = await getToken({ req });
    // // setTokens(token.accessToken, token.refreshToken)
    // createWorkshop()
    return NextResponse.json({ messagge: "ok" })
}


// const createForm = async (title, date, startHour, endHour, modality, spots, id, addToCalendarUrl, meetingLink, meetingId, meetingPassword, addToCalendarUrl, meetingLink, meetingId, formDescription) => {
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

//     return formUrlñ
// }










// const normalizeWorkshopData = (workshop: FormTypeWorkshop): Workshop => {

//     const { title, pensum, startHour, endHour, date, spots, modality, description, platform, workshopYear } = workshop;

//     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)

//     const normalizeWorkshopObject: Workshop = {
//         id: shortUUID.generate(),
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



const scheduleWorkshop = (workshop) => {

}