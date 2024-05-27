'use server';

import moment from 'moment-timezone';
import 'moment/locale/es';
/**
 * @see https://github.com/orgs/vercel/discussions/3404
 */

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
    const parsedDate = moment.tz(dateString, 'YYYY-MM-DD', 'America/Caracas');
    const parsedTime = moment.tz(timeString, 'HH:mm', 'America/Caracas');

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

export const formatDates = async (
    dates: {
        date: string;
        startHour: string;
        endHour: string;
        endDate?: string; // Optional endDate
    }[]
): Promise<{
    start_dates: string[];
    end_dates: string[];
}> => {
    const start_dates = dates.map(({ date, startHour, endHour }) => {
        // For start_dates, use date with startHour and endHour
        const startDateTime = combineDateAndTime(date.trim(), startHour.trim());
        // Assuming the requirement is to have a single ISO string for start and end times
        return `${startDateTime}`;
    });

    const end_dates = dates.map(({ endDate, date, startHour, endHour }) => {
        // Use endDate if provided, otherwise fallback to date
        const effectiveEndDate = endDate || date;
        const endDateTime = combineDateAndTime(effectiveEndDate.trim(), endHour.trim());
        // Assuming the requirement is to have a single ISO string for start and end times
        return `${endDateTime}`;
    });

    return { start_dates, end_dates };
};
