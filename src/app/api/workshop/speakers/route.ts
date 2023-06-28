import { getWorkshopSpeakersWithParams } from "@/lib/database/speaker";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    // const { toSelect } = await req.json();
    const toSelect: Prisma.WorkshopSpeakerSelect = {
        id: true,
        name: true,
    }
    const data = await getWorkshopSpeakersWithParams(toSelect);

    return NextResponse.json(data)
}
