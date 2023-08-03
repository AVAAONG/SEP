import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { createFormDescription } from "@/lib/form/form";
import { getSpeakerName } from "@/lib/database/speaker";
import { Modality, Pensum, Workshop, WorkshopTempData } from "@prisma/client";
import shortUUID from "short-uuid";
import { createEvent } from "@/lib/calendar/calendar";
import { Platform } from "@/types/General";
import { getFormatedDate } from "@/lib/calendar/utils";
import { createWorkshop } from "@/lib/database/Workshops";
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';


const FORM_CREATION_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'

export async function POST(req: NextRequest, res: NextResponse) {
    const workshop = await req.json();

    //creamos el calendario
    //creamos el formulario
    //guardamos en la base de datos
    console.log(workshop)
    return NextResponse.json({ messagge: "ok" })
}


const scheduleWoekshop = async (workshop) => {
    const { speaker, title, modality, spots } = workshop;
    const formDescription = createFormDescription(workshop)
    const workshopId = shortUUID.generate() // cambiar por nano id

    const [
        calendarEventId,
        addToCalendarUrl,
        meetingLink,
        meetingId,
        meetingPassword
    ] = await createEvent('workshop', workshop)

    const formUrl = await createForm(
        title,
        modality,
        spots,
        workshopId,
        addToCalendarUrl,
        meetingLink,
        meetingId,
        meetingPassword,
        addToCalendarUrl,
        meetingLink,
        meetingId,
        formDescription

    )

    const tempDataObj: WorkshopTempData = {
        id: shortUUID.generate(),
        meetingPassword,
        meetingLink,
        meetingId,
        formLink: formUrl
    }
    const normalizedWorkshop = normalizeWorkshopData(workshop, workshopId, tempDataObj, calendarEventId)
    const workshopCreated = await createWorkshop(normalizedWorkshop, speakerId)
    return workshopCreated
}

const splitSpeakerValues = (value: string) => {
    const speakerValues = value.split('+/+');
    const speakerId = speakerValues[0];
    const speakerName = speakerValues[1];
    const speakerEmail = speakerValues[2];
    return { speakerId, speakerName, speakerEmail };
}