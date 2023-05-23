export const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
export const REDIRECT_URL = "http://localhost:3000/api/google/calendarCallback";

export const CALENDAR_ID = 'ADFADSFSASDFASFASDF'

export const CALENDAR_SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.events.readonly',
];