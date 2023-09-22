/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import {
  Region,
  Role,
  Scholar,
  ScholarAttendance,
  ScholarStatus,
  User,
  WorkshopAttendance,
} from '@prisma/client';
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

export const deleteAllScholars = async () => {
  const scholars = await prisma.scholar.deleteMany();
};

/**
 * @description add a workshop to a scholar
 * @param scholarId Scholar id
 * @param workshopId Workshop id
 * @returns The scholar updated
 * @throws Error if the scholar does not exist
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
 *
 */

export const addWorkshopToScholar = async (
  scholarId: shortUUID.SUUID,
  workshopId: shortUUID.SUUID,
  attendance: ScholarAttendance
): Promise<Scholar | null> => {
  try {
    const scholar = await prisma.scholar.update({
      where: { dni: scholarId },
      data: {
        attendedWorkshpos: {
          create: {
            workshopId: workshopId,
            attendance: attendance,
          },
        },
      },
    });
    console.log('se coloco a ' + scholarId + ' en el taller ' + workshopId);
    return scholar;
  } catch (error) {
    console.log(error);
    // console.log(" NO se pudo colocar a " + scholarId + " en el taller " + workshopId)
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

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

export const getUserByRole = async (role: Role): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      role,
    },
  });
  return users;
};

// export const getScholarStatus = async (scholarStatus: ScholarStatus): Promise<User[]> => {
//     const users = await prisma.user.findMany({
//         where: {
//             scholar: {
//                 scholarStatus
//             }
//         }
//     });
//     return users;
// }

/**
 * @description get the total count of scholars
 * @returns the total count of scholars
 *
 */
export const getScholarsCount = async (): Promise<number> => {
  const count = await prisma.scholar.count({
    where: {
      scholarStatus: ScholarStatus.CURRENT,
    },
  });
  return count;
};

export const getScholars = async () => {
  const scholar = await prisma.scholar.findMany();
  return scholar;
};

export const createScholar = async (data) => {
  const scholar = await prisma.user.create({
    data,

  });
}