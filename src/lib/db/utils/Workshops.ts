'use server';

/**
 * Module for creating and updating workshops.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { ActivityStatus, Chat, Prisma, ScholarAttendance, Speaker, Volunteer, Workshop } from '@prisma/client';
import shortUUID from 'short-uuid';
import { prisma } from './prisma';


export const getWorkshopsByScholar = async (scholarId: string) => {
  const workshops = await prisma.scholar.findUniqueOrThrow({
    where: {
      id: scholarId,
    },
    select: {
      program_information: {
        include: {
          attended_workshops: true,
        }
      },
    },
  });
  return workshops;
}

/**
 * Gets the number of workshops with the specified activity status.
 * @param status - The activity status to filter by.
 * @returns The number of workshops.
 *
 * @example
 * const scheduledWorkshopsCount = await getWorkshopsCountByStatus('SCHEDULED');
 * console.log(scheduledWorkshopsCount); // 5
 */
export const getWorkshopsCountByStatus = async (status: ActivityStatus): Promise<number> => {
  try {
    const count = await prisma.workshop.count({
      where: {
        activity_status: status,
      },
    });
    return count;
  } catch (error) {
    console.error(`Error getting workshops count: ${error}`);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Gets the total number of workshops in the database.
 * @returns The number of workshops.
 *
 * @example
 * const workshopsCount = await getWorkshopsCount();
 * console.log(workshopsCount); // 10
 */
export const getWorkshopsCount = async (): Promise<number> => {
  try {
    const count = await prisma.workshop.count();
    return count;
  } catch (error) {
    console.error(`Error getting workshops count: ${error}`);
    return 0;
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

export const changeScholarAttendance = async (
  workshopAttendanceId: string,
  attendance: ScholarAttendance
) => {
  await prisma.workshopAttendance.update({
    where: {
      id: workshopAttendanceId,
    },
    data: {
      attendance: attendance,
    }
  })
}

export const enrrrollScholarToWorkshop = async (
  workshopId: string,
  scholarId: string,
) => {
  await prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId,
        },
      },
      attendance: 'ENROLLED',
      scholar: {
        connect: {
          id: scholarId,
        },
      },
    },
  });
}


export const getWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      speaker: true,
      scholar_attendance: true,
    },
  });
  return workshops;
};

export const getWorkshopByStatus = async (status: ActivityStatus) => {
  const workshops = await prisma.workshop.findMany({
    where: {
      activity_status: status,
    },
    include: {
      speaker: true,
    },
  });
  return workshops;
};

export const getAllActivities = async (): Promise<[Workshop[], Chat[], Volunteer[]]> => {
  const [workshops, chats, volunteer] = await prisma.$transaction([
    prisma.workshop.findMany(),
    prisma.chat.findMany(),
    prisma.volunteer.findMany(),
  ]);
  return [workshops, chats, volunteer];
}
export const getActivitiesByStatus = async (status: ActivityStatus): Promise<[Workshop[], Chat[], Volunteer[]]> => {
  const [workshops, chats, volunteer] = await prisma.$transaction([
    prisma.workshop.findMany({
      where: {
        activity_status: status,
      }
    }),
    prisma.chat.findMany({
      where: {
        activity_status: status,
      }
    }),
    prisma.volunteer.findMany(),
  ]);
  return [workshops, chats, volunteer];
}

export const getActivitiesByYear = async (year: number): Promise<[Workshop[], Chat[], Volunteer[]]> => {
  const [allWorkshops, allChats, allVolunteers] = await prisma.$transaction([
    prisma.workshop.findMany(),
    prisma.chat.findMany(),
    prisma.volunteer.findMany(),
  ]);

  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);

  const workshops = allWorkshops.filter(workshop => workshop.start_dates.some(date => date >= yearStart && date <= yearEnd));
  const chats = allChats.filter(chat => chat.start_dates.some(date => date >= yearStart && date <= yearEnd));
  const volunteers = allVolunteers.filter(volunteer => volunteer.start_dates.some(date => date >= yearStart && date <= yearEnd));

  return [workshops, chats, volunteers];
}


// export const getWorkshopsByScholar = async (scholarId: string) => {
//   const workshops = await prisma.user.findUnique({
//     where: { id: scholarId },
//     include: {
//       scholar: {
//         select: {
//           attendedWorkshpos: true,
//         },
//       },
//     },
//   });
//   return workshops;
// };

