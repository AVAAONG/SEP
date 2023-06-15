import { getSpeakerNames } from "@/lib/database/speaker";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const data = await getSpeakerNames();
    return NextResponse.json({
        data
    }, { status: 200 })
}
