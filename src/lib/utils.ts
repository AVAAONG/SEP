import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { BigCalendarEventType } from '@/types/Calendar';
import { ActivityStatus, Chat, KindOfSpeaker, Workshop } from '@prisma/client';
import { headers } from 'next/headers';
import { ACTIVITIES_CALENDAR_COLORS } from './constants';
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parsePlatformFromDatabase, parseSkillFromDatabase } from './utils2';

export const createArrayFromObject = (object: Record<string, number>) => {
  const array = Object.entries(object)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value);
  return array;
};

const getBgColor = (colors: any, activity_status: string) => {
  let bgColor;
  if (activity_status === 'SCHEDULED' || activity_status === 'SENT') {
    bgColor = colors?.comingActivities;
  } else if (
    activity_status === 'ATTENDANCE_CHECKED' ||
    activity_status === 'DONE' ||
    activity_status === 'IN_PROGRESS' ||
    activity_status === 'SUSPENDED'
  ) {
    bgColor = colors?.pastActivities;
  }
  return bgColor;
};

const getActivityUrl = (id: string, route: 'actividadesFormativas' | 'chats', kindOfUser: 'scholar' | 'admin',) => {

  const host = headers().get('host');
  const pageUrl = `https://${host}/${kindOfUser === 'admin' ? 'admin' : 'becario'}/${route}/${id}`;
  return pageUrl;
};

export const formatActivityEventsForBigCalendar = (
  activities: (Workshop | Chat)[],
  kindOfUser: 'scholar' | 'admin',
): BigCalendarEventType[] => {
  return activities?.flatMap((activity) => {
    const { id, title, start_dates, end_dates, description, modality, activity_status } = activity;
    let colors;
    let eventUrl: string;
    if ('year' in activity) {
      colors = ACTIVITIES_CALENDAR_COLORS.find((activity) => activity.activity === 'workshop');
      eventUrl = getActivityUrl(id, 'actividadesFormativas', kindOfUser);
    } else if ('level' in activity) {
      colors = ACTIVITIES_CALENDAR_COLORS.find((activity) => activity.activity === 'chat');
      eventUrl = getActivityUrl(id, 'chats', kindOfUser);
    }

    const bgColor = getBgColor(colors, activity_status);

    const eventModalityTitle = modality === 'ONLINE' ? 'Virtual' : 'Presencial';

    return start_dates.map((startDate, index) => ({
      id: id,

      title:
        index > 0
          ? `(${eventModalityTitle}) ${title} (${index + 1})`
          : `(${eventModalityTitle}) ${title}`,
      allDay: false,
      start: new Date(startDate),
      end: new Date(end_dates[index] || end_dates[0]),
      description: description as string,
      bgColor,
      isSuspended: activity_status === 'SUSPENDED',
      url: eventUrl,
    }));
  });
};

interface CardProps {
  icon: () => JSX.Element;
  text: string;
  number: number;
  bg: string;
  cardButtonBg: string;
  activity: 'talleres' | 'chats' | 'voluntariado';
}

export const reduceByProperty = <T extends Record<string, any>, D extends Record<string, any>>(
  valuesToReduce: T[],
  property1: keyof T,
  property2: keyof D
) => {
  const reducedValues = valuesToReduce.reduce(
    (acc, value) => {
      const filter = value[property1]?.[property2] ?? 'Unknown';
      acc[filter] = (acc[filter] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  return reducedValues;
};


export interface ActivitiesForEnrollement {
  id: string;
  title: string;
  modality: string
  platform: string;
  description: string | null;
  kindOfActivity: 'workshop' | 'chat';
  eventId: string;
  isFull: boolean;
  avalibleSpots: number;
  enrolledScholars: number;
  allDay: boolean;
  start: Date;
  end: Date;
  bgColor: string;
  activityStatus: ActivityStatus;
  speakerNames: string[]
  speakerImages: (string | undefined)[];
  speakerIds: string[]
  speakerCompany: (string | null)[];
  speakerKind: (KindOfSpeaker | null)[];
  activityLink: string;
  level: string | null;
  year: string | null;
  skill: string | null;
}


export const formatActivitiesForEnrollement = (
  activities: (WorkshopWithAllData | ChatsWithAllData)[]
): ActivitiesForEnrollement[] => {
  return activities.flatMap((activity) => {
    const { id, title, start_dates, end_dates, description, modality, activity_status, platform, avalible_spots, calendar_ids } = activity;
    const kindOfActivity: 'chat' | 'workshop' = 'level' in activity ? 'chat' : 'workshop';
    const colors = ACTIVITIES_CALENDAR_COLORS.find((activity) => activity.activity === kindOfActivity);
    const eventUrl = getActivityUrl(id, kindOfActivity === 'workshop' ? 'actividadesFormativas' : 'chats', 'scholar');
    const bgColor = getBgColor(colors, activity_status);
    const enrolledCount = (activity.scholar_attendance as { attendance: string }[]).filter((a) => a.attendance === 'ENROLLED').length;
    const isFull = enrolledCount >= activity.avalible_spots;
    const speakerNames: string[] = [];
    const speakerImages: (string | undefined)[] = [];
    const speakerIds: string[] = [];
    const speakerCompany: (string | null)[] = [];
    const speakerKind: (KindOfSpeaker | null)[] = [];

    activity.speaker.forEach((speaker) => {
      speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
      speakerImages.push(speaker.image || undefined);
      speakerIds.push(speaker.id);
      speakerCompany.push(speaker.job_company);
      speakerKind.push(speaker.speaker_kind);
    });

    return {
      id,
      title,
      modality: parseModalityFromDatabase(modality),
      platform: parsePlatformFromDatabase(platform),
      description,
      kindOfActivity,
      eventId: calendar_ids[0],
      isFull,
      avalibleSpots: avalible_spots - enrolledCount,
      enrolledScholars: enrolledCount,
      allDay: false,
      start: new Date(start_dates[0]),
      end: new Date(end_dates[0]),
      bgColor,
      activityStatus: activity_status,
      speakerNames,
      speakerImages,
      speakerIds,
      speakerCompany,
      speakerKind,
      activityLink: eventUrl,
      level: 'level' in activity ? parseChatLevelFromDatabase(activity.level) : null,
      year: 'year' in activity ? activity.year.length > 4 ? 'Todos' : activity.year.join(', ') : null,
      skill: 'year' in activity ? parseSkillFromDatabase(activity.asociated_skill) : null,
    }
  });
};
