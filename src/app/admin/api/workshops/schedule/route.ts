import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { createFormDescription } from "@/lib/form/form";
import { getSpeakerName } from "@/lib/database/speaker";
import { Modality, Pensum, Skill, Workshop, WorkshopTempData, WorkshopYear } from "@prisma/client";
import shortUUID from "short-uuid";
import { createEvent } from "@/lib/calendar/calendar";
import { Platform } from "@/types/General";
import { getFormatedDate } from "@/lib/calendar/utils";
import { createWorkshop } from "@/lib/database/Workshops";
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
import { nanoid } from 'nanoid'

const FORM_CREATION_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec'

export async function POST(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)
    const workshop = await req.json();
    const { speaker, title, modality, spots } = workshop;
    //creamos el calendario
    const [
        calendarEventId,
        addToCalendarUrl,
        meetingLink,
        meetingId,
        meetingPassword
    ] = await createEvent('workshop', workshop);
    //creamos el formulario
    const formDescription = createFormDescription(workshop)
    console.log(formDescription)
    const workshopId = nanoid()

    const formUrl = await createForm(
        title,
        modality,
        spots,
        workshopId,
        addToCalendarUrl!,
        meetingLink!,
        meetingId!,
        meetingPassword!,
        formDescription
    )
    const { speakerId } = splitSpeakerValues(speaker)

    const tempDataObj: WorkshopTempData = {
        id: nanoid(),
        meeting_password: meetingPassword,
        meeting_link: meetingLink,
        meeting_id: meetingId,
        form_link: formUrl
    }
    const normalizedWorkshop = normalizeWorkshopData(workshop, workshopId, calendarEventId!)
    const workshopCreated = await createWorkshop(normalizedWorkshop, speakerId, tempDataObj)
    //guardamos en la base de datos
    return NextResponse.json({ messagge: "ok" })
}


const splitSpeakerValues = (value: string) => {
    const speakerValues = value.split('+/+');
    const speakerId = speakerValues[0];
    const speakerName = speakerValues[1];
    const speakerEmail = speakerValues[2];
    return { speakerId, speakerName, speakerEmail };
}

const createForm = async (title: string, modality: string, spots: string, id: string, addToCalendarUrl: string, meetingLink: string, meetingId: string, meetingPassword: string, formDescription: string) => {
    const response = await fetch(FORM_CREATION_APPSCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            kindOfActivity: 'workshop',
            modality,
            activityName: title,
            activityId: id,
            meetingId,
            meetingPassword,
            meetingLink,
            addToCalendarUrl,
            limit: spots,
            formDescription
        })
    })
    const { formUrl } = await response.json()

    return formUrl
}

const normalizeWorkshopData = (workshop: FormTypeWorkshop, id: string, calendarEventId: string): Workshop => {
    const { title, pensum, startHour, endHour, date, spots, modality, description, platform, workshopYear } = workshop;
    const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
    const normalizeWorkshopObject: Workshop = {
        id,
        title: title,
        avalible_spots: parseInt(spots),
        platform: platform.trim().toUpperCase().replace(' ', '_') as Platform,
        description,
        year: workshopYear as WorkshopYear[],
        modality: modality.toUpperCase() as Modality,
        skill: pensum as Skill,
        start_dates: [new Date(startDate)],
        end_dates: [new Date(endDate)],
        activity_status: "SCHEDULED",
        calendar_id: calendarEventId,
    }
    return normalizeWorkshopObject;
}