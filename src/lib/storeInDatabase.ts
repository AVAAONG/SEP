/**
 * Functions used to store data in bulk from spreadsheets in the database.
 *
 * This were the first funcitons we use to store data in the database in the beggining of the project.
 */

//====================================================== Scholar Functions ======================================================

// const SCHOLARS_SPREADSHEET = '1Fuut0jNZ4Onp4UO_yKmcVfThzRWpvlZpNPMf0I6HjtY';
// const SCHOLAR_SHEET = 'Database';
// const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:S276`;
// const createScholarsInBulkFromSheet = async (chapterID: string = 'J4ZlF-eg2fTL9W7hnxRe3') => {
//   const values = (await getSpreadsheetValues(
//     SCHOLARS_SPREADSHEET,
//     SCHOLARS_SHEET_RANGE
//   )) as string[][];
//   const scholars = values.forEach(async (row) => {
//     const [
//       lastName,
//       firstName,
//       dni,
//       spreadsheetGender,
//       spreadSheetBirthdate,
//       email,
//       localPhone,
//       mobilePhone,
//       address,
//       collage,
//       career,
//       studyArea,
//       academicRegime,
//       classModality,
//       isInCVA,
//       isWorking,
//       avaaStartedDate,
//       status,
//       chatSpeakerId,
//     ] = row;
//     const evaluationScale = parseEvaluationScale(collage as Collages);
//     try {
//       await prisma.scholar.create({
//         data: {
//           first_names: firstName,
//           last_names: lastName,
//           dni: dni,
//           birthdate: new Date(spreadSheetBirthdate),
//           allowedEmail: email,
//           local_phone_number: localPhone,
//           cell_phone_Number: mobilePhone,
//           whatsapp_number: mobilePhone,
//           address: address,
//           gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
//           is_working: isWorking === 'No' ? false : true,
//           is_chat_speaker: chatSpeakerId.trim() === "No" ? false : true,
//           chat_speaker_id: chatSpeakerId.trim() === "No" ? null : chatSpeakerId.trim(),
//           program_information: {
//             create: {
//               avaa_admission_year: new Date(avaaStartedDate),
//               scholar_condition: parseStatus(status) as ScholarCondition,
//               chapter: {
//                 connect: {
//                   id: chapterID,
//                 },
//               },
//             },
//           },
//           collage_information: {
//             create: {
//               collage: collage.toUpperCase() as Collages,
//               career,
//               study_area: parseStudyArea(studyArea),
//               study_regime: parseStudyRegime(academicRegime),
//               evaluation_scale: evaluationScale,
//             },
//           },
//           cva_information: {
//             create: {
//               is_in_cva: isInCVA === 'No' ? false : true,
//             },
//           },
//         },
//       });
//       console.log('✅ El becario', firstName, lastName, 'se ha creado correctamente');
//     } catch (error) {
//       console.error('El becario', firstName, lastName, 'no se ha podido crear');
//       console.error(error);
//     }
//   });

//   return scholars;
// };

// const parseStatus = (status: string) => {
//   switch (status) {
//     case 'ACTIVO':
//       return 'ACTIVE';
//     case 'EGRESADO':
//       return 'ALUMNI';
//     case 'RETIRO':
//       return 'WITHDRAWAL';
//     case 'RENUNCIO':
//       return 'RESIGNATION';
//   }
// };

// const parseStudyRegime = (regime: string) => {
//   switch (regime) {
//     case 'Semestral':
//       return 'SEMESTER';
//     case 'Anual':
//       return 'ANNUAL';
//     case 'Trimestral':
//       return 'QUARTER';
//     default:
//       return 'ANNUAL';
//   }
// };

// const parseEvaluationScale = (collage: Collages) => {
//   switch (collage) {
//     case 'USB':
//       return 'CERO_TO_FIVE';
//     case 'UPEL':
//       return 'CERO_TO_TEN';
//     default:
//       return 'CERO_TO_TWENTY';
//   }
// };

// const parseStudyArea = (area: string) => {
//   switch (area) {
//     case 'Arquitectura y Urbanismo':
//       return 'ARCHITECTURE_URBANISM';
//     case 'Ciencias de la Salud':
//       return 'HEALTH_SCIENCES';
//     case 'Ciencias Jurídicas y Políticas':
//       return 'JURIDICAL_POLITICAL_SCIENCES';
//     case 'Ciencias Sociales':
//       return 'SOCIAL_SCIENCES';
//     case 'Humanidades y Educación':
//       return 'HUMANITIES_EDUCATION';
//     case 'STEM':
//       return 'STEM';
//     default:
//       return 'OTHER';
//   }
// };

//====================================================== workshop Speaker Functions ======================================================
// const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
// const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
// const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B2:J92`;

// const createWorkshopSpeakerFromSpreadsheet = async () => {
//   const values = (await getSpreadsheetValues(
//     WORKSHOP_SPEAKERS_SPREADSHEET,
//     WORKSHOP_SPEAKERS_RANGE
//   )) as string[][];

