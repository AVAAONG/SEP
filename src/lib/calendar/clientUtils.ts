'use client';

import moment from "moment";

/**
 * it formats the date passed as argument to the format needed by the calendar api
 *
 * @remarks the format needed by the calendar api is `aaaa-mm-ddThh:mm:ss-hh:mm`
 * @remarks If the end hour is not passed as argument, it will add 2 hours to the start hour and set it as the end hour
 *
 * @param date the date of the event (the format should be passed as `aaaa-mm-dd`)
 * @param startingHour the hour of the event (the format should be passed as `hh:mm`)
 * @returns the date object of the start and end hour in ISO string format
 */
function combineDateAndTime(dateString: string, timeString: string): string {
    // Parse the input date and time
    const parsedDate = moment(dateString, 'YYYY-MM-DD');
    const parsedTime = moment(timeString, 'HH:mm');

    // Combine the date and time
    const combinedDateTime = parsedDate.set({
        hour: parsedTime.hour(),
        minute: parsedTime.minute(),
        second: 0, // Optional: Set seconds to 0
        millisecond: 0, // Optional: Set milliseconds to 0
    });
    // Convert to UTC based on the specified time zone
    const utcDateTime = combinedDateTime.utc();
    // Return the ISO string
    return utcDateTime.toISOString();
}

export const formatDates = (
    dates: {
        date: string;
        startHour: string;
        endHour: string;
    }[]
): {
    start_dates: string[];
    end_dates: string[];
} => {
    const start_dates = dates.map(({ date, startHour }) =>
        combineDateAndTime(date.trim(), startHour.trim())
    );
    const end_dates = dates.map(({ date, endHour }) => combineDateAndTime(date.trim(), endHour.trim()));
    return { start_dates, end_dates };
};

