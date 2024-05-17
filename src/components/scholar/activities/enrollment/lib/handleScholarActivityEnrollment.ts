import { CHAT_CALENDAR_ID, VOLUNTEERS_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from "@/lib/constants";
import { enroleScholarInChat, enroleScholarInWorkshop } from "@/lib/db/utils/Workshops";
import { addScholarToVolunteer } from "@/lib/db/utils/volunteer";
import { revalidatePath } from "next/cache";

const setCalendarId = (kindOfActivity: 'workshop' | 'chat' | 'volunteer') => {
    if (kindOfActivity === 'workshop') return WORKSHOP_CALENDAR_ID;
    else if (kindOfActivity === 'chat') return CHAT_CALENDAR_ID;
    else return VOLUNTEERS_CALENDAR_ID;
}

export const handleEnrollment = async (
    activityId: string,
    scholarId: string,
    eventId: string,
    kindOfActivity: 'workshop' | 'chat',
    email: string
) => {
    if (kindOfActivity === 'workshop') await enroleScholarInWorkshop(activityId, scholarId);
    else if (kindOfActivity === 'chat') await enroleScholarInChat(activityId, scholarId);
    else if (kindOfActivity === 'volunteer') await addScholarToVolunteer(activityId, scholarId)

    revalidatePath('/becario/oferta');
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
};
