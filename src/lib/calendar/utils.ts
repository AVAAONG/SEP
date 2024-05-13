'use server';
/**
 * @file This file contains utils functions related to calendar, such as creating the event object, the event description, the event link, etc.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Skill } from '@prisma/client';
import { Calendar } from '../googleAPI/auth';

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
 * gets the google meet meeting link of an specific event
 *
 * @param eventId the id of the event we want get the meet meeting
 * @returns the meet link and its id
 */
export const getMeetEventLink = async (calendarId: string, eventId: string) => {
  console.log('froom google meet');
  const event = await Calendar.events.get({ calendarId, eventId });
  const meetingLink = event.data.hangoutLink;
  const meetingId = event.data.hangoutLink?.split('/')[3];
  console.log(meetingLink, meetingId);
  return { meetingLink, meetingId };
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

