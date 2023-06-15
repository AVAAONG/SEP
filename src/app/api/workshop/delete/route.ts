import { setTokens } from "@/lib/auth/auth";
import { deleteWorkshopFromDatabase, getScheduledWorkshops } from "@/lib/database/Workshops";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req });
    const reqData = await req.json()
    console.log("deleting " + reqData)
    if (token) setTokens(token.accessToken as string, token.refreshToken as string);
    else return NextResponse
    await deleteWorkshopFromDatabase(reqData.id)
    return NextResponse.json({ message: "ok" })

}

export const GET = async (req: NextRequest, res: NextResponse) => {
    const workshops = await getScheduledWorkshops()
    return NextResponse.json(workshops)
}

