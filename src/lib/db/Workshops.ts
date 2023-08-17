import { Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import shortUUID from 'short-uuid';
import { prisma } from './prisma';

export const createWorkshop = async (
  data: Workshop,
  speakerId: string,
  tempData?: WorkshopTempData
) => {
  try {
    const workshop = await prisma.workshop.create({
      data: {
        ...data,
        speaker: {
          connect: {
            id: speakerId,
          },
        },
        temp_data: {
          create: tempData,
        },
      },
    });
    console.log(`${workshop.title} created`);
    return workshop;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

const updateWorkshop = async (id: shortUUID.SUUID, data: Workshop) => {
  const workshop = await prisma.workshop.update({
    where: { id },
    data,
  });
};

export const deleteWorkshopFromDatabase = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.workshop.delete({
    where: { id },
  });
};

export const getWorkshop = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: {
      speaker: true,
    },
  });
  return workshop;
};

export const getWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      speaker: true,
      tempData: true,
    },
  });
  return workshops;
};

export const getWorkshopsByScholar = async (scholarId: string) => {
  const workshops = await prisma.user.findUnique({
    where: { id: scholarId },
    include: {
      scholar: {
        select: {
          attendedWorkshpos: true,
        },
      },
    },
  });
  return workshops;
};

export const getWorkshopsByScholar2 = async (userId: string) => {
  try {
    const scholarId = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        scholar: {
          select: {
            id: true,
          },
        },
      },
    });
    const workshops = await prisma.workshop.findMany({
      where: {
        scholarAttendance: {
          some: {
            scholarId: scholarId?.scholar?.id,
          },
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
          },
        },
      },
    });
    return workshops;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

export const createWorkshopSpeaker = async (data: WorkshopSpeaker) => {
  console.log('\x1b[36m%s\x1b[0m', `Creating speaker ${data.first_names} ${data.last_names}`);
  try {
    await prisma.workshopSpeaker.create({
      data,
    });
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Speaker ${data.first_names} ${data.last_names}, created successfully`
    );
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteWorkshopSpeakers = async () => {
  try {
    await prisma.workshopSpeaker.deleteMany({});
    console.log('\x1b[32m%s\x1b[0m', `Speakers deleted successfully`);
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  } finally {
    await prisma.$disconnect();
  }
};

export const getWorkshopsCount = async (): Promise<number> => {
  return await prisma.workshop.count({
    where: {
      activityStatus: 'REALIZADO',
    },
  });
};

export const getScheduledWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      speaker: true,
      temp_data: true,
    },
    where: {
      activity_status: 'SCHEDULED',
    },
  });
  return workshops;
};
