import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createWorkshop = async (data: any) => {
  const workshop = await prisma.workshop.create({
    data: {
      title: data.title,
      Date: data.Date,
      speaker: data.speaker,
      spots: data.spots,
      takenSpots: data.takenSpots,
      platform: data.platform,
      modality: data.modality,
      status: data.status,
      pensum: data.pensum,
    },
  });
};

const updateWorkshop = async (data: any) => {
  const workshop = await prisma.workshop.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      Date: data.Date,
      speaker: data.speaker,
      spots: data.spots,
      takenSpots: data.takenSpots,
      platform: data.platform,
      modality: data.modality,
      status: data.status,
      pensum: data.pensum,
    },
  });
};

const deleteWorkshop = async (data: any) => {
  const workshop = await prisma.workshop.delete({
    where: {
      id: data.id,
    },
  });
};

const getWorkshop = async (data: any) => {
  const workshop = await prisma.workshop.findUnique({
    where: {
      id: data.id,
    },
  });
  return workshop;
};

const getWorkshops = async () => {
  const workshops = await prisma.workshop.findMany();
  return workshops;
};

export async function POST() {}
