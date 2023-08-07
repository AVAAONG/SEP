/**
 * @file Calendar API v3 functions
 * @author Kevin Bravo (kevinbravo.me)
 * 
 * @see link https://developers.google.com/calendar/api/v3/reference for more information about the Calendar v3 REST API
 * 
 * @description Functions related to the calendar API v3 main functionalities in the system.
 */

import { calendar_v3 } from '@googleapis/calendar';

import { Chat } from '@/types/Chat';
import { Calendar } from '../auth/auth';

import createEventObject from './calendarEventObject';
import { createChatCalendarDescription, createWorkshopCalendarDescription } from './calendarDescription';
import { Workshop } from '@/types/Workshop';
import { KindOfActivity } from '@/types/General';
import { addHours, getFormatedDate, getMeetEventLink, getPublicEventLink, substractMonths } from './utils';
import createZoomMeeting from '../zoom/zoom';
import { Modality, Skill } from '@prisma/client';

const WORKSHOP_CALENDAR_ID = "3bd2458b588a28274518ba4e7a45f44db6a04c33377cc8c008c986a72dc36cdb@group.calendar.google.com";
const CHAT_CALENDAR_ID = "e8e9c5e4d30d349b75f6061c8641fa2577ed9928403c4bd12b6bd6687291e7a9@group.calendar.google.com"
const VOLUNTEERS_CALENDAR_ID = "66c8bfc0379b164b2d4104d235933b8507228ea39a0f6301f7f3a1a7e878e204@group.calendar.google.com"

// {
//     title: 'Empakdsflkdsamf',
//         pensum: 'LEADERSHIP',
//             date: '2023-08-10',
//                 startHour: '11:27',
//                     endHour: '15:26',
//                         speaker: 'a7CUTUCTMKPXp8P7Wf8JQ1+/+Tibaire Labrador+/+tibairelabrador@gmail.com',
//                             spots: '2',
//                                 modality: 'IN_PERSON',
//                                     platform: '212113221',
//                                         workshopYear: ['III', 'IV'],
//                                             description: 'asfasfdd'
// }

