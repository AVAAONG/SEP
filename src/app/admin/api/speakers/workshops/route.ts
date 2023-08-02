import { setTokens } from "@/lib/auth/auth";
import { createWorkshopSpeaker, deleteWorkshopSpeakers } from "@/lib/database/Workshops";
import { getSpreadsheetValues } from "@/lib/sheets/sheets";
import { WorkshopSpeaker } from "@prisma/client";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const WORKSHOP_SPEAKERS_SPREADSHEET = "1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc"
const WORKSHOP_SPEAKER_SHEET = "Facilitadores de talleres"
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B3:I81`

import { getWorkshopSpeakersWithParams } from "@/lib/database/speaker";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
    const toSelect: Prisma.WorkshopSpeakerSelect = {
        id: true,
        first_names: true,
        last_names: true,
        email: true,
    }
    const data = await getWorkshopSpeakersWithParams(toSelect);
    return NextResponse.json(data)
}



const createWorkshopSpeakerFromSheet = async () => {
    await deleteWorkshopSpeakers()
    const values = await getSpreadsheetValues(WORKSHOP_SPEAKERS_SPREADSHEET, WORKSHOP_SPEAKERS_RANGE) as string[][]

    const workshopSpeakers = values.map(async (value) => {
        const [first_names, last_names, , id, email, phone_number, job_company, speakerGender] = value;
        const gender = speakerGender.toLowerCase() === "masculino" ? "M" : "F";
        const workshopSpeaker: WorkshopSpeaker = {
            id,
            first_names,
            last_names,
            email,
            phone_number,
            job_company,
            gender
        }
        await createWorkshopSpeaker(workshopSpeaker)
        return workshopSpeaker;
    })

    return workshopSpeakers;
}
