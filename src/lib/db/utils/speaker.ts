'use server';
/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */
import { getServerSession } from '@/lib/auth/authOptions';
import { Chat, Prisma, Speaker } from '@prisma/client';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Get speakers with parameters
 * @param data - The data to select from the workshopSpeaker table
 * @returns The selected speakers
 */
export const getWorkshopSpeakersWithParams = async (data: Prisma.SpeakerSelect) => {

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  try {
    const speakers = await prisma.speaker.findMany({
      select: data,
      where: {
        chapter_id: chapterId,
        OR: [
          { speaker_kind: 'CHATS_AND_WORKSHOPS' },
          { speaker_kind: 'WORKSHOPS' }
        ]
      },
      orderBy: {
        first_names: 'asc'
      }
    });
    return speakers;
  } catch (e) {
  } finally {
    await prisma.$disconnect();
  }
};

export const getWorkshopSpeakerWithWorkshops = async (speakerId: string) => {
  const [speaker, workshops] = await prisma.$transaction([
    prisma.speaker.findUnique({
      where: { id: speakerId },
    }),
    prisma.workshop.findMany({
      where: {
        speaker: {
          some: { id: speakerId },
        },
      },
      include: {
        scholar_attendance: true,
      },
    }),
  ]);
  return [speaker, workshops];
};

export const getChatSpeakersWithParams = async (data: Prisma.SpeakerSelect) => {

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  try {
    const speakers = await prisma.speaker.findMany({
      select: data,

      where: {
        chapter_id: chapterId,
        OR: [
          { speaker_kind: 'CHATS_AND_WORKSHOPS' },
          { speaker_kind: 'CHATS' }
        ]
      },
    });
    return speakers;
  } catch (e) {
  } finally {
    await prisma.$disconnect();
  }
};

export const getWorkshopSpeaker = async (speakerId: string) => {
  const speaker = await prisma.speaker.findUnique({
    where: { id: speakerId },
  });
  return speaker;
};

export const getWorkshopSpeakerWorkshops = async (speakerId: string) => {
  const speaker = await prisma.speaker.findUnique({
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
  const speaker = await prisma.speaker.findUnique({
    where: { id: speakerId },
    include: {
      chats: true,
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

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  const [workshopSpeakersWomanCount, workshopSpeakerMenCount] = await prisma.$transaction([
    prisma.speaker.count({ where: { gender: 'F', speaker_kind: 'WORKSHOPS', chapter_id: chapterId } }),
    prisma.speaker.count({ where: { gender: 'M', speaker_kind: 'WORKSHOPS', chapter_id: chapterId } }),
  ]);
  return [workshopSpeakersWomanCount, workshopSpeakerMenCount];
};

export const getChatSpeakersCountByGender = async () => {

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  const [workshopSpeakersWomanCount, workshopSpeakerMenCount] = await prisma.$transaction([
    prisma.speaker.count({ where: { gender: 'F', speaker_kind: 'CHATS', chapter_id: chapterId } }),
    prisma.speaker.count({ where: { gender: 'M', speaker_kind: 'CHATS', chapter_id: chapterId } }),
  ]);
  return [workshopSpeakersWomanCount, workshopSpeakerMenCount];
};


export const getChatSpeakersWithChats = async (
  speakerId: string
): Promise<[Speaker | null, Chat[] | null]> => {
  const [speaker, chat] = await prisma.$transaction([
    prisma.speaker.findUnique({
      where: { id: speakerId },
    }),
    prisma.chat.findMany({
      where: {
        speaker: {
          some: { id: speakerId },
        },
      },
      include: {
        scholar_attendance: true,
      },
    }),
  ]);
  return [speaker, chat];
};
export const createSpeaker = async (data: Prisma.SpeakerCreateInput) => {

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  try {
    const speaker = await prisma.speaker.create({
      data: {
        ...data,
        chapter_id: chapterId
      },
    });
    return speaker;
  } catch (e) {
    console.log(e);
  }
};

export const updateSpeaker = async (speaker: Prisma.SpeakerCreateInput) => {
  try {
    await prisma.speaker.update({
      where: { id: speaker.id },
      data: {
        ...speaker,
      },
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export const setScholarAsChatSpeaker = async (scholarId: string) => {
  try {
    prisma.scholarProgramInformation.update({
      where: { scholarId: scholarId },
      data: {
        is_chat_speaker: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getChatSpeakerForStats = async () => {
  return await prisma.chat.findMany({
    include: {
      speaker: true,
      scholar_attendance: {
        include: {
          ChatSafisfactionForm: true,
        }
      }
    },
  });
}

export const getSpeakersForInput = async (kind: 'workshop' | 'chat') => {

  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  const fieldsNeeded = {
    id: true,
    first_names: true,
    last_names: true,
    email: true,
  }
  const speakerKind = kind === 'workshop' ? 'WORKSHOPS' : 'CHATS';
  try {
    const speakers = await prisma.speaker.findMany({
      select: fieldsNeeded,
      where: {
        chapter_id: chapterId,
        OR: [
          { speaker_kind: 'CHATS_AND_WORKSHOPS' },
          { speaker_kind: speakerKind }
        ]
      },
      orderBy: {
        first_names: 'asc'
      }
    });
    return speakers;
  } catch (e) {
  } finally {
    await prisma.$disconnect();
  }
}
