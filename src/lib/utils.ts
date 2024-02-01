import { BigCalendarEventType } from '@/types/Calendar';
import { Chat, Workshop } from '@prisma/client';
import { headers } from 'next/headers';
import { ACTIVITIES_CALENDAR_COLORS } from './constants';



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
  if (activity_status === 'SCHEDULED' || activity_status === "SENT") {
    bgColor = colors?.comingActivities;
  } else if (activity_status === 'ATTENDANCE_CHECKED' || activity_status === "DONE" || activity_status === "IN_PROGRESS" || activity_status === "SUSPENDED") {
    bgColor = colors?.pastActivities;
  }
  return bgColor;
}

const getActivityUrl = (id: string, route: 'actividadesFormativas' | 'chats') => {
  const host = headers().get('host');
  const pageUrl = `https://${host}/admin/${route}/${id}`;
  return pageUrl;
}


export const formatActivityEventsForBigCalendar = (activities: (Workshop | Chat)[]): BigCalendarEventType[] => {
  return activities.flatMap((activity) => {
    const { id, title, start_dates, end_dates, description, modality, activity_status } = activity;
    let colors;
    let eventUrl: string;
    if ('year' in activity) {
      colors = ACTIVITIES_CALENDAR_COLORS.find(activity => activity.activity === 'workshop');
      eventUrl = getActivityUrl(id, 'actividadesFormativas');
    } else if ('level' in activity) {
      colors = ACTIVITIES_CALENDAR_COLORS.find(activity => activity.activity === 'chat');
      eventUrl = getActivityUrl(id, 'chats');
    }

    const bgColor = getBgColor(colors, activity_status);

    const eventModalityTitle = modality === 'ONLINE' ? 'Virtual' : 'Presencial';

    return start_dates.map((startDate, index) => ({
      id: id,

      title: index > 0 ? `(${eventModalityTitle}) ${title} (${index + 1})` : `(${eventModalityTitle}) ${title}`,
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

