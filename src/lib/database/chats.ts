import { PrismaClient, Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import shortUUID from 'short-uuid';

const prisma = new PrismaClient();

export const createChat = async (data) => {
    try {
        const workshop = await prisma.chat.create({
            data: {
                ...data,
                dates: {
                    create: [
                        dates
                    ]
                },
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