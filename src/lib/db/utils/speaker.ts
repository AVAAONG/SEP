/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */
import { Prisma } from '@prisma/client';
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
