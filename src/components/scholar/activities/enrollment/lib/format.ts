import { formatActivityForBigCalendar } from '@/components/calendar/utils';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { determineActivityKindByTipe, getActivitySpanishPathByType } from '@/lib/activities/utils';
import { VolunteerWithAllData } from '@/lib/db/types';
import { BigCalendarEventType } from '@/types/Calendar';
import moment from 'moment';
import { ChatEnrollePage, VolunteerEnrollePage, WorkshopEnrollePage, formatChatActivityForEnrollPage, formatVolunteerActivityForEnrollPage, formatWorkshopActivityForEnrollPage } from './formatActivities';


const formatActivitiesForScholarEnrollementPage = (
  activities: (WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData)[]
) => {
  const results = activities.reduce((acc: { activitiesForCalendar: BigCalendarEventType[], workshopFormatedActivities: WorkshopEnrollePage[], chatFormatedActivities: ChatEnrollePage[], volunteerFormatedActivities: VolunteerEnrollePage[] }, activity) => {
    const { start_dates } = activity;
    //if the activity has not yet started
    if (!moment(start_dates[0]).isBefore(moment())) {
      const kindOfActivity = determineActivityKindByTipe(activity);
      const activityPath = getActivitySpanishPathByType(activity);
      const formattedActivity = formatActivityForBigCalendar(activity, 'becario', kindOfActivity, activityPath);

      let workshopFormatedActivities,
        chatFormatedActivities,
        volunteerFormatedActivities;

      if (kindOfActivity === 'workshop') workshopFormatedActivities = formatWorkshopActivityForEnrollPage(activity as WorkshopWithAllData);
      if (kindOfActivity === 'chat') chatFormatedActivities = formatChatActivityForEnrollPage(activity as ChatsWithAllData);
      if (kindOfActivity === 'volunteer') volunteerFormatedActivities = formatVolunteerActivityForEnrollPage(activity as VolunteerWithAllData);

      return {
        activitiesForCalendar: acc.activitiesForCalendar?.concat(formattedActivity),
        workshopFormatedActivities: workshopFormatedActivities ? acc.workshopFormatedActivities.concat(workshopFormatedActivities) : acc.workshopFormatedActivities,
        chatFormatedActivities: chatFormatedActivities ? acc.chatFormatedActivities.concat(chatFormatedActivities) : acc.chatFormatedActivities,
        volunteerFormatedActivities: volunteerFormatedActivities ? acc.volunteerFormatedActivities.concat(volunteerFormatedActivities) : acc.volunteerFormatedActivities
      };
    }
    return acc;
  }, { activitiesForCalendar: [], workshopFormatedActivities: [], chatFormatedActivities: [], volunteerFormatedActivities: [] });

  return results;
}

export default formatActivitiesForScholarEnrollementPage;
