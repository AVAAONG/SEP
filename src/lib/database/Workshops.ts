import { PrismaClient, Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import shortUUID from 'short-uuid';

const prisma = new PrismaClient();

export const createWorkshop = async (data: Workshop, dates: WorkshopDates, speakerId: string, tempData: WorkshopTempData) => {
    try {
        const workshop = await prisma.workshop.create({
            data: {
                ...data,
                dates: {
                    create: [
                        dates
                    ]
                },
                speaker: {
                    connect: {
                        id: speakerId
                    }
                },
                tempData: {
                    create: tempData
                }
            }
        });
        console.log(`${workshop.title} created`)
        return workshop;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect();
    }
}


const updateWorkshop = async (id: shortUUID.SUUID, data: Workshop) => {
    const workshop = await prisma.workshop.update({
        where: { id },
        data
    });
}

const deleteWorkshop = async (id: shortUUID.SUUID) => {
    const workshop = await prisma.workshop.delete({
        where: { id }
    });
}

const getWorkshop = async (id: shortUUID.SUUID) => {
    const workshop = await prisma.workshop.findUnique({
        where: { id }
    });
    return workshop;
}

const getWorkshops = async () => {
    const workshops = await prisma.workshop.findMany();
    return workshops;
}



export const createWorkshopSpeaker = async (data: WorkshopSpeaker) => {
    await prisma.workshopSpeaker.create({
        data
    })
}


export const getWorkshopsCount = async (): Promise<number> => {
    return await prisma.workshop.count();
}

