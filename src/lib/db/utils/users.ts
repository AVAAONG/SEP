'use server';
/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Prisma, Probation, ScholarCondition, User, WorkshopAttendance } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import shortUUID from 'short-uuid';
import { prisma } from './prisma';
/**
 * @description Create a new user in the database
 * @param data User data
 * @returns The user created
 * @throws Error if the user already exists
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#create
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#unique-constraints
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#error-handling
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#unique-constraints
 *
 * @example
 * ```ts
 * const user = await createUser({
 *    email: "
 * })
 * ```
 */
export const createUser = async (data: User): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

/**
 * Delete all scholars from the database
 * @param dat
 * @returns
 */

const createScholarAttendance = async (
  data: WorkshopAttendance
): Promise<WorkshopAttendance | null> => {
  try {
    const scholarAttendance = await prisma.workshopAttendance.create({
      data,
    });
    return scholarAttendance;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * @description Find a user by email
 * @param email User email
 * @returns The user found
 * @throws Error if the user does not exist
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#findunique
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#error-handling
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#unique-constraints
 *
 * @example
 * ```ts
 * const user = await findUserByEmail("
 * ```
 */
export const findUserByEmail = async (where: any): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where,
  });
  return user;
};

/**
 * @description update specific user data
 * @param id User id
 * @param data User data to update
 *
 * @abstract  The function then uses the prisma.user.update method to update the user’s information in the database.
 *   The where parameter specifies which user to update based on their ID,
 *   and the data parameter contains the new values for the fields you want to update.
 * @returns The user updated
 * @throws Error if the user does not exist
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#error-handling
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/validation#unique-constraints
 *
 * @example
 * ```ts
 * const user = await updateUser("
 * ```
 *
 */
export const updateUser = async (id: shortUUID.SUUID, data: User): Promise<User> => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

/**
 * @description Gets all users
 * @returns All users
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#findmany
 *
 * @example
 * ```ts
 * const users = await getUsers()
 * ```
 *
 */
export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Gets all scholars with all associated data
 *
 * @returns An array of scholars with all associated data
 */
export const getScholarsWithAllData = async () => {
  const scholar = await prisma.scholar.findMany({
    where: {
      program_information: {
        scholar_condition: {
          equals: 'ACTIVE',
        },
        chapter: {
          id: {
            equals: 'Rokk6_XCAJAg45heOEzYb',
          },
        },
      },
    },
    include: {
      collage_information: {
        include: {
          collage_period: true,
        },
      },
      cva_information: {
        include: {
          modules: true,
        },
      },
      program_information: {
        include: {
          attended_chats: {
            include: {
              chat: true,
            },
          },
          attended_workshops: {
            include: {
              workshop: true,
            },
          },
          chapter: true,
        },
      },
    },
  });

  return scholar;
};

export const getScholars = async () => {
  const scholars = await prisma.scholar.findMany({
    where: {
      program_information: {
        scholar_condition: {
          equals: 'ACTIVE',
        },
      },
    },
    include: {
      collage_information: true,
      program_information: true,
    },
  });
  return scholars;
};

/**
 * Returns the count of users that match the given ScholarCondition.
 * @param condition The ScholarCondition object used to filter the users based on their program information.
 * @returns A Promise that resolves to the count of users that match the condition.
 */
export const getScholarsCountByCondition = async (
  condition: ScholarCondition,
  chaptherId: string
) => {
  const scholars = await prisma.scholar.count({
    where: {
      program_information: {
        scholar_condition: condition,
        chapter_id: chaptherId,
      },
    },
  });
  return scholars;
};

export const getScholarcountByGender = async () => {
  const [womenScholars, menScholars] = await prisma.$transaction([
    prisma.scholar.count({
      where: {
        gender: 'F',
        program_information: { scholar_condition: 'ACTIVE', chapter_id: 'Rokk6_XCAJAg45heOEzYb' },
      },
    }),
    prisma.scholar.count({
      where: {
        gender: 'M',
        program_information: { scholar_condition: 'ACTIVE', chapter_id: 'Rokk6_XCAJAg45heOEzYb' },
      },
    }),
  ]);
  return [womenScholars, menScholars];
};

