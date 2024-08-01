import moment from 'moment-timezone';
import 'moment/locale/es';

export const formatDateToStoreInDB = (date: string) => moment.tz(date, 'YYYY-MM-DD', 'America/Caracas').utc().toISOString()

export const formatDateToDisplayInInput = (date: string | Date) => moment.tz(date, 'America/Caracas').format('YYYY-MM-DD')
export const formatDateTimeToDisplayInput = (date: string | Date) => moment.tz(date, 'America/Caracas').format('YYYY-MM-DDTHH:mm');

export const formatHourToDisplayInput = (date: string | Date) => moment.tz(date, 'America/Caracas').format('HH:mm')