// import { createWorkshopSpeaker } from "@/lib/db/utils/Workshops";
// import { setTokens } from "@/lib/googleAPI/auth";
// import { getSpreadsheetValues } from "@/lib/googleAPI/sheets";
// import { Gender, Speaker } from "@prisma/client";
// import { NextApiRequest } from "next";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function GET(req: NextApiRequest) {
//     const token = await getToken({ req });
//     if (token === null) return NextResponse.redirect('/api/auth/signin');
//     setTokens(token.accessToken as string, token.refreshToken as string);
//     // await createWorkshopSpeakerFromSpreadsheet();
//     return NextResponse.json({ message: 'ok' });
// }

// const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
// const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de talleres';
// const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!B2:J101`;

// const createWorkshopSpeakerFromSpreadsheet = async () => {
//     const values = (await getSpreadsheetValues(
//         WORKSHOP_SPEAKERS_SPREADSHEET,
//         WORKSHOP_SPEAKERS_RANGE
//     )) as string[][];

//     const workshopSpeakers = values.map(async (value) => {
//         const [
//             first_names,
//             last_names1,
//             last_names2,
//             id,
//             email,
//             phone_number,
//             job_company,
//             speakerGender,
//             linkedin_profile
//         ] = value;
//         let gender;
//         if (speakerGender === "O") gender = "O"
//         else gender = speakerGender.toLowerCase() === 'masculino' ? 'M' : 'F';
//         const workshopSpeaker: Speaker = {
//             id,
//             first_names,
//             last_names: `${last_names1} ${last_names2}`,
//             email: email ? email.toLowerCase() : null,
//             birthdate: null,
//             years_of_exp: null,
//             job_title: null,
//             job_company: job_company ? job_company.toLowerCase() : null,
//             actual_city: null,
//             gender: gender as Gender,
//             actual_country: null,
//             curriculum: null,
//             description: null,
//             facebook_user: null,
//             image: null,
//             speaker_kind: 'WORKSHOPS',
//             instagram_user: null,
//             linkedin_user: linkedin_profile,
//             phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
//             twitter_user: null,
//         };
//         await createWorkshopSpeaker(workshopSpeaker);
//         return workshopSpeaker;
//     });
//     return workshopSpeakers;
// };