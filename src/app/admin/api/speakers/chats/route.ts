import { getChatSpeakerWithParams } from "@/lib/db/utils/chats";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    const workshopSpeakers = await getChatSpeakerWithParams({
        id: true,
        first_names: true,
        last_names: true,
        email: true
    })
    return NextResponse.json({ speakers: workshopSpeakers });
}