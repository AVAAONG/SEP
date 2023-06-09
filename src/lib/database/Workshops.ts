import { PrismaClient, Workshop, WorkshopDates } from '@prisma/client';
import shortUUID from 'short-uuid';

const prisma = new PrismaClient();

const createWorkshop = async (data: Workshop) => {
    const workshop = await prisma.workshop.create({
        data
    });
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

const createWorkshopDates = async (data: WorkshopDates) => {
    const workshopDates = await prisma.workshopDates.create({
        data
    });

    return workshopDates;
}