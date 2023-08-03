/**
 * @file This file contains all the necesary logic to interact with the database for the users collection.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Region, Role, Scholar, ScholarAttendance, ScholarStatus, User, WorkshopAttendance } from "@prisma/client";
import shortUUID from "short-uuid";
import { prisma } from "./prisma";
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
        data
    });

    return user;
}


/**
 * Delete all scholars from the database
 * @param dat
 * @returns 
 */

export const deleteAllScholars = async () => {
    const scholars = await prisma.scholar.deleteMany();
}



export const createScholar = async (data: Scholar): Promise<Scholar | null> => {
    try {
        const scholar = await prisma.scholar.create({
            data
        });
        console.log('Se creo a' + data.firstNames + ' ' + data.lastNames)
        return scholar;

    }
    catch (error) {
        console.log(' No se creo a' + data.firstNames + ' ' + data.lastNames)

        console.log(error)
        return null;
    }
    finally {
        // await prisma.$disconnect();
    }
}


/**
 * @description add a workshop to a scholar
 * @param scholarId Scholar id
 * @param workshopId Workshop id
 * @returns The scholar updated
 * @throws Error if the scholar does not exist
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
 * 
 */

export const addWorkshopToScholar = async (scholarId: shortUUID.SUUID, workshopId: shortUUID.SUUID, attendance: ScholarAttendance): Promise<Scholar | null> => {
    try {
        const scholar = await prisma.scholar.update({
            where: { dni: scholarId },
            data: {
                attendedWorkshpos: {
                    create: {
                        workshopId: workshopId,
                        attendance: attendance,
                    }
                },
            }
        });
        console.log("se coloco a " + scholarId + " en el taller " + workshopId)
        return scholar;
    }
    catch (error) {
        console.log(error)
        // console.log(" NO se pudo colocar a " + scholarId + " en el taller " + workshopId)
        return null;
    }
    finally {
        await prisma.$disconnect();
    }
}

const createScholarAttendance = async (data: WorkshopAttendance): Promise<WorkshopAttendance | null> => {
    try {
        const scholarAttendance = await prisma.workshopAttendance.create({
            data
        });
        return scholarAttendance;
    }
    catch (error) {
        console.log(error)
        return null;
    }
    finally {
        await prisma.$disconnect();
    }
}


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
        where
    });
    return user;
}

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
        data
    });
    return user;
}

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
}

export const getUserByRole = async (role: Role): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            role
        }
    });
    return users;
}

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
            scholarStatus: ScholarStatus.CURRENT
        }
    });
    return count;
}

export const getScholars = async () => {
    const scholar = await prisma.scholar.findMany();
    return scholar
}

///+============== Personas de febrero
// NO se pudo colocar a 27488394 en el taller pjvjjStiRNDib8WMJqtyu7
// NO se pudo colocar a 29677853 en el taller pjvjjStiRNDib8WMJqtyu7
// NO se pudo colocar a 26435596 en el taller wxnMqPAzCLfXSRSAWZ7X2i
// NO se pudo colocar a 27687150 en el taller wxnMqPAzCLfXSRSAWZ7X2i
// NO se pudo colocar a 27023827 en el taller oJZeTZdnV5trcyE9AVJQ8s
// NO se pudo colocar a 29678819 en el taller 4ZkVXTQgHaqUU4P4UVuSG4
// NO se pudo colocar a 28469196 en el taller i8Y8Yj6ay83Aom7Tx3iE62
//  NO se pudo colocar a 26435596 en el taller uXBz5cd1iLJqJfzJ3J4fwX
//  NO se pudo colocar a 20201110248 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 27023827 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 27108385 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 29595628 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 26435596 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 26435596 en el taller gfKTYasHHjxVRkafMV8Khq
//  NO se pudo colocar a 27746001 en el taller gfKTYasHHjxVRkafMV8Khq
//  NO se pudo colocar a 26435596 en el taller oBHZkib5XHDXY32NFsesRW
//  NO se pudo colocar a 27755868 en el taller eEm7GvVNTozLnhMvnYHz1Q
//  NO se pudo colocar a v - 28496177 en el taller eEm7GvVNTozLnhMvnYHz1Q
//  NO se pudo colocar a 26995018 en el taller eEm7GvVNTozLnhMvnYHz1Q
//  NO se pudo colocar a 28015383 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//  NO se pudo colocar a 27488394 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//  NO se pudo colocar a 27023827 en el taller iKoEAPmaiQn6VoY9QDXXaJ



/// +============== Personas de marzo
// NO se pudo colocar a 27687150 en el taller wxnMqPAzCLfXSRSAWZ7X2i
// NO se pudo colocar a 26435596 en el taller wxnMqPAzCLfXSRSAWZ7X2i
//  NO se pudo colocar a 20201110248 en el taller inoqJ593bHGb3e5TbogeyJ