export const getScholarWithAllData = async (scholar_id: string) => {
  const scholar = await prisma.scholar.findUnique({
    where: {
      id: scholar_id,
    },
    include: {
      collage_information: {
        include: {
          collage_period: true,
        },
      },
      cva_information: {
        include: {
          modules: true,
        },
      },
      program_information: {
        include: {
          attended_chats: {
            include: {
              chat: {
                include: {
                  scholar_attendance: {
                    include: {
                      chat: true,
                    },
                  },
                },
              },
            },
          },
          probation: true,
          attended_workshops: {
            include: {
              workshop: {
                include: {
                  scholar_attendance: {
                    include: {
                      workshop: true,
                    },
                  },
                  speaker: true,
                },
              },
            },
          },
          chapter: true,
        },
      },
    },
  });

  return scholar;
};

export const getUser = async (id: shortUUID.SUUID): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const getScholarByEmail = async (email: string) => {
  const scholar = await prisma.scholar.findUnique({
    where: { email },
  });
  return scholar;
};

export const getScholarDoneActivitiesCount = async (scholar_id: string, year: number) => {
  const [allWorkshops, allChats] = await prisma.$transaction([
    prisma.workshopAttendance.findMany({
      where: {
        AND: [
          {
            scholar: {
              scholarId: scholar_id,
            },
          },
          {
            attendance: 'ATTENDED',
          },
          {
            workshop: {
              activity_status: 'ATTENDANCE_CHECKED',
            },
          },
        ],
      },
      include: {
        workshop: {
          select: {
            start_dates: true
          }
        }
      }
    }),
    prisma.chat.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                scholar_attendance: {
                  some: {
                    scholar: {
                      scholarId: scholar_id,
                    },
                  },
                },
              },
              {
                scholar_attendance: {
                  some: {
                    attendance: 'ATTENDED',
                  },
                },
              },
              {
                activity_status: 'ATTENDANCE_CHECKED',
              },
            ],
          },
          {
            speaker: {
              some: {
                id: scholar_id,
              },
            },
          },
        ],
      },
    }),
  ]);

  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);

  const workshops = allWorkshops.filter((workshop) =>
    workshop.workshop.start_dates.some((date) => date >= yearStart && date <= yearEnd)
  ).length;
  const chats = allChats.filter((chat) =>
    chat.start_dates.some((date) => date >= yearStart && date <= yearEnd)
  ).length;
  // const volunteers = allVolunteers.filter((volunteer) =>
  //   volunteer.start_dates.some((date) => date >= yearStart && date <= yearEnd)
  // );

  return [workshops, chats];
};

export const getActivitiesWhenScholarItsEnrolled = async (scholar_id: string) => {
  const [workshops, chats] = await prisma.$transaction([
    prisma.workshop.findMany({
      where: {
        AND: [
          {
            scholar_attendance: {
              some: {
                scholar: {
                  scholarId: scholar_id,
                },
              },
            },
          },
          {
            scholar_attendance: {
              some: {
                attendance: 'ENROLLED',
              },
              none: {
                attendance: 'CANCELLED'
              },
            },
          },
          {
            activity_status: 'SENT',
          },
        ],
      },
    }),
    prisma.chat.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                scholar_attendance: {
                  some: {
                    scholar: {
                      scholarId: scholar_id,
                    },
                  },
                },
              },
              {
                scholar_attendance: {
                  some: {
                    attendance: 'ENROLLED',
                  },
                  none: {
                    attendance: 'CANCELLED'
                  }
                },

              },
              {
                activity_status: 'SENT',
              },
            ],
          },
          {
            AND: [
              {
                speaker: {
                  some: {
                    id: scholar_id,
                  },
                },
              },
              {
                activity_status: 'SENT',
              },
            ],
          },
        ],
      },
    }),
  ]);
  return [chats, workshops];
};

export const setProbationToScholar = async (scholarId: string, data: Probation) => {
  await prisma.scholar.update({
    where: {
      id: scholarId,
    },
    data: {
      program_information: {
        update: {
          scholar_status: data.kind_of_probation,
          probation: {
            create: {
              kind_of_probation: data.kind_of_probation,
              starting_date: data.starting_date,
              ending_date: data.ending_date,
              done_at_the_moment: data.done_at_the_moment as Prisma.InputJsonValue,
              agreement: data.agreement,
              next_meeting: data.next_meeting,
              probation_reason: data.probation_reason,
              observations: data.observations,
            },
          },
        },
      },
    },
  });
};

