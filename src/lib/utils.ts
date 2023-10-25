import authAdminOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import { CALENDAR_IDS } from '@/lib/constants';
import { setTokens } from '@/lib/googleAPI/auth';
import { getCalendarEvents } from '@/lib/googleAPI/calendar/calendar';
import { BigCalendarEventType } from '@/types/Calendar';
import { calendar_v3 } from '@googleapis/calendar';
import { Chat, Workshop } from '@prisma/client';
import { getServerSession } from 'next-auth';

/**
 * @description Formats the event object to the format required by the BigCalendar component
 * @param calendarEvents Array of events from the Google Calendar API
 * @param bgColor Background color we want to assign to the events
 * @param textColor Text color we want to assign to the events
 * @returns Array of events formatted for the BigCalendar component
 */
export const formatEventObject = (
  calendarEvents: calendar_v3.Schema$Event[],
  bgColor: string,
  textColor: string
): BigCalendarEventType[] => {
  const formatedEvents: BigCalendarEventType[] = [];

  calendarEvents.forEach((event) => {
    const { summary, start, end, description, location } = event;
    const obj = {
      title: summary as string,
      allDay: false,
      start: new Date(start!.dateTime as string),
      end: new Date(end!.dateTime as string),
      description: description as string,
      bgColor,
      location: location as string,
      textColor,
    };
    formatedEvents.push(obj);
  });
  return formatedEvents;
};

export const formatEventObjectForBigCalendar = (
  calendarEvents: Workshop[] | Chat[],
  bgColor: string,
  textColor: string
): BigCalendarEventType[] => {
  const formatedEvents: BigCalendarEventType[] = [];

  calendarEvents.forEach((event) => {
    const { title, start_dates, end_dates, description, platform } = event;
    const obj = {
      title,
      allDay: false,
      start: new Date(start_dates[0]),
      end: new Date(end_dates[0]),
      description: description as string,
      bgColor,
      location: platform as string,
      textColor,
    };
    formatedEvents.push(obj);
  });
  return formatedEvents;
};

/*
 * Gets the events from Google Calendar for each calendar ID and formats them to match the React Big Calendar event type.
 * @returns A promise that resolves to an array of arrays of BigCalendarEventType objects.
 * @todo Add error handling
 * @todo allow to return a single array of events.
 */
export const getAndFormatCalendarEvents = async (): Promise<BigCalendarEventType[][]> => {
  const session = await getServerSession(authAdminOptions);

  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;

  setTokens(accessToken as string, refreshToken as string);

  const formatedEvents = CALENDAR_IDS.map(async (calendar) => {
    const { calendarId, eventColor, textColor } = calendar;
    const events = await getCalendarEvents(calendarId);
    const formatedEvents = formatEventObject(events!, eventColor, textColor);

    return formatedEvents;
  });

  return Promise.all(formatedEvents);
};

interface CardProps {
  icon: () => JSX.Element;
  text: string;
  number: number;
  bg: string;
  cardButtonBg: string;
  activity: 'talleres' | 'chats' | 'voluntariado';
}

/**
 * @description Creates the content for the cards in the dashboard
 * @param workshopCount the total count of done workshops
 * @param chatsCount the total count of done chats
 * @param volunteersCount the total count of done volunteers
 * @param scholarsCount the total count of active scholars
 * @returns Array of objects with the content for each card
 */
export const createDataCardsContent = (data: CardProps[]) => {
  const cardContent = data.map((card) => {
    const { icon, text, number, bg, cardButtonBg, activity } = card;
    return { icon, text, number, bg, cardButtonBg, activity };
  });

  return cardContent;
};


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

export const createArrayFromObject = (object: Record<string, number>) => {
  const array = Object.entries(object)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value);
  return array;
};