//  NO se pudo colocar a 27023827 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 27108385 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 29595628 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 26435596 en el taller inoqJ593bHGb3e5TbogeyJ
//  NO se pudo colocar a 27344118 en el taller i8Y8Yj6ay83Aom7Tx3iE62
//  NO se pudo colocar a 28469196 en el taller i8Y8Yj6ay83Aom7Tx3iE62
//  NO se pudo colocar a 27344118 en el taller pjvjjStiRNDib8WMJqtyu7
//   NO se pudo colocar a 27488394 en el taller pjvjjStiRNDib8WMJqtyu7
//   NO se pudo colocar a 29677853 en el taller pjvjjStiRNDib8WMJqtyu7
//   NO se pudo colocar a 28015383 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//   NO se pudo colocar a 27488394 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//   NO se pudo colocar a 27023827 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//    NO se pudo colocar a 26435596 en el taller uXBz5cd1iLJqJfzJ3J4fwX
//    NO se pudo colocar a 27344118 en el taller uXBz5cd1iLJqJfzJ3J4fwX
//    NO se pudo colocar a 26435596 en el taller wxnMqPAzCLfXSRSAWZ7X2i
//    NO se pudo colocar a 27687150 en el taller wxnMqPAzCLfXSRSAWZ7X2i
//    NO se pudo colocar a 27344118 en el taller eEm7GvVNTozLnhMvnYHz1Q
//    NO se pudo colocar a 27344118 en el taller wxnMqPAzCLfXSRSAWZ7X2i
//     NO se pudo colocar a 27755868 en el taller eEm7GvVNTozLnhMvnYHz1Q
//      NO se pudo colocar a v - 28496177 en el taller eEm7GvVNTozLnhMvnYHz1Q
//       NO se pudo colocar a 26995018 en el taller eEm7GvVNTozLnhMvnYHz1Q
//        NO se pudo colocar a 27023827 en el taller oJZeTZdnV5trcyE9AVJQ8s
//        NO se pudo colocar a 29678819 en el taller 4ZkVXTQgHaqUU4P4UVuSG4
//        NO se pudo colocar a 26435596 en el taller gfKTYasHHjxVRkafMV8Khq
//         NO se pudo colocar a 27746001 en el taller gfKTYasHHjxVRkafMV8Khq
//         NO se pudo colocar a 20201110248 en el taller inoqJ593bHGb3e5TbogeyJ
//          NO se pudo colocar a 27023827 en el taller inoqJ593bHGb3e5TbogeyJ
//           NO se pudo colocar a 27108385 en el taller inoqJ593bHGb3e5TbogeyJ
//            NO se pudo colocar a 29595628 en el taller inoqJ593bHGb3e5TbogeyJ
//            NO se pudo colocar a 26435596 en el taller inoqJ593bHGb3e5TbogeyJ
//            NO se pudo colocar a 26435596 en el taller gfKTYasHHjxVRkafMV8Khq
//            NO se pudo colocar a 27746001 en el taller gfKTYasHHjxVRkafMV8Khq
//            NO se pudo colocar a 29678819 en el taller 4ZkVXTQgHaqUU4P4UVuSG4
//             NO se pudo colocar a 27344118 en el taller oBHZkib5XHDXY32NFsesRW
//             NO se pudo colocar a 26435596 en el taller oBHZkib5XHDXY32NFsesRW
//              NO se pudo colocar a 27344118 en el taller i8Y8Yj6ay83Aom7Tx3iE62
//              NO se pudo colocar a 28469196 en el taller i8Y8Yj6ay83Aom7Tx3iE62
//              NO se pudo colocar a 26435596 en el taller uXBz5cd1iLJqJfzJ3J4fwX
//               NO se pudo colocar a 27344118 en el taller uXBz5cd1iLJqJfzJ3J4fwX
//                NO se pudo colocar a 27344118 en el taller eEm7GvVNTozLnhMvnYHz1Q
//                 NO se pudo colocar a 27755868 en el taller eEm7GvVNTozLnhMvnYHz1Q
//                  NO se pudo colocar a v - 28496177 en el taller eEm7GvVNTozLnhMvnYHz1Q

//                  NO se pudo colocar a 27344118 en el taller pjvjjStiRNDib8WMJqtyu7
//                   NO se pudo colocar a 29677853 en el taller pjvjjStiRNDib8WMJqtyu7
//                    NO se pudo colocar a 27488394 en el taller pjvjjStiRNDib8WMJqtyu7
//                     NO se pudo colocar a 27023827 en el taller oJZeTZdnV5trcyE9AVJQ8s
//                     NO se pudo colocar a 26995018 en el taller eEm7GvVNTozLnhMvnYHz1Q
//                     NO se pudo colocar a 28015383 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//                      NO se pudo colocar a 27488394 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//                       NO se pudo colocar a 27023827 en el taller iKoEAPmaiQn6VoY9QDXXaJ
//                       NO se pudo colocar a 27344118 en el taller oBHZkib5XHDXY32NFsesRW
//                       NO se pudo colocar a 26435596 en el taller oBHZkib5XHDXY32NFsesRW