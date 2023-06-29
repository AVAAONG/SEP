/**
 * @file chats.ts (server) - Database functions for chats
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Chat, ChatSpeaker, ChatsTempData, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/**
 * Creates a chat.
 * @param data - Chat data.
 * @param speakerId - Speaker ID.
 * @param dates - Dates.
 * @param tempData - Temporary chat data.
 * @returns Chat object.
 */
export const createChat = async (data: Chat, speakerId: string, dates: Prisma.JsonArray, tempData: ChatsTempData) => {
    try {
        const chat = await prisma.chat.create({
            data: {
                ...data,
                speaker: {
                    connect: {
                        id: speakerId
                    }
                },
                dates: dates,
                tempData: {
                    create: {
                        ...tempData
                    }
                }
            }
        });
        console.log(`${chat.title} created`)
        return chat;
    }
    catch (err) {
        console.log(`error creating chat: ${data.title}}`);
    }
    finally {
        await prisma.$disconnect();
    }
}

/**
 * Creates a chat speaker.
 * @param data - Chat speaker data.
 * @returns ChatSpeaker object.
 */
export const createChatSpeaker = async (data: ChatSpeaker) => {
    try {
        const speaker = await prisma.chatSpeaker.create({
            data
        });
        return speaker;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect();
    }
}

/**
 * Converts a scholar to a speaker.
 * @param scholarId - Scholar ID.
 * @returns ChatSpeaker object.
 */
export const convertScholarToSpeaker = async (scholarId: string) => {
    const scholar = await prisma.scholar.findUnique({
        where: { id: scholarId }
    });

    try {
        const speaker = await prisma.chatSpeaker.create({
            data: {
                id: scholar?.id,
                name: scholar?.firstNames + ' ' + scholar?.lastNames,
                birthDate: scholar?.birthDate,
                email: scholar?.email,
                image: scholar?.image,
                phone: scholar?.phoneNumber,
            }
        });
        console.log(`${speaker?.name} created`)
        return speaker;
    }

    catch (err) {
        console.log(err);
        console.log(`${scholar?.firstNames} not created`)
    }
}



/**
 * Counts the number of chat speakers.
 * @returns Number of chat speakers.
 */
export const countChatSpeakers = async () => {
    const count = await prisma.chatSpeaker.count();
    return count;
}

/**
 * Gets all chat speakers.
 * @returns Array of chat speakers.
 */
export const getChatSpeakers = async () => {
    const speakers = await prisma.chatSpeaker.findMany();
    return speakers;
}

/**
 * Gets a chat speaker by ID.
 * @param id - Speaker ID.
 * @returns ChatSpeaker object.
 */
export const getChatSpeaker = async (id: string) => {
    const speaker = await prisma.chatSpeaker.findUnique({
        where: { id },
        include:{
            Chat: true
        }
    });
    return speaker;
}




/**
 * Gets all chats.
 * @returns Array of chats.
 */
export const getChats = async () => {
    const chats = await prisma.chat.findMany({
        include: {
            speaker: true
        }
    });
    return chats;
}

/**
 * Gets a chat by ID.
 * @param id - Chat ID.
 * @returns Chat object.
 */
export const getChat = async (id: string) => {
    const chat = await prisma.chat.findUnique({
        where: { id },
        include: {
            speaker: true
        }
    });
    return chat;
}







export const getChatsCount = async () => {
    const chats = await prisma.chat.count({
        where: {
            activityStatus: 'REALIZADO'
        }
    });
    return chats;
}

export const deleteAllChats = async () => {
    const chats = await prisma.chat.deleteMany({});
    return chats;
}

export const deleteAllChatSpeakers = async () => {
    const speakers = await prisma.chatSpeaker.deleteMany({});
    return speakers;
}