//   const workshopSpeakers = values.map(async (value) => {
//     const [
//       first_names,
//       last_names1,
//       last_names2,
//       id,
//       email,
//       phone_number,
//       job_company,
//       speakerGender,
//       linkedin_profile
//     ] = value;
//     let gender;
//     if (speakerGender === "O") gender = "O"
//     else gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
//     const workshopSpeaker: Speaker = {
//       id,
//       first_names,
//       last_names: `${last_names1} ${last_names2}`,
//       email: email ? email.toLowerCase() : null,
//       birthdate: null,
//       years_of_exp: null,
//       job_title: null,
//       job_company: job_company ? job_company.toLowerCase() : null,
//       actual_city: null,
//       gender: gender as Gender,
//       actual_country: null,
//       curriculum: null,
//       description: null,
//       facebook_user: null,
//       image: null,
//       speaker_kind: 'WORKSHOPS',
//       instagram_user: null,
//       linkedin_user: linkedin_profile,
//       phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
//       twitter_user: null,
//     };
//     await createWorkshopSpeaker(workshopSpeaker);
//     return workshopSpeaker;
//   });
//   return workshopSpeakers;
// };

//=============================================== Chat Speaker Functions ======================================================


// const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc'
// const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de chats';
// const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!C3:K45`;

// const createChatSpeakerFromSpreadsheet = async () => {
//   const values = (await getSpreadsheetValues(
//     WORKSHOP_SPEAKERS_SPREADSHEET,
//     WORKSHOP_SPEAKERS_RANGE
//   )) as string[][];

//   const workshopSpeakers = values.forEach(async (value) => {
//     const [
//       first_names,
//       last_names1,
//       last_names2,
//       id,
//       email,
//       phone_number,
//       speakerGender,
//       isScholar,
//       ScholarDni
//     ] = value;
//     let gender;
//     if (speakerGender === "O") gender = "O"
//     else gender = speakerGender.toLowerCase() === 'hombre' ? 'M' : 'F';

//     let workshopSpeaker: Speaker;

//     if (ScholarDni === "NOT") {
//       workshopSpeaker = {
//         id,
//         first_names,
//         last_names: `${last_names1} ${last_names2}`,
//         email: email ? email.toLowerCase() : null,
//         birthdate: null,
//         years_of_exp: null,
//         job_title: null,
//         job_company: null,
//         actual_city: null,
//         gender: gender as Gender,
//         actual_country: null,
//         curriculum: null,
//         description: null,
//         facebook_user: null,
//         image: null,
//         speaker_kind: 'CHATS',
//         instagram_user: null,
//         linkedin_user: null,
//         phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
//         twitter_user: null,
//       };
//     }
//     else {
//       const scholar = await prisma.scholar.findUniqueOrThrow({
//         where: {
//           dni: ScholarDni
//         }
//       })
//       workshopSpeaker = {
//         id: scholar.id,
//         first_names: scholar.first_names,
//         last_names: scholar.last_names,
//         email: scholar.allowedEmail,
//         birthdate: scholar.birthdate,
//         years_of_exp: null,
//         job_title: null,
//         job_company: null,
//         actual_city: null,
//         gender: scholar.gender,
//         actual_country: null,
//         curriculum: null,
//         description: null,
//         facebook_user: null,
//         image: null,
//         speaker_kind: 'CHATS',
//         instagram_user: null,
//         linkedin_user: null,
//         phone_number: scholar.cell_phone_Number,
//         twitter_user: null,
//       };
//     }
//     console.log('\x1b[36m%s\x1b[0m', `Creating speaker ${workshopSpeaker.first_names} ${workshopSpeaker.last_names}`);
//     await createWorkshopSpeaker(workshopSpeaker);
//     console.log(
//       '\x1b[32m%s\x1b[0m',
//       `Speaker ${workshopSpeaker.first_names} ${workshopSpeaker.last_names}, created successfully`
//     );
//     return workshopSpeaker;
//   });
//   return workshopSpeakers;
// };

////// functions to create workshops

// const temp = async (workshop) => {
//     const { speaker, title, modality, spots } = workshop;
//     const formDescription = createFormDescription(workshop)
//     const workshopId = shortUUID.generate()

//     const [
//         calendarEventId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword
//     ] = await createEvent('workshop', workshop)

//     const formUrl = await createForm(
//         title,
//         modality,
//         spots,
//         workshopId,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         meetingPassword,
//         addToCalendarUrl,
//         meetingLink,
//         meetingId,
//         formDescription

//     )
//     const speakerId = speaker

//     const tempDataObj: WorkshopTempData = {
//         id: shortUUID.generate(),
//         meetingPassword,
//         meetingLink,
//         meetingId,
//         formLink: formUrl
//     }
//     const normalizedWorkshop = normalizeWorkshopData(workshop, workshopId, tempDataObj, calendarEventId)

//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     createWorkshop(normalizedWorkshop, speakerId, tempDataObj)
// }

// const normalizeWorkshopData = (workshop: FormTypeWorkshop, id, tempDataObj, calendarEventId): Workshop => {
//     const { title, pensum, startHour, endHour, date, spots, modality, description, platform, workshopYear } = workshop;
//     const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
//     const normalizeWorkshopObject: Workshop = {
//         id,
//         title: title,
//         spots: parseInt(spots),
//         platform: platform.trim().toUpperCase().replace(' ', '_') as Platform,
//         description,
//         workshopYear: workshopYear,
//         modality: modality.toUpperCase() as Modality,
//         pensum: pensum.toUpperCase() as Pensum,
//         dates: {
//             start_date: new Date(startDate),
//             end_date: new Date(endDate),
//         },
//         activityStatus: "AGENDADO",
//         tempData: tempDataObj,
//         calendarID: calendarEventId,

//     }
//     return normalizeWorkshopObject;
// }