export const createEvent = async (kindOfActivity: KindOfActivity, values: Workshop | Chat) => {
    const calendarId = 'primary'
    let addUrl: string | null = null;
    let meetLink: string | null = null
    let meetId: string | null = null;
    let meetingPassword: string | null = null

    if (kindOfActivity.toLocaleLowerCase().trim() === "workshop") {

        const { title, date, startHour, endHour, platform, } = values as Workshop;

        const [start, end] = getFormatedDate(date, startHour, endHour);
        const [eventDetails, eventDescription, zoomMeetLink, zoomMeetId, zoomMetPassword] = await createWorkshopEventDetails(values as Workshop)
        addUrl = await getPublicEventLink(title, platform, eventDescription, start, end);
        console.log(addUrl)
        console.log(eventDescription)

        const event = await Calendar.events.insert({
            calendarId: WORKSHOP_CALENDAR_ID,
            conferenceDataVersion: 1,
            requestBody: eventDetails,
        })
        const eventId = event.data.id!

        if (platform.toLowerCase().trim() === "google meet") {
            const [googleMeetLink, googleMeetId] = await getMeetEventLink(calendarId, event.data.id!);
            meetLink = googleMeetLink;
            meetId = googleMeetId;
        }

        else if (platform.toLowerCase().trim() === "zoom") {
            meetLink = zoomMeetLink!;
            meetId = zoomMeetId!;
            meetingPassword = zoomMetPassword!;
        }
        return [eventId, addUrl, meetLink, meetId, meetingPassword]

    }

    else if (kindOfActivity.toLowerCase().trim() === "chat") {

        const { name, platform, date, startHour } = values as Chat;
        const endHour = addHours(new Date(startHour), 2);
        const [start, end] = getFormatedDate(date, startHour, endHour.toLocaleString());
        const [eventDetails, eventDescription] = await createChatEventDetails(values as Chat)
        addUrl = await getPublicEventLink(name, platform, eventDescription, start, end);

        const event = await Calendar.events.insert({
            calendarId,
            conferenceDataVersion: 1,
            requestBody: eventDetails,
        })
        const eventId = event.data.id!


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
    const { title, pensum, date, startHour, endHour, speaker, modality, platform, description, workshopYear } = values

    const [start, end] = getFormatedDate(date, startHour, endHour);
    let calendarDescription: string;
    let eventDetails: calendar_v3.Schema$Event;
    let zoomMeetLink = null;
    let zoomMeetId = null;
    let zoomMetPassword = null;

    if (modality === "IN_PERSON" || platform.toLowerCase().trim() === "padlet") {
        calendarDescription = createWorkshopCalendarDescription(mapWorkshopSkill(pensum), splitSpeakerValues(speaker).speakerName, mapWorkshopModality(modality), platform, description, workshopYear);
        eventDetails = createEventObject(title, modality, platform, calendarDescription, start, end);
    }
    else if (modality === "VIRTUAL" || modality === "HIBRID") {
        if (platform.toLowerCase().trim() === 'zoom') {
            const [join_url, id, password] = await createZoomMeeting(title, new Date(start));
            zoomMeetLink = join_url
            zoomMeetId = id
            zoomMetPassword = password
            calendarDescription = createWorkshopCalendarDescription(pensum, splitSpeakerValues(speaker).speakerName, modality, platform, description, workshopYear, join_url, id, password);

            eventDetails = createEventObject(title, modality, zoomMeetLink, calendarDescription, start, end);
        }
        else {
            calendarDescription = createWorkshopCalendarDescription(pensum, splitSpeakerValues(speaker).speakerName, modality, platform, description, workshopYear);
            eventDetails = createEventObject(title, modality, platform, calendarDescription, start, end);
        }
    }
    else {
        calendarDescription = createWorkshopCalendarDescription(pensum, splitSpeakerValues(speaker).speakerName, modality, platform, description, workshopYear);
        eventDetails = createEventObject(title, modality, platform, calendarDescription, start, end);
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
 * @see https://developers.google.com/calendar/v3/reference/events/list - for more information about the API
 * @param calendarId - The ID of the calendar to retrieve events from.
 */
export const getCalendarEvents = async (calendarId: string = 'primary') => {
    const events = await Calendar.events.list({
        calendarId: calendarId,
        timeMin: substractMonths(3),
    })
    if (events.status === 200) {
        if (events === null || events === undefined) return console.error('No events found.');
        return events.data.items;
    }
    else {
        console.error('Error retrieving events');
        return null;
    }
}



/**
 * Evaluates wheter the calendar under the id exist or not. If exist returns that id, if not, returns the id of the users default calendar.
 *
 */
const getCalendarId = async (calendarId: string): Promise<string> => {
    let calendar = await Calendar.calendars.get({ calendarId })
    let id = '';

    if (calendar.data.id === null || calendar.data.id === undefined) {
        id = 'primary'
    }
    else {
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
    const responseObject = await Calendar.calendarList.list()
    const calendars = responseObject.data.items;
    if (calendars === null || calendars === undefined) {
        console.error('No calendars found.')
        return null;
    }
    else {
        const calendarIds = calendars.map(calendar => {
            if (calendar.id === null || calendar.id === undefined) {
                console.error('No calendar id found.');
                return 'primary'
            }
            return calendar.id;
        });
        return calendarIds;
    }
}

export const deleteCalendarEvent = (calendarId: string, eventId: string) => {
    Calendar.events.delete({
        calendarId,
        eventId
    })
}

export const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
}

export const getDate = () => {
    let date = new Date().toISOString();
    let search = date.indexOf(':')
    date = date.slice(0, search - 3)
    return date
}

const splitSpeakerValues = (value: string) => {
    const speakerValues = value.split('+/+');
    const speakerId = speakerValues[0];
    const speakerName = speakerValues[1];
    const speakerEmail = speakerValues[2];
    return { speakerId, speakerName, speakerEmail };
}

const mapWorkshopSkill = (skill: Skill): string => {
    switch (skill) {
        case "CITIZEN_EXERCISE":
            return 'Ejercicio Ciudadano'
        case "ENTREPRENEURSHIP":
            return 'Emprendimiento'
        case "ICT":
            return 'TIC'
        case "LEADERSHIP":
            return 'Liderazgo'
        case "SELF_MANAGEMENT":
            return 'Gerencia de si mismo'
        default:
            return 'N/A'
    }
}

const mapWorkshopModality = (modality: Modality) => {
    switch (modality) {
        case "HYBRID":
            return 'Híbrido'
        case "VIRTUAL":
            return 'Virutual'
        case "IN_PERSON":
            return 'Presencial'
        default:
            return 'N/A'
    }
}