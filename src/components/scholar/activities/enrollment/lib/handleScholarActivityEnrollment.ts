'use server'
import { ActivityKind } from "@/lib/activities/utils";
import { CHAT_CALENDAR_ID, VOLUNTEERS_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from "@/lib/constants";
import { enroleScholarInChat, enroleScholarInWorkshop } from "@/lib/db/utils/Workshops";
import { addScholarToVolunteer } from "@/lib/db/utils/volunteer";
import { createEnrollementConfirmationMessage } from "@/lib/htmlConfirmationTemplate";
import { sendGenericEmail } from "@/lib/sendEmails";
import { revalidatePath } from "next/cache";

const setCalendarId = (kindOfActivity: ActivityKind) => {
    if (kindOfActivity === 'workshop') return WORKSHOP_CALENDAR_ID;
    else if (kindOfActivity === 'chat') return CHAT_CALENDAR_ID;
    else if (kindOfActivity === 'volunteer') return VOLUNTEERS_CALENDAR_ID;
}

export const handleEnrollment = async (
    activityId: string,
    scholarId: string,
    eventId: string,
    kindOfActivity: ActivityKind,
    email: string,
    scholarName: string,
    activityTitle: string
) => {
    let spanishPath = ''
    let enrolled: boolean = false;
    if (kindOfActivity === 'workshop') {
        enrolled = await enroleScholarInWorkshop(activityId, scholarId);
        spanishPath = 'actividadesFormativas';
    }
    else if (kindOfActivity === 'chat') {
        enrolled = await enroleScholarInChat(activityId, scholarId);
        spanishPath = 'chats';
    }
    else if (kindOfActivity === 'volunteer') {
        enrolled = await addScholarToVolunteer(activityId, scholarId);
        spanishPath = 'voluntariado';
    }

    revalidatePath('/becario/oferta');
    if (enrolled) {
        const result = await fetch(
            'https://script.google.com/macros/s/AKfycbzSiMKnlwygmcPdvdGvmeLlvXc_bcdm4tcWcpZ2H7QBbz-g3dBqxgFfzd_G44YaEeKkZA/exec',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newAttende: email,
                    eventId,
                    calendarId: setCalendarId(kindOfActivity)
                }),
            }
        );
        if (result.status !== 200) throw new Error('Error al inscribirte en la actividad');
        await sendGenericEmail(
            createEnrollementConfirmationMessage(
                scholarName,
                `https://www.programaexcelencia.org/becario/${spanishPath}/${activityId}`,
                activityTitle
            ),
            email,
            'Confirmación de inscripción'
        )
    }

};
