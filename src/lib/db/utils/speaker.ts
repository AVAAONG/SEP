/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */
import { Prisma, Workshop, WorkshopSpeaker } from '@prisma/client';
import { prisma } from './prisma';
/**
 * Get speakers with parameters
 * @param data - The data to select from the workshopSpeaker table
 * @returns The selected speakers
 */
export const getWorkshopSpeakersWithParams = async (data: Prisma.WorkshopSpeakerSelect) => {
  try {
    const speakers = await prisma.workshopSpeaker.findMany({
      select: data,
    });
    console.log(speakers);
    return speakers;
  } catch (e) {
  } finally {
    await prisma.$disconnect();
  }
};

export const getWorkshopSpeaker = async (speakerId: string) => {
  const speaker = await prisma.workshopSpeaker.findUnique({
    where: { id: speakerId },
  });
  return speaker;
};

export const getWorkshopSpeakerWorkshops = async (speakerId: string) => {
  const speaker = await prisma.workshopSpeaker.findUnique({
    where: { id: speakerId },
    include: {
      workshops: true,
    },
  });
  return speaker;
};



/**
 * get all the information of a chat speaker and the chatrooms he is in
 */
export const getChatSpeaker = async (speakerId: string) => {
  const speaker = await prisma.chatSpeaker.findUnique({
    where: { id: speakerId },
    include: {
      chat: true,
    },
  });
  return speaker;
};

/**
 * Retrieves the count of workshop speakers by gender.
 * @returns An array containing the count of female and male workshop speakers.
 * @example
 * const [workshopSpeakersWomanCount, workshopSpeakerMenCount] = await getSpeakerCountByGender();
 * console.log(workshopSpeakersWomanCount, workshopSpeakerMenCount); // 2(women speakers) 3(male speakers)
 */
export const getWorkshopSpeakersCountByGender = async () => {
  const [workshopSpeakersWomanCount, workshopSpeakerMenCount] = await prisma.$transaction([
    prisma.workshopSpeaker.count({ where: { gender: 'F' } }),
    prisma.workshopSpeaker.count({ where: { gender: 'M' } }),
  ])
  return [workshopSpeakersWomanCount, workshopSpeakerMenCount];
}

export const getWorkshopSpeakerWithWorkshops = async (speakerId: string): Promise<[WorkshopSpeaker | null, Workshop[] | null]> => {
  const [speaker, workshops] = await prisma.$transaction([
    prisma.workshopSpeaker.findUnique({
      where: { id: speakerId },
    }),
    prisma.workshop.findMany({
      where: {
        speaker: {
          some: { id: speakerId },
        }
      },
      include: {
        scholar_attendance: true,
      }
    }),
  ]);
  return [speaker, workshops];
};