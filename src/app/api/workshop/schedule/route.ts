import {
  deleteWorkshopFromDatabase,
  getScheduledWorkshops
} from '@/lib/database/Workshops';
import { setTokens } from '@/lib/googleAPI/auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest, res: NextResponse) {
//     const token = await getToken({ req });
//     const reqData = await req.json()
//     if (token) setTokens(token.accessToken as string, token.refreshToken as string);
//     else return NextResponse
//     await ScheduleWorkshops(reqData);
//     return NextResponse.json({ message: "ok" })

// }

export const UPDATE = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req });
  if (token) setTokens(token.accessToken as string, token.refreshToken as string);
  else return NextResponse;
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req });
  const reqData = await req.json();
  if (token) setTokens(token.accessToken as string, token.refreshToken as string);
  else return NextResponse;
  await deleteWorkshopFromDatabase(reqData.id);
  return NextResponse.json({ message: 'ok' });
};

// const ScheduleWorkshops = async (workshop: Workshop) => {
//     const { date, startHour, endHour } = workshop
//     const [calendarEventId, addUrl, meetLink, meetId, meetingPassword] = await createEvent('workshop', workshop);
//     const formDescription = createFormDescription(workshop)
//     const response = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             activityName: workshop.title,
//             description: formDescription,
//             addUrl: addUrl
//         })
//     })
//     const data = await response.json()
//     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)

//     const datesObj = {
//         id: shortUUID.generate(),
//         start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
//         end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
//     }
//     const tempDataObj = {
//         id: shortUUID.generate(),
//         calendarID: calendarEventId,
//         meetingPassword,
//         meetingLink: meetLink,
//         meetingId: meetId,
//         formLink: data.formUrl,
//     }
//     delete workshop.date
//     delete workshop.startHour
//     delete workshop.endHour
//     workshop.pensum = workshop.pensum.toUpperCase().replaceAll(" ", "_")
//     workshop.modality = workshop.modality.toUpperCase().replaceAll(" ", "_")
//     workshop.avaaYear = workshop.avaaYear.toString().replaceAll(',', ' y ')
//     workshop.spots = parseInt(workshop.spots)
//     await createWorkshop(workshop, datesObj, workshop.speaker, tempDataObj)
// }

export async function GET(req: NextRequest, res: NextResponse) {
  const workshops = await getScheduledWorkshops();
  return NextResponse.json(workshops);
}
