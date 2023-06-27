/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { PrismaClient, WorkshopSpeaker } from "@prisma/client";

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

export const getSpeakers = async () => {
    const speakers = await prisma.workshopSpeaker.findMany()
    return speakers
}

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
