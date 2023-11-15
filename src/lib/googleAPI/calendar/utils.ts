'use server';
/**
 * @file This file contains utils functions related to calendar, such as creating the event object, the event description, the event link, etc.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Platform } from '@/types/General';
import { Modality, Skill } from '@prisma/client';
import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { Calendar } from '../auth';

/**
 * It creates an 'Add to my calendar' Link
 *
 * @see link https://stackoverflow.com/questions/5831877/how-do-i-create-a-link-to-add-an-entry-to-a-calendar for more information about how to create the link
 * @param name the name of the event
 * @param platform the platform where the event will be hosted
 * @param calendarDescription the description of the event
 * @param startDate the start date of the event
 * @param endDate the end date of the event
 * @returns 'Add to my calendar' link
 */
export const getPublicEventLink = async (
  name: string,
  platform: Platform,
  calendarDescription: string,
  startDate: string,
  endDate: string
): Promise<string> => {
  // give format to the location, description and dates
  const encodedLocation = encodeURIComponent(platform);
  const calendarName = encodeURIComponent(name);
  const encodeDescription = encodeURIComponent(calendarDescription);
  const calendarStartDate = startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '');
  const calendarEndDate = endDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '');

  let addUrl = '';

  if (platform === 'padlet') {
    const startDay = startDate
      .replaceAll('-', '')
      .replaceAll(':', '')
      .replaceAll('.', '')
      .slice(0, -11);
    const endDayISO = addDays(endDate, 3);
    const endDay = endDayISO
      .replaceAll('-', '')
      .replaceAll(':', '')
      .replaceAll('.', '')
      .slice(0, -11);
    addUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${calendarName}&dates=${startDay}/${endDay}&details=${encodeDescription}&location=${encodedLocation}`;
  } else {
    addUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${calendarName}&dates=${calendarStartDate}/${calendarEndDate}&details=${encodeDescription}&location=${encodedLocation}`;
  }
  const shortADDurl = await shortenLink(addUrl);
  return shortADDurl;
};

/**
 * Generates a short url link by using the firebase Dynamic links API
 *
 * @see link https://firebase.google.com/docs/dynamic-links/rest for details about the firebase dynamic links API
 * It uses the rest API of firebase dynamic links to create a shortn link
 * @param link the link we want to shorten
 * @returns the shortened link
 * */
const shortenLink = async (link: string): Promise<string> => {
  const webApiKey = process.env.GOOOGLE_WEB_API_KEY;
  const data = {
    dynamicLinkInfo: {
      domainUriPrefix: 'https://proexcelencia.page.link',
      link,
    },
    suffix: {
      option: 'SHORT',
    },
  };
  const config: AxiosRequestConfig = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const response = await axios.post(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${webApiKey}`,
    data,
    config
  );

  return response.data.shortLink;
};

/**
 * it substracts the hours passed as argument to the date passed as argument
 * @param date the date to substract the hours
 * @param hours the number of hours to substract
 * @returns the Date object with the hours substracted
 */
export const subtractHours = (date: Date, hours: number): Date => {
  date.setHours(date.getHours() - hours);
  return date;
};

/**
 * it adds a specific number of `days` to a date
 * @param date the date of the event
 * @param days the number of days we want to add to the date
 * @returns the date with the days added in ISO format
 */
export const addDays = (date: string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

/**
 * it adds a specific number of `hours` to a date
 * @param date the date of the event
 * @param hours the number of hours we want to add to the date
 * @returns the date with the hours added in ISO format
 */
export const addHours = (date: Date, hours: number) => {
  const newDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
  return newDate;
};

/**
 * Substracts the specified number of months from the current date.
 * @param montsTosubstract - The number of months to substract.
 * @returns The date in ISO string format.
 */
export const substractMonths = (montsTosubstract: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - montsTosubstract);
  return date.toISOString();
};

/**
 * it formats the date passed as argument to the format needed by the calendar api
 *
 * @param date the date of the event
 * @param startingHour the start hour of the event
 * @param endHour the end hour of the event
 * @returns the date object of the start and end hour in ISO string format
 */
export const getFormatedDate = (date: string, startingHour: string, endHour?: string) => {
  let end;
  const start = new Date(date + ',' + startingHour);
  if (endHour === undefined) end = addHours(start, 2);
  else end = new Date(date + ',' + endHour);
  return [start.toISOString(), end.toISOString()]
};

/**
 * gets the google meet meeting link of an specific event
 *
 * @param eventId the id of the event we want get the meet meeting
 * @returns the meet link and its id
 */
export const getMeetEventLink = async (calendarId: string, eventId: string): Promise<string[]> => {
  const event = await Calendar.events.get({ calendarId, eventId });
  const meetLink = event.data.hangoutLink;
  return [meetLink];
};

export const getDate = () => {
  let date = new Date().toISOString();
  let search = date.indexOf(':');
  date = date.slice(0, search - 3);
  return date;
};

export const splitSpeakerValues = (value: string) => {
  const speakerValues = value.split('+/+');
  const speakerId = speakerValues[0];
  const speakerName = speakerValues[1];
  const speakerEmail = speakerValues[2];
  return { speakerId, speakerName, speakerEmail };
};

export const mapWorkshopSkill = (skill: Skill): string => {
  switch (skill) {
    case 'CITIZEN_EXERCISE':
      return 'Ejercicio Ciudadano';
    case 'ENTREPRENEURSHIP':
      return 'Emprendimiento';
    case 'ICT':
      return 'TIC';
    case 'LEADERSHIP':
      return 'Liderazgo';
    case 'SELF_MANAGEMENT':
      return 'Gerencia de si mismo';
    default:
      return 'N/A';
  }
};

export const mapModality = (skill: Modality): string => {
  switch (skill) {
    case 'HYBRID':
      return 'Híbrido';
    case 'VIRTUAL':
      return 'Virtual';
    case 'IN_PERSON':
      return 'Presencial';
    default:
      return 'N/A';
  }
};


export const formatDates = (
  datesObj: { [key: string]: string },
  startDatesObj: { [key: string]: string },
  endDatesObj: { [key: string]: string }
) => {
  const start_dates: string[] = [];
  const end_dates: string[] = [];
  Object.entries(datesObj).forEach(async ([key, value]) => {
    const [start, end] = await getFormatedDate(value, startDatesObj[key], endDatesObj[key]);
    start_dates.push(start);
    end_dates.push(end);
  });
  return { start_dates, end_dates };
};

export const sumHours = (startHours: string[], endHours: string[]) => {
  let hours: number = 0;
  startHours.forEach((startDate, index) => {
    const endDate = endHours[index];
    hours = hours + moment(endDate).diff(moment(startDate), 'minutes') / 60;
    startHours.push(startDate);
    endHours.push(endDate);
  });
  return hours;
};