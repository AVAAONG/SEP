// // import { prisma } from "@/lib/db/utils/prisma";
// import { setTokens } from '@/lib/googleAPI/auth';
// import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
// import { CvaLocation, PrismaClient } from '@prisma/client';
// import { NextApiRequest } from 'next';
// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest) {
//     const token = await getToken({ req });
//     if (token === null) return NextResponse.redirect('/api/auth/signin');
//     setTokens(token.accessToken as string, token.refreshToken as string);
//     await updateScholarsInBatch();
//     return NextResponse.json({ message: 'ok' });
// }

// const SCHOLARS_SPREADSHEET = '1hdrhSHNWlavKt1Mmjn4KHBwDFRA_IHlxYomLv3DMu-s';
// const SCHOLAR_SHEET = 'Respuestas de formulario 1';
// const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!B2:AO154`;

// const updateScholarsInBatch = async () => {
//     const values = (await getSpreadsheetValues(
//         SCHOLARS_SPREADSHEET,
//         SCHOLARS_SHEET_RANGE
//     )) as string[][];

//     values.map(async (row) => {
//         const [
//             allowedEmail,
//             last_names,
//             first_names,
//             sheetDni,
//             email_not_use, // no usar
//             local_phone_number,
//             cell_phone_Number,
//             yearsOld, // not use

//             collage,
//             career,
//             study_regime,
//             current_academic_period,
//             observation, // not use
//             knowsGrade, // not use
//             grade,
//             record,
//             why_not_have_record, // not use
//             when_whould_know_academic_record, // not use
//             class_modality,
//             howManyClases, // not use
//             incription_prove,
//             is_in_cva,
//             cva_modality,
//             module,
//             level, //not use
//             cva_location,
//             not_started_cva_reason,
//             waiting_for_cva, // not use
//             certificate,
//             is_working, // not use
//             jobModality, // add
//             job_hours, // no usar
//             kind_of_job, // add
//             job_company,
//             job_title,
//             have_entrepeneurship, // add
//             entrepreneurship_name, // add
//             entrepreneurship_kind, // add
//             entrepreneurship_services, // add
//             entrepreneurship_social_media, // add
//         ] = row

//         const modality = parseModality(class_modality)
//         const regime = parseStudyRegime(study_regime)
//         const haveEntrepenurship = have_entrepeneurship === 'Sí' ? true : false;
//         const jobModalityParsed = parseModality(jobModality)
//         const currentlyInCva = is_in_cva === 'Sí' ? true : false;
//         const dni = parseDni(sheetDni)
//         const haveEntrepenourship = have_entrepeneurship === 'Sí' ? true : false;

//         const inscriptionComprobant = incription_prove.split(',')![0]!.trim();
//         const careerSchedule = incription_prove.split(',')![1]! ? incription_prove.split(',')![1]!.trim().trim() : null;
//         let scholar: any
//         try {
//             scholar = await prisma.scholar.findFirstOrThrow({
//                 where: {
//                     dni
//                 }
//             })
//             console.log(`Becario ${scholar.first_names} ${scholar.last_names} encontrado`)
//         }
//         catch (e) {
//             console.log(e)
//             console.log('ERROR AL BUSCAR A ', dni)

//         }
//         // if (have_entrepeneurship === 'Sí') {
//         //   await prisma.scholar.update({
//         //     where: { id: scholar.id },
//         //     data: {
//         //       email: allowedEmail,
//         //       last_names,
//         //       first_names,
//         //       dni,
//         //       local_phone_number,
//         //       cell_phone_Number,
//         //       entrepenourshipInformation: {
//         //         create: {
//         //           have_entrepreneurship: haveEntrepenourship,
//         //           entrepreneurship_name,
//         //           entrepreneurship_kind,
//         //           entrepreneurship_services,
//         //           entrepreneurship_social_media,
//         //         }
//         //       },
//         //     },
//         //   });
//         // } else {
//         //   await prisma.scholar.update({
//         //     where: { id: scholar.id },
//         //     data: {
//         //       email: allowedEmail,
//         //       last_names,
//         //       first_names,
//         //       dni,
//         //       local_phone_number,
//         //       cell_phone_Number,
//         //     },
//         //   });
//         // }


//         // await prisma.scholarCVAInformation.update({
//         //   where: {
//         //     scholarId: scholar.id
//         //   },
//         //   data: {
//         //     is_in_cva: currentlyInCva,
//         //     cva_location: parseCVALocation(cva_location),
//         //     not_started_cva_reason,
//         //     certificate,
//         //     modules: {
//         //       create: {
//         //         modality: parseModality(cva_modality) as Modality,
//         //         module: Number(module) ? Number(module) : 0,
//         //         qualification: 0,
//         //       }
//         //     }
//         //   }
//         // })

//         // await prisma.scholarCollageInformation.update({
//         //   where: {
//         //     scholar_id: scholar.id
//         //   },
//         //   data: {
//         //     study_regime: regime,
//         //     inscription_comprobant: inscriptionComprobant,
//         //     career_schedule: careerSchedule,
//         //     career,
//         //     collage_period: {
//         //       create: {
//         //         grade: Number(grade) ? Number(grade) : 0,
//         //         record,
//         //         class_modality: modality,
//         //         current_academic_period: Number(current_academic_period),
//         //       }
//         //     },
//         //   }
//         // })


//         // if (is_working === 'Sí') {
//         //   await prisma.scholar.update({
//         //     where: {
//         //       id: scholar.id
//         //     },
//         //     data: {
//         //       job_information: {
//         //         create: {
//         //           job_company,
//         //           job_title,
//         //           job_modality: jobModalityParsed,
//         //           kind_of_job: parseKindOfJob(kind_of_job),
//         //           job_schedule: 'PART_TIME',
//         //           job_sector: 'PRIVATE',
//         //           job_start_date: new Date(),
//         //         }
//         //       }
//         //     }
//         //   })
//         // }
//     });
// }

// const parseModality = (modality: string) => {
//     if (modality === 'Presencial') return 'IN_PERSON';
//     if (modality === 'Virtual') return 'ONLINE';
//     if (modality === 'Mixta') return 'HYBRID';
//     return 'IN_PERSON';
// }

// const parseStudyRegime = (regime: string) => {
//     switch (regime) {
//         case 'Semestral':
//             return 'SEMESTER';
//         case 'Anual':
//             return 'ANNUAL';
//         case 'Trimestral':
//             return 'QUARTER';
//         case 'Cuatrimestral':
//             return 'QUARTIER'
//         default:
//             return 'ANNUAL';
//     }
// };

// const parseCVALocation = (location: string): CvaLocation | null => {
//     switch (location) {
//         case 'CVA de Las Mercedes':
//             return 'MERCEDES';
//         case 'CVA del Centro':
//             return 'CENTRO';
//         default:
//             return null;
//     }
// }

// const parseKindOfJob = (kindOfJob: string) => {
//     switch (kindOfJob) {
//         case 'Freelance':
//             return 'FREELANCE';
//         case 'Formal':
//             return 'FORMAL';
//         case 'Informal':
//             return 'INFORMAL';
//         default:
//             return 'FREELANCE'
//     }
// }

// const parseDni = (dni: string) =>
//     dni
//         .trim()
//         .toLowerCase()
//         .replace(/[^0-9]/g, '');
