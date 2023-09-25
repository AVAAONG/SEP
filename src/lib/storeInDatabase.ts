/**
 * Functions used to store data in bulk from spreadsheets in the database.
 *
 * This were the first funcitons we use to store data in the database in the beggining of the project.
 */


//====================================================== Scholar Functions ======================================================

// const SCHOLARS_SPREADSHEET = '1Fuut0jNZ4Onp4UO_yKmcVfThzRWpvlZpNPMf0I6HjtY';
// const SCHOLAR_SHEET = 'Database';
// const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:Q275`;

// const createScholarsInBulkFromSheet = async (chapterID: string) => {
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
//       academicRegime,
//       classModality,
//       isInCVA,
//       isWorking,
//       avaaStartedDate,
//       status,
//     ] = row;
//     try {
//       await prisma.user.create({
//         data: {
//           first_names: firstName,
//           last_names: lastName,
//           dni: dni,
//           birthdate: new Date(spreadSheetBirthdate),
//           email: email,
//           local_phone_number: localPhone,
//           cell_phone_Number: mobilePhone,
//           whatsapp_number: mobilePhone,
//           address: address,
//           gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
//           program_information: {
//             create: {
//               avaa_admission_year: new Date(avaaStartedDate),
//               is_chat_speaker: false,
//               scholar_condition: parseStatus(status) as ScholarCondition,
//               chapter: {
//                 connect: {
//                   id: chapterID,
//                 }
//               },
//             }
//           },
//           // collage_information: {
//           //   create: {
//           //     collage,
//           //     career,
//           //     study_regime: parseStudyRegime(academicRegime),
//           //     evaluation_scale: 'CERO_TO_TWENTY'
//           //   }
//           // },
//           cva_information: {
//             create: {
//               is_in_cva: isInCVA === 'No' ? false : true,
//             }
//           }
//         }
//       });
//       console.log("El becario", firstName, lastName, "se ha creado correctamente")

//     }
//     catch (error) {
//       console.log("El becario", firstName, lastName, "no se ha podido crear correctamente")
//       console.log(error)
//     }
//   })

//   return scholars;
// };


// const parseStatus = (status: string) => {
//   switch (status) {
//     case "ACTIVO":
//       return "ACTIVE";
//     case "EGRESADO":
//       return "ALUMNI";
//     case "RETIRO":
//       return "WITHDRAWAL";
//     case "RENUNCIO":
//       return "RESIGNATION";
//   }


// }

// const parseStudyRegime = (regime: string) => {
//   switch (regime) {
//     case "Semestral":
//       return "SEMESTER";
//     case "Anual":
//       return "ANNUAL";
//     case "Trimestral":
//       return "QUARTER";
//     default:
//       return "ANNUAL";
//   }
// }

//====================================================== Speaker Functions ======================================================
// const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
// const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
// const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B91:I91`;

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
//     ] = value;
//     let gender;
//     if (speakerGender === "O") gender = "O"
//     else gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
//     const workshopSpeaker: WorkshopSpeaker = {
//       id,
//       first_names,
//       last_names: `${last_names1} ${last_names2}`,
//       email: email ? email.toLowerCase() : null,
//       birthdate: null,
//       years_of_exp: null,
//       job_title: null,
//       job_company: job_company ? job_company.toLowerCase() : null,
//       actual_city: null,
//       gender,
//       actual_country: null,
//       curriculum: null,
//       description: null,
//       facebook_user: null,
//       image: null,
//       instagram_user: null,
//       linkedin_user: null,
//       phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
//       twitter_user: null,
//     };
//     await createWorkshopSpeaker(workshopSpeaker);
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

// export async function PATCH(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function DELETE(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }
// export async function PUT(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)
//     return NextResponse.json({ messagge: "ok" })
// }

// export async function GET(req: Response, res: Response) {
//     const token = await getToken({ req });
//     setTokens(token.accessToken, token.refreshToken)

//     return NextResponse.json({ messagge: "ok" })
// }
