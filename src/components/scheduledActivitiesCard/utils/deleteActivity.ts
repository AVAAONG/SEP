import { deleteCalendarEvent } from "@/lib/calendar/calendar";
import { ChatWithSpeaker, WorkshopWithSpeaker } from "@/lib/db/types";
import { deleteWorkshopFromDatabase } from "@/lib/db/utils/Workshops";
import { deleteChatFromDatabase } from "@/lib/db/utils/chats";
import { deleteVolunteerFromDatabase } from "@/lib/db/utils/volunteer";
import { getCalendarId } from "@/lib/utils2";

import { deleteZoomMeeting } from "@/lib/zoom";
import { Volunteer } from "@prisma/client";

const deleteActivity = async (activities: ChatWithSpeaker[] | WorkshopWithSpeaker[] | Volunteer[], activityId: string) => {
    const foundActivity = activities.find((activity) => activity.id === activityId);
    if (foundActivity) {
        if ('level' in foundActivity) await deleteChatFromDatabase(activityId);
        else if ('kind_of_volunteer' in foundActivity) deleteVolunteerFromDatabase(activityId);
        else if ('year' in foundActivity) await deleteWorkshopFromDatabase(activityId);
        foundActivity.calendar_ids.map(async (eventId: string, index: number) => {
            if (eventId === '') return;
            const calendarId = getCalendarId(foundActivity)
            await deleteCalendarEvent(calendarId, eventId);
            if (
                foundActivity.modality === 'ONLINE' &&
                foundActivity.platform === 'ZOOM' &&
                'meeting_id' in foundActivity
            ) {
                await deleteZoomMeeting(foundActivity.meeting_id[index]!);
            }
        });
    }
};

export default deleteActivity;