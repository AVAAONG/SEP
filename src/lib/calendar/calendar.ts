'use server';
/**
 * @file Calendar API v3 functions
 * @author Kevin Bravo (kevinbravo.me)
 *
 * @see link https://developers.google.com/calendar/api/v3/reference for more information about the Calendar v3 REST API
 *
 * @description Functions related to the calendar API v3 main functionalities in the system.
 */

import { CHAT_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from '@/lib/constants';
import createZoomMeeting, { updateZoomMeeting } from '@/lib/zoom';
import { calendar_v3 } from '@googleapis/calendar';
import { Calendar, setTokens } from '../googleAPI/auth';
import createCalendarDescription from './calendarDescription';
import createEventObject from './calendarEventObject';
import { IChatCalendar, IWorkshopCalendar } from './d';
import { getMeetEventLink, substractMonths } from './utils';

export interface MeetingDetails {
  meetingLink: string | null | undefined;
  meetingId: string | null | undefined;
  meetingPassword?: string | null | undefined;
}
let googleMeetLink;
let googleMeetId;
export const createCalendarEvent = async (
  values: IWorkshopCalendar | IChatCalendar
): Promise<[string[], MeetingDetails[]]> => {
  await setTokens();
  const calendarId = 'asociated_skill' in values ? WORKSHOP_CALENDAR_ID : CHAT_CALENDAR_ID;
  let meetingDetails: MeetingDetails[] = [];
  const { platform } = values;
  const [eventDetails, zoomMeetDetails] = await createEventDetails(values);
  const events = eventDetails.map(async (event) => {
    return await Calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      requestBody: event,
      sendUpdates: 'all',
    });
  });
  const eventsIds = (await Promise.all(events)).map((event) => event.data.id!);
  if (platform === 'GOOGLE_MEET') {
    const googleMeetEventDetails = eventsIds.map(
      async (eventId) => await getMeetEventLink(calendarId, eventId)
    );
    meetingDetails = await Promise.all(googleMeetEventDetails);
  } else if (platform === 'ZOOM') meetingDetails = [...zoomMeetDetails];
  return [eventsIds, meetingDetails];
};

// // --------------------------------------------------- Calendar Main function ---------------------------------------------------
/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 *
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id
 */
const createEventDetails = async (
  values: IWorkshopCalendar | IChatCalendar
): Promise<
  [
    calendar_v3.Schema$Event[],
    {
      meetingLink: string | null | undefined;
      meetingId: string | null | undefined;
      meetingPassword?: string | null | undefined;
    }[],
  ]
> => {
  const { title, start_dates, end_dates, modality, platform } = values;
  let calendarDescription: string = '';
  let eventDetails: calendar_v3.Schema$Event[];
  const zoomMeetDetails: {
    meetingLink: string | null | undefined;
    meetingId: string | null | undefined;
    meetingPassword?: string | null | undefined;
  }[] = [];

  const attendees = values.speakersData.map((speaker) => {
    return {
      email: speaker.email ? speaker.email : 'avaatecnologia@gmail.com',
      displayName: speaker.email,
      organizer: true,
      responseStatus: 'accepted',
    };
  });

  if (modality === 'IN_PERSON') {
    calendarDescription = createCalendarDescription(values);
    eventDetails = start_dates.map((startDate, index) => {
      const endDate = end_dates![index];
      return createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        startDate,
        endDate,
        attendees
      );
    });
  } else if (modality === 'ONLINE') {
    if (platform === 'ZOOM') {
      eventDetails = await Promise.all(
        start_dates.map(async (startDate, index) => {
          const [meetingLink, meetingId, meetingPassword] = await createZoomMeeting(
            title,
            startDate
          );
          zoomMeetDetails.push({
            meetingLink,
            meetingId,
            meetingPassword,
          });
          calendarDescription = createCalendarDescription(
            values,
            meetingLink,
            meetingId,
            meetingPassword
          );
          const endDate = end_dates![index];
          return createEventObject(
            title,
            modality,
            meetingLink,
            calendarDescription,
            startDate,
            endDate,
            attendees
          );
        })
      );
    } else {
      calendarDescription = createCalendarDescription(values);
      eventDetails = start_dates.map((startDate, index) => {
        const endDate = end_dates![index];
        return createEventObject(
          title,
          modality,
          platform,
          calendarDescription,
          startDate,
          endDate,
          attendees
        );
      });
    }
  } else {
    calendarDescription = createCalendarDescription(values);
    eventDetails = start_dates.map((startDate, index) => {
      const endDate = end_dates![index];
      return createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        startDate,
        endDate,
        attendees
      );
    });
  }
  return [eventDetails, zoomMeetDetails];
};

/**
 * Lists the events of a calendar of the last 3 months.
 * @see https://developers.google.com/calendar/v3/reference/events/list - for more information about the API
 * @param calendarId - The ID of the calendar to retrieve events from.
 */
export const getCalendarEvents = async (calendarId: string = 'primary') => {
  try {
    const events = await Calendar.events.list({
      calendarId: calendarId,
      timeMin: substractMonths(3),
    });
    if (events.status === 200) {
      if (events === null || events === undefined) return console.error('No events found.');
      return events.data.items;
    }
  } catch (error) {
    console.error('Error retrieving events:', error);
    return [];
  }
};

