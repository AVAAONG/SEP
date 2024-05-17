import { ActivityKind, ActivityPath, getActivityStatusBasedOnItsType, getActivityUrl } from '@/lib/activities/utils';
import { ACTIVITIES_CALENDAR_COLORS } from '@/lib/constants';
import { VolunteerWithAllData } from '@/lib/db/types';
import { parseModalityFromDatabase } from '@/lib/utils2';
import { BigCalendarEventType } from '@/types/Calendar';
import { Chat, Volunteer, Workshop } from '@prisma/client';
import { ChatsWithAllData } from '../table/columns/chatsColumns';
import { WorkshopWithAllData } from '../table/columns/workshopColumns';
const getBgColor = (colors: any, activity_status: string) => {
    let bgColor;
    if (activity_status === 'SCHEDULED' || activity_status === 'SENT') {
        bgColor = colors?.comingActivities;
    } else if (
        activity_status === 'ATTENDANCE_CHECKED' ||
        activity_status === 'DONE' ||
        activity_status === 'IN_PROGRESS' ||
        activity_status === 'SUSPENDED' ||
        activity_status === 'REJECTED'
    ) {
        bgColor = colors?.pastActivities;
    }
    return bgColor;
};
export const formatActivityForBigCalendar = (
    activity: WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData,
    kindOfUser: 'admin' | 'becario',
    kindOfActivity: ActivityKind,
    activityPath: ActivityPath
): BigCalendarEventType[] => {
    const { id, title, start_dates, end_dates, description, modality } = activity;

    const activityStatus = getActivityStatusBasedOnItsType(activity);
    const eventUrl = getActivityUrl(id, activityPath, kindOfUser);
    const colors = ACTIVITIES_CALENDAR_COLORS.find((activity) => activity.activity === kindOfActivity);
    const bgColor = getBgColor(colors, activityStatus);
    const eventModalityTitle = parseModalityFromDatabase(modality);

    return start_dates.map((startDate, index) => {
        const endDate = end_dates[index];

        return {
            id: id,
            title: `(${eventModalityTitle}) ${title}`,
            allDay: false,
            start: new Date(startDate),
            end: new Date(endDate),
            description: description as string,
            bgColor,
            isSuspended: kindOfActivity === 'volunteer'
                ? (activity as Volunteer).status === 'REJECTED'
                : kindOfActivity === 'workshop'
                    ? (activity as Workshop).activity_status === 'SUSPENDED'
                    : (activity as Chat).activity_status === 'SUSPENDED',
            url: eventUrl,
        };
    });
}