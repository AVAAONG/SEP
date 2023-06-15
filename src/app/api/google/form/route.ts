import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { getAllFilesInFolder } from "@/lib/drive/drive";




export async function GET(req: NextRequest, res: NextResponse) {
    // const reqData = await req.json()
    // const token = await getToken({ req });

    // reqData.workshops.forEach(async (workshop: Workshop) => {
    //     setTokens(token.accessToken, token.refreshToken)
    //     const { name, speaker, pensum, date, startHour, endHour, platform, description, avaaYear, modality } = workshop
    //     const [calendarEventId, addUrl, meetLink, meetId, meetingPassword] = await createEvent('workshop', workshop)
    //     const formDescription = createFormDescription(workshop)
    //     const respon = await fetch(BASE_URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             activityName: name,
    //             description: formDescription,
    //             addUrl: addUrl
    //         })
    //     })
    //     const speakerId = ''
    //     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
    //     const datesObj = {
    //         id: shortUUID.generate(),
    //         start_date: new Date(startDate.replace(/\Z/g, "-04:00")),
    //         end_date: new Date(endDate.replace(/\Z/g, "-04:00")),
    //     }
    //     const tempDataObj = {
    //         id: shortUUID.generate(),
    //         workshop,
    //         workshopId: workshop.id,
    //         calendaID: calendarEventId,
    //         meetingPassword,
    //         meetingLink: meetLink,
    //         meetingId: meetId,
    //     }
    //     createWorkshop(workshop, datesObj, speakerId, tempDataObj)
    //     const data = await respon.json()
    // })
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)

    const data = await getAllFilesInFolder("1Yb3aLVhfZwCK1DChGw15QwT0wMzbEPVx")
    return NextResponse.json(data)
}
