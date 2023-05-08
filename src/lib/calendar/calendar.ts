
import { Chat, ChatLevel } from '@/types/Chat';
import { KindOfActivity, Platform, activityMode } from '@/types/General';
import { AsociatedProject, Volunteer } from '@/types/Volunteer';
import { KindOfWorkshop, Pensum, Workshop } from '@/types/Workshop';
import { calendar_v3, calendar } from '@googleapis/calendar'

import { getFormatedDate, substractMonths } from '../utils';
// // import { KindOfWorkshop, Workshop, Platform, Pensum } from '..';
// // import { CALENDAR_ID } from '../constants';
// // import { getAccessToken } from './oauth';
// // import createZoomMeeting from './zoom';

import createEventObject from './calendarEventObject';
import createCalendarDescription from './calendarDescription';

// // --------------------------------------------------- Auth related Functions ---------------------------------------------------

// // --------------------------------------------------- Calendar Utils Functions ---------------------------------------------------

// /**
//  * Sets an event in the calendar and gets the meeting created for that event and the 'add to my calendar' link
//  *
//  * @param workshop the data of a workshop
//  * @returns the meeting link and the 'add to my calendar' link
//  */
// const calendarMain = async (workshop: Workshop): Promise<string[]> => {
//     if (workshop.kindOfWorkshop === "Presencial") {
//         await createEvent(workshop);
//         const addUrl = await getPublicEventLink(workshop);
//         return [addUrl];
//     }
//     else {
//         if (workshop.platform === "Google Meet") {
//             const eventId = await createEvent(workshop) as string;
//             const [meetLink, meetId] = await getMeetEventLink(eventId);
//             const addUrl = await getPublicEventLink(workshop, meetLink!, meetId!);
//             return [addUrl, meetLink!, meetId!];
//         }
//         else if (workshop.platform === "Zoom") {
//             const [, join_url, id, password] = await createEvent(workshop);
//             const addUrl = await getPublicEventLink(workshop, join_url, id, password);
//             return [addUrl, join_url, id, password];
//         }
//         else if (workshop.platform === "Padlet") {
//             await createEvent(workshop);
//             const addUrl = await getPublicEventLink(workshop);
//             return [addUrl];
//         }
//         else {
//             return ["NONE"];
//         }
//     }
// };



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


// /**
//  * it removes the spaces and the points from the string passed as argument
//  * @param str the string to remove the spaces and the points
//  * @returns
//  */
// const quite = (str: string): string => {
//     const withNoPoint = str.replace(/\./g, "")
//     return withNoPoint.replace(/\s/g, '')
// }

// /**
//  * it substracts the hours passed as argument to the date passed as argument
//  * @param date the date to substract the hours
//  * @param hours the number of hours to substract
//  * @returns the Date object with the hours substracted
//  */
// const subtractHours = (date: Date, hours: number): Date => {
//     date.setHours(date.getHours() - hours);
//     return date;
// }




// // --------------------------------------------------- Calendar Main function ---------------------------------------------------
/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 *
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id
 */
const createEvent = async (values: Workshop | Chat | Volunteer): Promise<string[] | string> => {

    //handler the case in where the calendar dosnt exist
    const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour } = values;
    
    const calendarId = CALENDAR_ID;
    const [start, end] = getFormatedDate(date, startHour, endHour);
    let calendarDescription: string;
    let eventDetails: calendar_v3.Schema$Event;
    if (kindOfWorkshop === "Presencial" || platform === 'Padlet') {

        calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
        eventDetails = createEventObject(name, activityMode, platform, calendarDescription, start, end);

        // creates the event
        await Calendar.events.insert({ calendarId: calendarId, conferenceDataVersion: 1, requestBody: eventDetails, sendUpdates: "all" })

        return "NONE";
    }
    else {
        if (platform === 'Zoom') {
            const [join_url, id, password] = await createZoomMeeting(name, start);
            calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, join_url, id, password);
            eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end, join_url);
            // creates the event
            const event = await Calendar.events.insert({ calendarId: calendarId, conferenceDataVersion: 1, requestBody: eventDetails })
            return [event.data.id, join_url, id, password];
        }
        else if (platform === 'Google Meet') {
            calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
            eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
            // creates the event
            const event = await Calendar.events.insert({ calendarId: calendarId, conferenceDataVersion: 1, requestBody: eventDetails })
            return event.data.id!;
        }
        else {
            return "NONE";
        }
    }
};


// /**
//  * it adds a specific number of `days` to a date
//  * @param date the date of the event
//  * @param days the number of days we want to add to the date
//  * @returns the date with the days added in ISO format
//  */
// const addDays = (date: string, days: number) => {
//     const result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result.toISOString();
// }



/**
 * Lists the events of a calendar in the last 3 months.
 * @see link https://developers.google.com/calendar/v3/reference/events/list - for more information about the API
 * @param calendarId - The ID of the calendar to retrieve events from.
 */
export const getCalendarEvents = async (calendarId: string = 'primary') => {
    let eventst;
    Calendar.events.list(
        {
            calendarId: calendarId,
            timeMin: substractMonths(3),
            orderBy: 'startTime',

        },
        (err, res) => {
            if (err) return console.error('The API returned an error: ' + err);
            if (res === null || res === undefined) return console.error('No events found.');
            const events = res.data.items;
            eventst = events;
        }
    );
}