/**
 * Lists all the calendars in the user's Google account and returns an array of calendar IDs.
 * @returns An array of calendar IDs.
 * @example
 * ```
 * let calendarIds = listCalendars();
 * console.log(calendarIds);
 * ```
 */
export const listCalendars = async (): Promise<string[] | null> => {
  const responseObject = await Calendar.calendarList.list();
  const calendars = responseObject.data.items;
  if (calendars === null || calendars === undefined) {
    console.error('No calendars found.');
    return null;
  } else {
    const calendarIds = calendars.map((calendar) => {
      if (calendar.id === null || calendar.id === undefined) {
        console.error('No calendar id found.');
        return 'primary';
      }
      return calendar.id;
    });
    return calendarIds;
  }
};

export const deleteCalendarEvent = async (calendarId: string, eventId: string) => {
  await setTokens();
  await Calendar.events.delete({
    calendarId,
    eventId,
  });
};

export const updateCalendarEvent = async (
  eventsIdForUpdates: string[],
  values: IWorkshopCalendar | IChatCalendar,
  meetingEvents: string[]
) => {
  await setTokens();
  const calendarId = 'asociated_skill' in values ? WORKSHOP_CALENDAR_ID : CHAT_CALENDAR_ID;
  let meetingDetails: MeetingDetails[] = [];
  const { platform } = values;
  eventsIdForUpdates.map(async (eventId, index) => {
    let meetingDetails: MeetingDetails = {
      meetingLink: null,
      meetingId: null,
      meetingPassword: null,
    };
    if (platform.toLowerCase().trim() === 'ZOOM') {
      if (meetingEvents.length === 0) {
        const zoom = await createZoomMeeting(values.title, values.start_dates as unknown as string);
        meetingDetails = {
          meetingId: zoom[1],
          meetingLink: zoom[0],
          meetingPassword: zoom[2],
        };
      } else {
        meetingDetails = await updateZoomMeeting(
          meetingEvents[index],
          values.title,
          values.start_dates as unknown as string
        );
      }
    }
    const eventDetails = await updateEventDetails(values, meetingDetails);
    return await Calendar.events.patch({
      calendarId,
      eventId,
      requestBody: eventDetails,
    });
  });
  return meetingDetails;
};

export const getDate = () => {
  let date = new Date().toISOString();
  let search = date.indexOf(':');
  date = date.slice(0, search - 3);
  return date;
};

const updateEventDetails = async (
  values: IWorkshopCalendar | IChatCalendar,
  meetingDetails?: MeetingDetails
): Promise<calendar_v3.Schema$Event> => {
  const { title, start_dates, end_dates, modality, platform } = values;
  let calendarDescription: string = '';
  let eventDetails: calendar_v3.Schema$Event;

  const attendees = values.speakersData.map((speaker) => {
    return { email: speaker.email ? speaker.email : 'avaatecnologia@gmail.com', displayName: speaker.label };
  });

  if (modality === 'IN_PERSON') {
    calendarDescription = createCalendarDescription(values);
    eventDetails = createEventObject(
      title,
      modality,
      platform,
      calendarDescription,
      start_dates as unknown as string,
      end_dates as unknown as string,
      attendees
    );
  } else if (modality === 'ONLINE') {
    if (platform === 'ZOOM') {
      calendarDescription = createCalendarDescription(
        values,
        meetingDetails?.meetingLink!,
        meetingDetails?.meetingId!,
        meetingDetails?.meetingPassword!
      );
      eventDetails = createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        start_dates as unknown as string,
        end_dates as unknown as string,
        attendees
      );
    } else {
      calendarDescription = createCalendarDescription(values);
      eventDetails = createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        start_dates as unknown as string,
        end_dates as unknown as string,
        attendees
      );
    }
  } else {
    calendarDescription = createCalendarDescription(values);
    eventDetails = createEventObject(
      title,
      modality,
      platform,
      calendarDescription,
      start_dates as unknown as string,
      end_dates as unknown as string,
      attendees
    );
  }
  return eventDetails;
};

export const createCalendar = async () => {
  await setTokens();
  const calendars: calendar_v3.Schema$Calendar[] = [
    // {
    //   summary: 'Actividades Formativas', // Replace with your Calendar Name
    //   description: "Calendario de actividades formativas del Programa de Excelencia Académica (ProExcelencia) de AVAA",
    //   timeZone: 'America/Caracas', // Replace with your Time Zone
    // },
    // {
    //   summary: 'Chat clubs de inglés', // Replace with your Calendar Name
    //   description: "Calendario de chat clubs de inglés del Programa de Excelencia Académica (ProExcelencia) de AVAA",
    //   timeZone: 'America/Caracas' // Replace with your Time Zone
    // },
    // {
    //   summary: 'Actividades de voluntariado', // Replace with your Calendar Name
    //   description: "Calendario de actividades de voluntariado del Programa de Excelencia Académica (ProExcelencia) de AVAA",
    //   timeZone: 'America/Caracas' // Replace with your Time Zone
    // },
  ]
  calendars.map(async (calendar) => {
    try {
      const response = await Calendar.calendars.insert({ requestBody: calendar });
      console.log('Calendar created successfully: ', response.data);
    } catch (error) {
      console.error('Error creating calendar: ', error);
    }
  })
}