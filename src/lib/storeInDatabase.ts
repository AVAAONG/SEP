/**
 * Functions used to store data in bulk from spreadsheets in the database.
 *
 * This were the first funcitons we use to store data in the database in the beggining of the project.
 */


//====================================================== Scholar Functions ======================================================
// const createScholarsInBulkFromSheet = async () => {
//     const values = (await getSpreadsheetValues(
//         SCHOLARS_SPREADSHEET,
//         SCHOLARS_SHEET_RANGE
//     )) as string[][];
//     const scholars = values.forEach(async (row) => {
//         const [
//             lastName,
//             firstName,
//             dni,
//             spreadsheetGender,
//             spreadSheetBirthdate,
//             email,
//             localPhone,
//             mobilePhone,
//             address,
//             collage,
//             career,
//             academicRegime,
//             classModality,
//             isInCVA,
//             isWorking,
//             avaaStartedDate,
//             status,
//         ] = row;
//         try {
//             await prismaClient.user.create({
//                 data: {
//                     first_names: firstName,
//                     last_names: lastName,
//                     dni: dni,
//                     birthdate: new Date(spreadSheetBirthdate),
//                     email: email,
//                     local_phone_number: localPhone,
//                     cell_phone_Number: mobilePhone,
//                     whatsapp_number: mobilePhone,
//                     address: address,
//                     gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
//                     program_information: {
//                         create: {
//                             avaa_admission_year: new Date(avaaStartedDate),
//                             is_chat_speaker: false,
//                             scholar_condition: parseStatus(status) as ScholarCondition,
//                             chapter: {
//                                 connect: {
//                                     id: 'klfodKd93Js8astdadspf',
//                                 }
//                             },
//                         }
//                     },
//                     collage_information: {
//                         create: {
//                             collage,
//                             career,
//                             study_regime: parseStudyRegime(academicRegime),
//                             evaluation_scale: 'CERO_TO_TWENTY'
//                         }
//                     },
//                     cva_information: {
//                         create: {
//                             is_in_cva: isInCVA === 'No' ? false : true,
//                         }
//                     }
//                 }
//             });
//             console.log("El becario", firstName, lastName, "se ha creado correctamente")

//         }
//         catch (error) {
//             console.log("El becario", firstName, lastName, "no se ha podido crear correctamente")
//             console.log(error)
//         }
//     })

//     return scholars;
// };


// const parseStatus = (status: string) => {
//     switch (status) {
//         case "ACTIVO":
//             return "ACTIVE";
//         case "EGRESADO":
//             return "ALUMNI";
//         case "RETIRO":
//             return "WITHDRAWAL";
//         case "RENUNCIO":
//             return "RESIGNATION";
//     }


// }

// const parseStudyRegime = (regime: string) => {
//     switch (regime) {
//         case "Semestral":
//             return "SEMESTER";
//         case "Anual":
//             return "ANNUAL";
//         case "Trimestral":
//             return "QUARTER";
//         default:
//             return "ANNUAL";
//     }
// }



//====================================================== Speaker Functions ======================================================
const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B2:I87`;


// const createWorkshopSpeakerFromSpreadsheet = async () => {
//     const values = (await getSpreadsheetValues(
//         WORKSHOP_SPEAKERS_SPREADSHEET,
//         WORKSHOP_SPEAKERS_RANGE
//     )) as string[][];

//     const workshopSpeakers = values.map((value) => {
//         const [
//             first_names,
//             last_names1,
//             last_names2,
//             id,
//             email,
//             phone_number,
//             job_company,
//             speakerGender,
//         ] = value;
//         const gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
//         const workshopSpeaker: WorkshopSpeaker = {
//             id,
//             first_names,
//             last_names: `${last_names1} ${last_names2}`,
//             email: email ? email.toLowerCase() : null,
//             birthdate: null,
//             years_of_exp: null,
//             job_title: null,
//             job_company: job_company ? job_company.toLowerCase() : null,
//             actual_city: null,
//             gender,
//             actual_country: null,
//             curriculum: null,
//             description: null,
//             facebook_user: null,
//             image: null,
//             instagram_user: null,
//             linkedin_user: null,
//             phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
//             twitter_user: null,
//         };
//         // await createWorkshopSpeaker(workshopSpeaker);
//         return workshopSpeaker;
//     });

//     return workshopSpeakers;
// };