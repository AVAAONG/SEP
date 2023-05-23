
import { Chat } from '@/types/Chat';
import { calendar_v3 } from '@googleapis/calendar';
import { Calendar } from '../auth/auth';

import createEventObject from './calendarEventObject';
import { createChatCalendarDescription, createWorkshopCalendarDescription } from './calendarDescription';
import { Workshop } from '@/types/Workshop';
import { CALENDAR_ID } from '../constants';
import { KindOfActivity } from '@/types/General';
import { addHours, getFormatedDate, getMeetEventLink, getPublicEventLink, substractMonths } from './utils';


export const createEvent = async (kindOfActivity: KindOfActivity, values: Workshop | Chat) => {
    const calendarId = await getCalendarId(CALENDAR_ID);
    let addUrl: string | null = null;
    let meetLink: string | null = null
    let meetId: string | null = null;
    let meetingPassword: string | null = null

    if (kindOfActivity === "workshop") {

        const { name, platform, date, startHour, endHour } = values as Workshop;
        const [start, end] = getFormatedDate(date, startHour, endHour);
        const [eventDetails, eventDescription, zoomMeetLink, zoomMeetId, zoomMetPassword] = await createWorkshopEventDetails(values as Workshop)
        addUrl = await getPublicEventLink(name, platform, eventDescription, start, end);

        const eventId = await Calendar.events.insert({
            calendarId,
            conferenceDataVersion: 1,
            requestBody: eventDetails,
        })

        if (platform === "google meet") {
            const [googleMeetLink, googleMeetId] = await getMeetEventLink(calendarId, eventId.data.id!);
            meetLink = googleMeetLink;
            meetId = googleMeetId;
        }

        else if (platform === "zoom") {
            meetLink = zoomMeetLink!;
            meetId = zoomMeetId!;
            meetingPassword = zoomMetPassword!;
        }
        return [eventId, addUrl, meetLink, meetId, meetingPassword]

    }

    else if (kindOfActivity === "chat") {

        const { name, platform, date, startHour } = values as Chat;
        const endHour = addHours(new Date(startHour), 2);
        const [start, end] = getFormatedDate(date, startHour, endHour.toLocaleString());
        const [eventDetails, eventDescription] = await createChatEventDetails(values as Chat)
        addUrl = await getPublicEventLink(name, platform, eventDescription, start, end);

        const eventId = await Calendar.events.insert({
            calendarId,
            conferenceDataVersion: 1,
            requestBody: eventDetails,
        })

        return [eventId, addUrl]
    }
    else {
        throw new Error("Invalid kind of activity");
    }
}



// // --------------------------------------------------- Calendar Main function ---------------------------------------------------
/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 *
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id
 */
const createWorkshopEventDetails = async (values: Workshop): Promise<[calendar_v3.Schema$Event, string, string?, string?, string?]> => {
    const { name, pensum, date, startHour, endHour, speaker, kindOfWorkshop, platform, description, avaaYear } = values
    const [start, end] = getFormatedDate(date, startHour, endHour);
    let calendarDescription: string;
    let eventDetails: calendar_v3.Schema$Event;
    let zoomMeetLink = null;
    let zoomMeetId = null;
    let zoomMetPassword = null;

    if (kindOfWorkshop === "presencial" || kindOfWorkshop === "asincrona") {
        calendarDescription = createWorkshopCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, avaaYear);
        eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
    }
    else if (kindOfWorkshop === "virtual" || kindOfWorkshop === "hibrida") {
        if (platform === 'zoom') {
            const [join_url, id, password] = await createZoomMeeting(name, start);
            zoomMeetLink = join_url
            zoomMeetId = id
            zoomMetPassword = password
            calendarDescription = createWorkshopCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, avaaYear, join_url, id, password);
            eventDetails = createEventObject(name, kindOfWorkshop, zoomMeetLink as any, calendarDescription, start, end);
        }
        else {
            calendarDescription = createWorkshopCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, avaaYear);
            eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
        }
    }
    else {
        calendarDescription = createWorkshopCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, avaaYear);
        eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
    }
    return [eventDetails, calendarDescription, zoomMeetLink, zoomMeetId, zoomMetPassword];
};


const createChatEventDetails = async (values: Chat): Promise<[calendar_v3.Schema$Event, string]> => {
    const { name, description, speaker, level, kindOfChat, platform, date, startHour } = values;
    const endHour = addHours(new Date(startHour), 2);
    const [start, end] = getFormatedDate(date, startHour, endHour.toLocaleString());
    let calendarDescription = createChatCalendarDescription(level, speaker, kindOfChat, platform, description);
    let eventDetails = createEventObject(name, kindOfChat, platform, calendarDescription, start, end);
    return [eventDetails, calendarDescription];
};



/**
 * Lists the events of a calendar of the last 3 months.
 * @see link https://developers.google.com/calendar/v3/reference/events/list - for more information about the API
 * @param calendarId - The ID of the calendar to retrieve events from.
 */
export const getCalendarEvent = (calendarId: string = 'primary') => {
    let events;
    Calendar.events.list(

        {
            calendarId: calendarId,
            timeMin: substractMonths(3),
            orderBy: 'startTime',

        },
        (err: any, res: any) => {
            if (err) return console.error('The API returned an error: ' + err);
            if (res === null || res === undefined) return console.error('No events found.');
            events = res.data.items;
            return events;
        }
    );
}

/**
 * Evaluates wheter the calendar under the id exist or not. If exist returns that id, if not, returns the id of the users default calendar.
 *
 * @returns the deafults calendar id or {@linkcode CALENDAR_ID}
 */
const getCalendarId = async (calendarId: string): Promise<string> => {
    let calendar = await Calendar.calendars.get({ calendarId })
    let id = '';

    if (calendar.data.id === null || calendar.data.id === undefined) {
        calendar = await Calendar.calendars.get({ calendarId: "primary" })
        id = calendar.data.id!;
    }
    else {
        id = calendarId;
    }
    return id;
};
