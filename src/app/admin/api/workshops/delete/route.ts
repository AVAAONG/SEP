import { setTokens } from "@/lib/auth/auth";
import { deleteCalendarEvent } from "@/lib/calendar/calendar";
import { deleteWorkshopFromDatabase, getScheduledWorkshops } from "@/lib/database/Workshops";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CALENDAR_IDS } from "@/lib/constants";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req });
    const reqData = await req.json()
    console.log("deleting " + reqData.calendarId)
    if (token) setTokens(token.accessToken as string, token.refreshToken as string);
    else return NextResponse
    await deleteWorkshopFromDatabase(reqData.id)
    // deleteCalendarEvent(CALENDAR_IDS[2].calendarId, reqData.calendarId)
    return NextResponse.json({ message: "ok" })
}