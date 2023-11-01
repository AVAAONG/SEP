import { getWorkshopSpeakersWithParams } from "@/lib/db/utils/speaker";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    const workshopSpeakers = await getWorkshopSpeakersWithParams({
        id: true,
        first_names: true,
        last_names: true,
        email: true
    })
    return NextResponse.json({ speakers: workshopSpeakers });
}