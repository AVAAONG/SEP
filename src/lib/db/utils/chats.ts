'use server';
/**
 * @file chats.ts (server) - Database functions for chats
 * @author Kevin Bravo (kevinbravo.me)
 */

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

// /**
//  * Creates a chat.
//  * @param data - Chat data.
//  * @param speakerId - Speaker ID.
//  * @param dates - Dates.
//  * @param tempData - Temporary chat data.
//  * @returns Chat object.
//  */
// export const createChat = async (
//   data: Chat,
//   speakerId: string,
//   dates: Prisma.JsonArray,
//   tempData: ChatsTempData
// ) => {
//   try {
//     const chat = await prisma.chat.create({
//       data: {
//         ...data,
//         speaker: {
//           connect: {
//             id: speakerId,
//           },
//         },
//         dates: dates,
//         tempData: {
//           create: {
//             ...tempData,
//           },
//         },
//       },
//     });
//     console.log(`${chat.title} created`);
//     return chat;
//   } catch (err) {
//     console.log(`error creating chat: ${data.title}}`);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// /**
//  * Creates a chat speaker.
//  * @param data - Chat speaker data.
//  * @returns ChatSpeaker object.
//  */
// export const createChatSpeaker = async (data: ChatSpeaker) => {
//   try {
//     const speaker = await prisma.chatSpeaker.create({
//       data,
//     });
//     return speaker;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

/**
 * Converts a scholar to a speaker.
 * @param scholarId - Scholar ID.
 * @returns ChatSpeaker object.
//  */
// export const convertScholarToSpeaker = async (scholarId: string) => {
//     const scholar = await prisma.scholar.findUnique({
//         where: { id: scholarId }
//     });

//     try {
//         const speaker = await prisma.chatSpeaker.create({
//             data: {
//                 id: scholar?.id,
//                 name: scholar?.firstNames + ' ' + scholar?.lastNames,
//                 birthDate: scholar?.birthDate,
//                 email: scholar?.email,
//                 image: scholar?.image,
//                 phone: scholar?.phoneNumber,
//             }
//         });
//         console.log(`${speaker?.name} created`)
//         return speaker;
//     }

//     catch (err) {
//         console.log(err);
//         console.log(`${scholar?.firstNames} not created`)
//     }
// }

// /**
//  * Counts the number of chat speakers.
//  * @returns Number of chat speakers.
//  */
// export const countChatSpeakers = async () => {
//   const count = await prisma.chatSpeaker.count();
//   return count;
// };

// /**
//  * Gets all chat speakers.
//  * @returns Array of chat speakers.
//  */
// export const getChatSpeakers = async () => {
//   const speakers = await prisma.chatSpeaker.findMany();
//   return speakers;
// };

// /**
//  * Gets a chat speaker by ID.
//  * @param id - Speaker ID.
//  * @returns ChatSpeaker object.
//  */
// export const getChatSpeaker = async (id: string) => {
//   const speaker = await prisma.chatSpeaker.findUnique({
//     where: { id },
//     include: {
//       Chat: true,
//     },
//   });
//   return speaker;
// };

// export const deleteAllChats = async () => {
//   const chats = await prisma.chat.deleteMany({});
//   return chats;
// };

// export const deleteAllChatSpeakers = async () => {
//   const speakers = await prisma.speaker.deleteMany({});
//   return speakers;
// };

export const getChats = async () => {
  const chats = await prisma.chat.findMany({
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