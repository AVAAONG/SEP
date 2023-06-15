/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { PrismaClient, Region, Role, Scholar, ScholarStatus, User } from "@prisma/client";
import shortUUID from "short-uuid";

const prisma = new PrismaClient();

/**
 * 
 * @description get the name of all the speakers in the database 
 */

export const getSpeakerNames = async () => {
    const speakers = await prisma.workshopSpeaker.findMany()
    const speakersNamesAndId: string[] = []
    speakers.forEach(element => {
        speakersNamesAndId.push(element.name)

    });
    // const speakersNamesAndId = speakers.map(speaker => {
    //     return {
    //         id: speaker.id,
    //         name: speaker.name
    //     }
    // })
    return speakersNamesAndId
}