// export const getWorkshopsByScholar2 = async (userId: string) => {
//   try {
//     const scholarId = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         scholar: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     });
//     const workshops = await prisma.workshop.findMany({
//       where: {
//         scholarAttendance: {
//           some: {
//             scholarId: scholarId?.scholar?.id,
//           },
//         },
//       },
//       include: {
//         speaker: true,
//         scholarAttendance: {
//           where: {
//             scholarId: scholarId?.scholar?.id,
//           },
//           select: {
//             attendance: true,
//           },
//         },
//       },
//     });
//     return workshops;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await prisma.$disconnect();
//   }

// };

export const getScholarEnrolledActivities = async (scholarId: string) => {
  const activities = await prisma.scholar.findUnique({
    where: {
      id: scholarId,
    },
    select: {
      program_information: {
        include: {
          attended_workshops: true,
        }
      },
    },
  });
  return activities;
}

export const getWorkshop = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: {
      speaker: true,
      scholar_attendance: {
        include: {
          scholar: {
            include: {
              scholar: {
                include: {
                  collage_information: true,
                }
              },
            }
          },
        },
      },
    },
  });
  return workshop;
};

export const createWorkshopSpeaker = async (data: Speaker) => {
  try {
    await prisma.speaker.create({
      data,
    });

  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteWorkshopSpeakers = async () => {
  try {
    await prisma.speaker.deleteMany({});
    console.log('\x1b[32m%s\x1b[0m', `Speakers deleted successfully`);
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  } finally {
    await prisma.$disconnect();
  }
};

export const getScheduledWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      speaker: true,
    },
    where: {
      activity_status: 'SCHEDULED',
    },
    orderBy: {
      start_dates: 'asc',
    }

  });
  return workshops;
};

export const getWorkhsopsByScholar = async (scholarId: string) => {
  const chats = await prisma.workshop.findMany({
    where: {
      scholar_attendance: {
        some: {
          scholar: {
            scholarId: scholarId,
          }
        },
      },
    },
    include: {
      speaker: true,
      scholar_attendance: {
        where: {
          scholar: {
            scholarId: scholarId,
          }
        },
      },
    },
  });
  return chats;
}

export const getChatsByScholar = async (scholarId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        {
          scholar_attendance: {
            some: {
              scholar: {
                scholarId: scholarId,
              }
            },
          },
        },
        {
          speaker: {
            some: {
              id: scholarId,
            }
          }
        }

      ]
    },
    include: {
      speaker: true,
      scholar_attendance: {
        where: {
          scholar: {
            scholarId: scholarId,
          }
        },
      },
    },
  });
  return chats;
}


export const getWorkshopsByScholar2 = async (scholarProgramInformationId: string) => {
  const workshops = await prisma.workshopAttendance.findMany({
    where: {
      program_information_scholar_id: scholarProgramInformationId,
    },
    include: {
      workshop: true,
    },
  })
  return workshops;
}


export const addAttendaceToScholar = async (
  workshopId: string,
  scholarId: string,
  attendance: ScholarAttendance,
) => {
  await prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId,
        },
      },
      scholar: {
        connect: {
          id: scholarId
        },
      },
      attendance: attendance as ScholarAttendance,
    },
  });
};

export const createWorkshop = async (workshop: Prisma.WorkshopCreateArgs) => {
  const createdWorkshop = await prisma.workshop.create(workshop);
  return createdWorkshop;
}

export const sendWorkshopsToScholar = async (workshopId: string) => {
  await prisma.workshop.update({
    where: {
      id: workshopId,
    },
    data: {
      activity_status: 'SENT',
    }
  })
}


export const editWorkshop = async (workshop: Prisma.WorkshopUpdateArgs) => {
  const editedworkshop = await prisma.workshop.update(workshop);
  return editedworkshop;
}


export const deleteWorkshopFromDatabase = async (id: string) => {
  try {
    const workshop = await prisma.workshop.delete({
      where: {
        id: id,
      },
      include: {
        scholar_attendance: true,
      },
    });
    return workshop;
  } catch (error) {
    console.error(`Error deleting workshop: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

export const changeWorkshopStatus = async (id: string, status: ActivityStatus) => {
  const workshop = await prisma.workshop.update({
    where: {
      id: id,
    },
    data: {
      activity_status: status,
    },
  });
  return workshop;
}