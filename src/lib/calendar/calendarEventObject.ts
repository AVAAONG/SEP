import { calendar_v3 } from '@googleapis/calendar';
import { Modality } from '@prisma/client';

/**
 * Creates the default event object with all the details about the activitie
 *
 * @param title - The title of the activity
 * @param platform - platform where the activity will happen (A place in the case `activityMode` is "presencial" or a link in the case `activityMode` is "virtual" | "hibrida" )
 * @param calendarDescription - decsription with all the details of the activity
 * @param start - the start hour of the activity (in aaaa-mm-dd format)
 * @param end - the end hour of the activity (in aaaa-mm-dd format) (eg. '2019-10-12T07:20:50.52Z')
 * @returns an event object
 *
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events} for the event schema
 */
const createDefaultEvent = (
  title: string,
  platform: string,
  calendarDescription: string,
  start: string,
  end: string,
  attendees?: calendar_v3.Schema$EventAttendee[]
) => {
  const defaultEvent: calendar_v3.Schema$Event = {
    summary: title,
    description: calendarDescription,
    location: platform,
    start: {
      dateTime: start,
      timeZone: 'America/Caracas',
    },
    end: {
      dateTime: end,
      timeZone: 'America/Caracas',
    },
    visibility: 'public',
    guestsCanSeeOtherGuests: false,
    reminders: {
      useDefault: false,
      overrides: [
        // remainder 1 day before the event
        {
          method: 'email',
          minutes: 1440,
        },
        {
          method: 'popup',
          minutes: 1440,
        },
        // remainder 1 hour before the event
        {
          method: 'popup',
          minutes: 60,
        },
        // remainder 30 minutes before the events
        {
          method: 'popup',
          minutes: 30,
        },
        // remainder 15 minutes before the event
        {
          method: 'popup',
          minutes: 15,
        },
      ],
    },
    attendees,
  };
  return defaultEvent;
};

/**
 * Creates the \event object with all the details about the activitie
 *
 * it evaluates whether the activity is "presencial" or "virtual" | "hibrida" to set up the virtual meeting or not
 *
 * If the platform of the activitiy is 'google meet', it creates a meet meeting and add it to the event
 *
 * If the platform of the activitiy is 'padlet', iit sets the start and end date to all day event
 *
 *
 * @param title - The title of the activity
 * @param platform - platform where the activity will happen (A place in the case `activityMode` is "presencial" or a link in the case `activityMode` is "virtual" | "hibrida" )
 * @param activityMode - the mode of the activity
 * @param calendarDescription - decsription with all the details of the activity
 * @param start - the start hour of the activity (in aaaa-mm-dd format)
 * @param end - the end hour of the activity (in aaaa-mm-dd format) (eg. '2015-05-28T17:00:00-07:00')
 * @returns an event object
 *
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events} for the event schema
 */
const createEventObject = (
  title: string,
  modality: Modality,
  platform: string,
  calendarDescription: string,
  start: string,
  end: string,
  attendees?: calendar_v3.Schema$EventAttendee[]
): calendar_v3.Schema$Event => {
  let event: calendar_v3.Schema$Event = {};

  const defaultEvent = createDefaultEvent(
    title,
    platform,
    calendarDescription,
    start,
    end,
    attendees
  );

  if (modality === 'IN_PERSON') event = defaultEvent;

  else if (modality === 'ONLINE') {
    if (platform === 'PADLET') {
      event = {
        ...defaultEvent,
      };
      event.start = {
        date: start,
        timeZone: 'America/Caracas',
      };
      event.end = {
        date: end,
        timeZone: 'America/Caracas',
      };
    } else {
      event = defaultEvent;
    }
  } else {
    throw new Error('No se especificó un tipo de modalidad válido');
  };
  return event;
};

export default createEventObject;
