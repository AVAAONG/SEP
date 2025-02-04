'use server';
/**
 * @file chats.ts (server) - Database functions for chats
 * @author Kevin Bravo (kevinbravo.me)
 */

import { getServerSession } from '@/lib/auth/authOptions';
import { ActivityStatus, Prisma } from '@prisma/client';
import shortUUID from 'short-uuid';
import { prisma } from './prisma';

/**
 * Gets the number of chats with the specified activity status.
 * @param status - The activity status to filter by.
 * @returns The number of chats.
 *
 * @example
 * const scheduledChatsCount = await getChatsCountByStatus('SCHEDULED');
 * console.log(scheduledchatsCount); // 5
 */
export const getChatsCountByStatus = async (status: ActivityStatus): Promise<number> => {
  try {
    const count = await prisma.workshop.count({
      where: {
        activity_status: status,
      },
    });
    return count;
  } catch (error) {
    console.error(`Error getting chats count: ${error}`);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteChatFromDatabase = async (id: string) => {
  try {
    const chat = await prisma.chat.delete({
      where: {
        id: id,
      },
      include: {
        scholar_attendance: true,
      },
    });
    return chat;
  } catch (error) {
    console.error(`Error deleting chat: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Gets the total number of chats in the database.
 * @returns The number of chats.
 *
 * @example
 * const chatsCount = await getChatsCount();
 * console.log(chatsCount); // 10
 */
export const getChatsCount = async (): Promise<number> => {
  try {
    const count = await prisma.workshop.count();
    return count;
  } catch (error) {
    console.error(`Error getting chats count: ${error}`);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};


export const getChats = async () => {
  const session = await getServerSession();

  const chapterId = session?.chapterId;
  const chats = await prisma.chat.findMany({
    where: {
      chapterId: chapterId
    },
    include: {
      speaker: true,
      scholar_attendance: true,
    },
    orderBy: {
      start_dates: 'asc',
    },
  });
  return chats;
};

/**
 * Get speakers with parameters
 * @param data - The data to select from the workshopSpeaker table
 * @returns The selected speakers
 */
export const getChatSpeakerWithParams = async (data: Prisma.SpeakerSelect) => {
  try {
    const speakers = await prisma.speaker.findMany({
      select: data,
      where: {
        OR: [
          {
            speaker_kind: 'CHATS',
          },
          {
            speaker_kind: 'CHATS_AND_WORKSHOPS',
          },
        ],
      },
    });
    return speakers;
  } catch (e) {
  } finally {
    await prisma.$disconnect();
  }
};



export const getChat = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.chat.findUnique({
    where: { id },
    include: {
      speaker: true,
      scholar_attendance: {
        include: {
          ChatSafisfactionForm: true,
          scholar: {
            include: {
              scholar: true,
            },
          },
        },
      },
    },
  });
  return workshop;
};

export const getChatsByScholar = async (programInformationId: string, scholarId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        {
          scholar_attendance: {
            some: {
              program_information_scholar_id: programInformationId,
            },
          },
        },
        { speaker: { some: { id: scholarId } } },
      ],
    },
    include: {
      scholar_attendance: {
        where: {
          program_information_scholar_id: programInformationId,
        },
      },
      speaker: {
        where: {
          id: scholarId,
        },
      },
    },
  });
  return chats;
};

export const getScheduleChats = async () => {
  const chats = await prisma.chat.findMany({
    where: {
      activity_status: 'SCHEDULED',
    },
    orderBy: {
      start_dates: 'asc',
    },
    include: {
      speaker: true,
    },
  });
  return chats;
};



export const getScheduleChatsByScholar = async (scholarId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      AND:
        [
          {
            activity_status: 'SCHEDULED',
          },
          {
            speaker: {
              some: {
                id: scholarId
              }
            }
          }
        ]
    },
    orderBy: {
      start_dates: 'asc',
    },
    include: {
      speaker: true,
    },
  });
  return chats;
};

export const createChat = async (chat: Prisma.ChatCreateArgs) => {
  const createdChat = await prisma.chat.create(chat);
  return createdChat;
};

export const editChat = async (chat: Prisma.ChatUpdateArgs) => {
  const editedChat = await prisma.chat.update(chat);
  return editedChat;
};

export const changeChatStatus = async (id: string, status: ActivityStatus) => {
  const chat = await prisma.chat.update({
    where: {
      id: id,
    },
    data: {
      activity_status: status,
    },
  });
  return chat;
};


export const changeChatStatusInBulk = async (ids: string[], status: ActivityStatus) => {
  const chats = await prisma.chat.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      activity_status: status,
    },
  });
  return chats;
};

export const updateChat = async (chatId: string, chat: Prisma.ChatCreateArgs) => {
  const createdVolunteer = await prisma.chat.update({
    where: {
      id: chatId
    },
    ...chat
  });
  return createdVolunteer;
};



export const deleteChat = async (chatId: string) => {
  await prisma.chatAttendance.deleteMany({
    where:
    {
      chat_id: chatId
    }
  })
  await prisma.chat.delete({
    where: {
      id: chatId
    },
  })
}