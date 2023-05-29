import { Platform, activityMode } from "@/types/General";
import { calendar_v3 } from "@googleapis/calendar";

/**
 * Creates the default event object with all the details about the activitie
 * 
 * @param name - The name of the activity
 * @param platform - platform where the activity will happen (A place in the case `activityMode` is "presencial" or a link in the case `activityMode` is "virtual" | "hibrida" )
 * @param calendarDescription - decsription with all the details of the activity
 * @param start - the start hour of the activity (in aaaa-mm-dd format)
 * @param end - the end hour of the activity (in aaaa-mm-dd format) (eg. '2015-05-28T17:00:00-07:00')
 * @returns an event object
 *
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events} for the event schema
 */
const createDefaultEvent = (
    name: string,
    platform: Platform,
    calendarDescription: string,
    start: string,
    end: string,
    attendees?: calendar_v3.Schema$EventAttendee[]
) => {
    const defaultEvent: calendar_v3.Schema$Event = {
        summary: name,
        description: calendarDescription,
        location: platform,
        start: {
            dateTime: start,
            timeZone: "America/Caracas"
        },
        end: {
            dateTime: end,
            timeZone: "America/Caracas"
        },
        visibility: "public",
        guestsCanSeeOtherGuests: true,
        //sets a reminder 1:30 hours before the event begins
        reminders: {
            useDefault: false,
            overrides: [
                {
                    method: "popup",
                    minutes: 78
                },
                {
                    method: "popup",
                    minutes: 30
                }
            ]
        },
        attendees,
    };
    return defaultEvent;
}

/** TODO: should be fixed
 * create a recurrent event
 */
const createRecurrentEvent = (event: calendar_v3.Schema$Event, days: Date[]) => {
    const recurrentEvent = {
        ...event,
        recurrence: [
            `RRULE:`,
        ],
    }
    return recurrentEvent;
}

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
 * @param name - The name of the activity
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
    name: string,
    activityMode: activityMode,
    platform: Platform,
    calendarDescription: string,
    start: string,
    end: string,
    attendees?: calendar_v3.Schema$EventAttendee[],
): calendar_v3.Schema$Event => {

    let event: calendar_v3.Schema$Event = {}

    const defaultEvent = createDefaultEvent(
        name,
        platform,
        calendarDescription,
        start,
        end,
        attendees
    )

    if (activityMode === "presencial") event = defaultEvent;

    else if (activityMode === "virtual" || activityMode === "hibrida") {
        if (platform === "google meet") {
            event = {
                ...defaultEvent,
                conferenceData: {
                    createRequest: {
                        conferenceSolutionKey: {
                            type: "hangoutsMeet"
                        },
                        requestId: "7qxalsvy0e",
                    },
                },
            };
        }
        else if (platform === "padlet") {
            event = {
                ...defaultEvent
            }
            event.start = {
                date: start,
                timeZone: "America/Caracas"
            }
            event.end = {
                date: end,
                timeZone: "America/Caracas"
            }
        }
        else  {
            event = defaultEvent
        }
    }
    else event = defaultEvent;
    return event
}

export default createEventObject;