import { chatIcon, userIcon, volunterIcon, workshopIcon } from '@/assets/svgs';
import adminAuthOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import { CALENDAR_IDS } from '@/lib/constants';
import { setTokens } from '@/lib/googleAPI/auth';
import { getCalendarEvents } from '@/lib/googleAPI/calendar/calendar';
import { BigCalendarEventType } from '@/types/Calendar';
import { calendar_v3 } from '@googleapis/calendar';
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

/**
 * Gets the events from Google Calendar for each calendar ID and formats them to match the React Big Calendar event type.
 * @returns A promise that resolves to an array of arrays of BigCalendarEventType objects.
 * @todo Add error handling
 * @todo allow to return a single array of events.
 */
export const getAndFormatCalendarEvents = async (): Promise<BigCalendarEventType[][]> => {
  const session = await getServerSession(adminAuthOptions);

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

export const createDashboardCardContent = (
  workshopCount: number,
  chatsCount: number,
  volunteersCount: number,
  scholarsCount: number
) => {
  const cardContet = [
    {
      icon: workshopIcon,
      text: 'Actividades formativas realizadas',
      number: workshopCount,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
    {
      icon: chatIcon,
      text: 'Chats Realizados',
      number: chatsCount,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: volunterIcon,
      text: 'Horas de voluntariado realizadas',
      number: volunteersCount,
      bg: ' from-green-600  to-emerald-800',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: userIcon,
      text: 'Becarios activos',
      number: scholarsCount,
      bg: 'from-yellow-500  to-yellow-700',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
  ];
  return cardContet;
};
