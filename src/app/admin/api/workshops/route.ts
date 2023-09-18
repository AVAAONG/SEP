import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
import { NextResponse } from 'next/server';

const FORM_CREATION_APPSCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec';

export async function POST(req: Request, res: Response) {
  return NextResponse.json({ messagge: 'ok' });
}

export async function GET(req: Response, res: Response) {
  const workshops = await getScheduledWorkshops();
  return NextResponse.json(workshops);
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

// export async function PATCH(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function DELETE(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }
// export async function PUT(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function GET(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)

//     return NextResponse.json({ messagge: "ok" })
// }
