import { getScheduledWorkshops, getWorkshops, getWorkshopsCount } from "@/lib/database/Workshops"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse)  {
    const workshops = await getScheduledWorkshops()
    return NextResponse.json(workshops)
}