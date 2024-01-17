/**
 * @file Calendar API v3 functions
 * @author Kevin Bravo (kevinbravo.me)
 *
 * @see link https://developers.google.com/calendar/api/v3/reference for more information about the Calendar v3 REST API
 *
 * @description Functions related to the calendar API v3 main functionalities in the system.
 */

import { WORKSHOP_CALENDAR_ID } from '@/lib/constants';
import createZoomMeeting from '@/lib/zoom';
import { calendar_v3 } from '@googleapis/calendar';
import { Chat, Volunteer, Workshop } from '@prisma/client';
import { Calendar } from '../googleAPI/auth';
import {
  createChatCalendarDescription,
  createWorkshopCalendarDescription,
} from './calendarDescription';
import createEventObject from './calendarEventObject';
import { IWorkshopCalendar } from './d';
import {
  addHours,
  getFormatedDate,
  getMeetEventLink,
  getPublicEventLink,
  substractMonths,
} from './utils';

export const createCalendarEvent = async (values: IWorkshopCalendar | Chat | Volunteer) => {
  let addUrl: string | null = null;
  let meetLink: string | null = null;
  let meetId: string | null = null;
  let meetingPassword: string | null = null;
  if ('asociated_skill' in values) {

    values as Workshop;
    const { title, start_dates, end_dates, platform } = values;

    const [eventDetails, eventDescription, zoomMeetLink, zoomMeetId, zoomMetPassword] =
      await createWorkshopEventDetails(values);

    //remplazar con un invite
    addUrl = await getPublicEventLink(title, platform, eventDescription, start_dates, end_dates);

    const events = eventDetails.map(async (event) => {
      return await Calendar.events.insert({
        calendarId: WORKSHOP_CALENDAR_ID,
        conferenceDataVersion: 1,
        requestBody: event,
        sendUpdates: 'all',
      });
    });

    const eventsIds = (await Promise.all(events)).map((event) => event.data.id!);
    if (platform.toLowerCase().trim() === 'google meet') {
      const [googleMeetLink, googleMeetId] = await getMeetEventLink(calendarId, event.data.id!);
      meetLink = googleMeetLink;
      meetId = googleMeetId;
    } else if (platform.toLowerCase().trim() === 'zoom') {
      meetLink = zoomMeetLink!;
      meetId = zoomMeetId!;
      meetingPassword = zoomMetPassword!;
    }
    return [eventsIds, addUrl, meetLink, meetId, meetingPassword];



  } else if ('level' in values) {
    values as Chat;
    const { name, platform, date, startHour } = values as Chat;
    const endHour = addHours(new Date(startHour), 2);
    const [start, end] = getFormatedDate(date, startHour, endHour.toLocaleString());
    const [eventDetails, eventDescription] = await createChatEventDetails(values as Chat);
    addUrl = await getPublicEventLink(name, platform, eventDescription, start, end);

    const event = await Calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      requestBody: eventDetails,
    });
    const eventId = event.data.id!;

    return [eventId, addUrl];
  } else {
    throw new Error('Invalid kind of activity');
  }
};

// // --------------------------------------------------- Calendar Main function ---------------------------------------------------
/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 *
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id
 */
const createWorkshopEventDetails = async (
  values: IWorkshopCalendar
): Promise<[calendar_v3.Schema$Event[], string, string?, string?, string?]> => {
  const {
    title,
    start_dates,
    end_dates,
    modality,
    platform,
    description,
  } = values
  let calendarDescription: string = ''
  let eventDetails: calendar_v3.Schema$Event[];
  let zoomMeetLink;
  let zoomMeetId;
  let zoomMetPassword;

  if (modality === 'IN_PERSON') {
    calendarDescription = createWorkshopCalendarDescription(values);
    eventDetails = start_dates.map((startDate, index) => {
      const endDate = end_dates![index];
      return createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        startDate.toISOString(),
        endDate.toISOString()
      );
    });
  } else if (modality === 'ONLINE') {
    if (platform === 'ZOOM') {
      eventDetails = await Promise.all(start_dates.map(async (startDate, index) => {
        const [join_url, id, password] = await createZoomMeeting(title, startDate);
        zoomMeetLink = join_url;
        zoomMeetId = id;
        zoomMetPassword = password;
        calendarDescription = createWorkshopCalendarDescription(values,
          join_url,
          id,
          password
        );
        const endDate = end_dates![index];
        return createEventObject(
          title,
          modality,
          zoomMeetLink,
          calendarDescription,
          startDate.toISOString(),
          endDate.toISOString()
        );
      }))

    } else {
      calendarDescription = createWorkshopCalendarDescription(values);
      eventDetails = start_dates.map((startDate, index) => {
        const endDate = end_dates![index];
        return createEventObject(
          title,
          modality,
          platform,
          calendarDescription,
          startDate.toISOString(),
          endDate.toISOString()
        );
      });
    }
  } else {
    calendarDescription = createWorkshopCalendarDescription(values);
    eventDetails = start_dates.map((startDate, index) => {
      const endDate = end_dates![index];
      return createEventObject(
        title,
        modality,
        platform,
        calendarDescription,
        startDate.toISOString(),
        endDate.toISOString()
      );
    });
  }
  return [eventDetails, calendarDescription, zoomMeetLink, zoomMeetId, zoomMetPassword];
};

const createChatEventDetails = async (
  values: Chat
): Promise<[calendar_v3.Schema$Event, string]> => {
  const { name, description, speaker, level, kindOfChat, platform, date, startHour } = values;
  const endHour = addHours(new Date(startHour), 2);
  const [start, end] = getFormatedDate(date, startHour, endHour.toLocaleString());
  let calendarDescription = createChatCalendarDescription(
    level,
    speaker,
    kindOfChat,
    platform,
    description
  );
  let eventDetails = createEventObject(name, kindOfChat, platform, calendarDescription, start, end);
  return [eventDetails, calendarDescription];
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
 * Evaluates wheter the calendar under the id exist or not. If exist returns that id, if not, returns the id of the users default calendar.
 *
 */
const getCalendarId = async (calendarId: string): Promise<string> => {
  let calendar = await Calendar.calendars.get({ calendarId });
  let id = '';

  if (calendar.data.id === null || calendar.data.id === undefined) {
    id = 'primary';
  } else {
    id = 'primary';
  }
  return id;
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

export const deleteCalendarEvent = (calendarId: string, eventId: string) => {
  Calendar.events.delete({
    calendarId,
    eventId,
  });
};

export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

export const getDate = () => {
  let date = new Date().toISOString();
  let search = date.indexOf(':');
  date = date.slice(0, search - 3);
  return date;
};

const splitSpeakerValues = (value: string) => {
  const speakerValues = value.split('+/+');
  const speakerId = speakerValues[0];
  const speakerName = speakerValues[1];
  const speakerEmail = speakerValues[2];
  return { speakerId, speakerName, speakerEmail };
};
