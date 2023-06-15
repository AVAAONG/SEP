import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { getAllFilesInFolder } from "@/lib/drive/drive";
import { getSheetsName, getSpreadsheetValues } from "@/lib/sheets/sheets";
import { addWorkshopToScholar } from "@/lib/database/users";
import shortUUID, { uuid } from "short-uuid";


export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)

    const chatsValues = await getSpreadsheetValues("1aC0XcBxnODfMMVlnNf7fw1loWgxok2dZLfU898DtlqU", "Sheet1!A2:H93") as string[][]



    // // const data = await getAllFilesInFolder("1Yb3aLVhfZwCK1DChGw15QwT0wMzbEPVx")
    // const sheetNames = await getSheetsName("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY")

    // let value;
    // sheetNames?.forEach(async (sheetName) => {
    //     const range = `${sheetName}!A8:G`;
    //     const rageID = `${sheetName}!H7`;
    //     const values = await getSpreadsheetValues("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY", range) as string[][]
    //     const workshopId = await getSpreadsheetValues("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY", rageID) as string[][]
    //     values.forEach(async (re) => {
    //         const attendance = re[6] === "Si" ? "ATTENDED" : "NOT_ATTENDED"
    //         if (re[3].length) await addWorkshopToScholar(re[3].trim().replaceAll('.', '').toLocaleLowerCase().replaceAll("V-", "") as shortUUID.SUUID, workshopId[0][0] as shortUUID.SUUID, attendance)
    //     })
    // })
    return NextResponse.json({ messagge: "ok" })
}


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