export const getScholarsInProbationByYear = async (year: string) => {
  const scholars = await prisma.scholar.findMany({
    where: {
      program_information: {
        OR: [
          {
            scholar_status: 'PROBATION_I',
          },
          {
            scholar_status: 'PROBATION_II',
          },
        ],
        probation: {
          every: {
            starting_date: {
              gte: new Date(`${year}-01-01`),
              lte: new Date(`${year}-12-31`),
            },
          },
        },
      },
    },
    include: {
      collage_information: true,
      program_information: {
        include: {
          probation: {
            orderBy: {
              starting_date: 'desc',
            },
            take: 1,
          },
        },
        // probation: true
      },
      cva_information: true,
    },
  });
  return scholars;
};

export type ScholarsInProbationByYearReturnType = Prisma.PromiseReturnType<
  typeof getScholarsInProbationByYear
>;



//ponemos el status de cancelado
// le damos el cupo a la otra persona con el estatus de enrrolled
// enviamos un correo de confirmacion.


export const ceaseSpotInWorkshop = async (attendanceId: string, scholarId: string, activityId: string, scholarIdToCease: string) => {
  await prisma.$transaction(async (prisma) => {
    const existingAttendance = await prisma.workshopAttendance.findFirst({
      where: {
        workshop: {
          id: activityId,
        },
        scholar: {
          scholarId: scholarIdToCease
        },
      },
    });
    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      await prisma.workshopAttendance.update({
        where: {
          id: attendanceId
        },
        data: {
          attendance: 'CANCELLED',
        },
      })
      await prisma.workshopAttendance.create({
        data: {
          workshop: {
            connect: {
              id: activityId,
            },
          },
          scholar: {
            connect: {
              scholarId: scholarIdToCease
            },
          },
          attendance: 'ENROLLED',
        },
      });
      return 'Cesion de cupo exitosa'
    }
    else {
      return 'El becario ya estaba inscrito en la actividad'
    }
  });
  revalidatePath('/becario/actividadesFormativas/[workshopId]', 'page')
  revalidatePath('/admin/actividadesFormativas/[workshopId]', 'page')
}

export const ceaseSpotInChat = async (attendanceId: string, scholarId: string, activityId: string, scholarIdToCease: string) => {

  await prisma.$transaction(async (prisma) => {
    const existingAttendance = await prisma.chatAttendance.findFirst({
      where: {
        chat: {
          id: activityId,
        },
        scholar: {
          scholarId: scholarIdToCease
        },
      },
    });
    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      await prisma.chatAttendance.update({
        where: {
          id: attendanceId
        },
        data: {
          attendance: 'CANCELLED',
        },
      })
      await prisma.chatAttendance.create({
        data: {
          chat: {
            connect: {
              id: activityId,
            },
          },
          scholar: {
            connect: {
              scholarId: scholarIdToCease
            },
          },
          attendance: 'ENROLLED',
        },
      });
      return 'Cesion de cupo exitosa'
    }
    else {
      return 'El becario ya estaba inscrito en la actividad'
    }
  });
  revalidatePath('/becario/chats/[chatsId]', 'page')
  revalidatePath('/admin/chats/[chatsId]', 'page')
}


export const getNotEnrolledScholarsInWorkshop = async (workshopId: string) => {
  const scholars = await prisma.scholar.findMany({
    where: {
      program_information: {
        scholar_condition: 'ACTIVE',
        attended_workshops: {
          none: {
            workshop_id: workshopId,
          },
        },
      },
    },
  });
  return scholars;
}

export const getNotEnrolledScholarsInChat = async (workshopId: string) => {
  const scholars = await prisma.scholar.findMany({
    where: {
      program_information: {
        scholar_condition: 'ACTIVE',
        attended_chats: {
          none: {
            chat_id: workshopId,
          },
        },
      },
    },
  });
  return scholars;
}

export const getOnlyCaracasScholar = async () => {
  const scholars = await prisma.scholar.findMany({
    where: {
      program_information: {
        scholar_condition: {
          equals: 'ACTIVE',
        },
        chapter: {
          id: {
            equals: 'Rokk6_XCAJAg45heOEzYb',
          },
        },
      },
    },
    select: {
      email: true,
    }
  });
  return scholars;
};