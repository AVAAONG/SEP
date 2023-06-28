/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { ChatSpeaker, Prisma, PrismaClient, WorkshopSpeaker } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 
 * @description get the name of all the speakers in the database 
 */

export const getSpeakerNames = async () => {
    const speakers = await prisma.workshopSpeaker.findMany({
        select: {
            name: true,
            id: true
        }
    })
    return speakers
}

// export const getSpeakers = async () => {
//     const speakers = await prisma.workshopSpeaker.findMany()
//     return speakers
// }

/**
 * get only speakers id, speakers name and speaker email
 */

export const getSpeakersIdNameEmail = async () => {
    const speakers = await prisma.workshopSpeaker.findMany({
        select: {
            name: true,
            id: true,
            email: true
        }
    })
    return speakers
}

/**
 * Get speakers with parameters
 * @param data - The data to select from the workshopSpeaker table
 * @returns The selected speakers
 */
export const getWorkshopSpeakersWithParams = async (data: Prisma.WorkshopSpeakerSelect) => {
    try {
        const speakers = await prisma.workshopSpeaker.findMany({
            select: data
        })
        return speakers
    }
    catch (e) {
        console.log(e)
    }
    finally {
        await prisma.$disconnect()
    }
}


export const getSpeakerName = async (id: string) => {
    const speaker = await prisma.workshopSpeaker.findUnique({
        where: { id },
        select: {
            name: true
        }
    })
    return speaker
}
