
// const SCHOLARS_SPREADSHEET = '1mwuxnDZHUpQI1JIJOvnJkPA7XdeKGUOlGKvzr7iH21I';
// const SCHOLAR_SHEET = 'Voluntariado Externo';
// const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:J126`;

// import { prisma } from "@/lib/db/utils/prisma";
// import { setTokens } from "@/lib/googleAPI/auth";
// import { getSpreadsheetValues } from "@/lib/googleAPI/sheets";
// import { VolunteerStatus } from "@prisma/client";
// import moment from "moment";

// export async function GET(req: Request) {
//     await setTokens();
//     const values = (await getSpreadsheetValues(
//         SCHOLARS_SPREADSHEET,
//         SCHOLARS_SHEET_RANGE
//     )) as string[][];
//     values.map(async (row) => {
//         const [
//             scholarName,
//             scholarDni,
//             description,
//             platform,
//             startDate,
//             assignedHours,
//             beneficiary,
//             supervisor,
//             proof,
//             status,
//         ] = row;
//         let activityStatus: VolunteerStatus = 'PENDING'

//         if (status === "Aprobado" || status === "Constancia por AVAA") {
//             activityStatus = "APPROVED";
//         } else if (status === "No aprobado") {
//             activityStatus = "REJECTED";
//         }
//         else {
//             activityStatus = "PENDING";
//         }
//         const scholar = await prisma.scholar.findUnique({
//             where: {
//                 dni: scholarDni.trim(),
//             },
//             select: {
//                 program_information: {
//                     select: {
//                         id: true,
//                     },
//                 }

//             }
//         });
//         if (!scholar || !scholar.program_information) {
//             console.error(`Scholar with DNI ${scholarDni} not found`);
//         }
//         else {
//             await prisma.volunteer.create({
//                 data: {
//                     modality: 'IN_PERSON',
//                     title: 'Voluntariado externo 2023',
//                     kind_of_volunteer: "EXTERNAL",
//                     description,
//                     platform,
//                     start_dates: [new Date(startDate)],
//                     end_dates: [moment(startDate).add(8, 'hours').toDate()],
//                     beneficiary,
//                     supervisor,
//                     proof,
//                     status: activityStatus,
//                     volunteer_attendance: {
//                         create: {
//                             scholar: {
//                                 connect: {
//                                     id: scholar.program_information.id,
//                                 }
//                             },
//                             asigned_hours: parseInt(assignedHours),
//                             attendance: 'ATTENDED',
//                         }
//                     }
//                 },

//             });
//         }
//         console.log('✅ El voluntariado para', scholarName, 'se ha creado correctamente')

//     });
// }
