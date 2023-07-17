import { Prisma, PrismaClient, Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import shortUUID from 'short-uuid';
const prisma = new PrismaClient();
export const createWorkshop = async (data: Workshop, dates: Prisma.JsonArray, speakerId: string, tempData?: WorkshopTempData) => {
    try {
        const workshop = await prisma.workshop.create({
            data: {
                ...data,
                dates,
                speaker: {
                    connect: {
                        id: speakerId
                    }
                },
                tempData: {
                    create: tempData
                },
                activityStatus: 'AGENDADO'
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

export const deleteWorkshopFromDatabase = async (id: shortUUID.SUUID) => {
    const workshop = await prisma.workshop.delete({
        where: { id }
    });
}

export const getWorkshop = async (id: shortUUID.SUUID) => {
    const workshop = await prisma.workshop.findUnique({
        where: { id },
        include: {
            speaker: true
        }
    });
    return workshop;
}

export const getWorkshops = async () => {
    const workshops = await prisma.workshop.findMany({
        include: {
            speaker: true,
            tempData: true,
        }
    });
    return workshops;
}



export const getWorkshopsByScholar = async (scholarId: string) => {
    const workshops = await prisma.user.findUnique({
        where: { id: scholarId },
        include: {
            scholar:
            {
                select: {
                    attendedWorkshpos: true
                }
            }
        }
    });
    return workshops;
}


export const getWorkshopsByScholar2 = async (userId: string) => {

    try{
        const scholarId = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                scholar: {
                    select: {
                        id: true
    
                    }
                }
            }
        })
        const workshops = await prisma.workshop.findMany({
            where: {
                scholarAttendance: {
                    some: {
                        scholarId: scholarId?.scholar?.id,
                    }
                },
            },
            include: {
                speaker: true,
                scholarAttendance: {
                    where: {
                        scholarId: scholarId?.scholar?.id,
                    },
                    select: {
                        attendance: true,
                        
                    }
                }
            }
        })
        return workshops;
    }
    catch(err){
        console.log(err);
    }
    finally{
        await prisma.$disconnect();
    }
 
}


export const createWorkshopSpeaker = async (data: WorkshopSpeaker) => {
    await prisma.workshopSpeaker.create({
        data
    })
}


export const getWorkshopsCount = async (): Promise<number> => {
    return await prisma.workshop.count({
        where: {
            activityStatus: 'REALIZADO'
        }
    });
}


export const getScheduledWorkshops = async () => {
    const workshops = await prisma.workshop.findMany({
        include: {
            speaker: true,
            tempData: true,
        },
        where: {
            activityStatus: 'AGENDADO'
        }
    });
    return workshops;
}