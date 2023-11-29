import { setTokens } from "@/lib/googleAPI/auth";
import { getSpreadsheetValues } from "@/lib/googleAPI/sheets";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(req: NextApiRequest) {
    const token = await getToken({ req });
    if (token === null) return NextResponse.redirect('/api/auth/signin');
    setTokens(token.accessToken as string, token.refreshToken as string);
    // await prisma.mentor.deleteMany()
    // const mentores = await getMentors()
    // const conut = await prisma.mentor.count()
    return NextResponse.json({ mentores: conut });
}

const MENTORS_SPREADSHEET = '1YLAivDr5WOnKybK1p5guCv5w-oc1bZ-m8btLnrUTZtI';
const MENTOR_SHEET = 'Base de datos';
const MENTORS_SHEET_RANGE = `'${MENTOR_SHEET}'!A2:Z48`;



const getMentors = async () => {
    const values = (await getSpreadsheetValues(
        MENTORS_SPREADSHEET,
        MENTORS_SHEET_RANGE
    )) as string[][];

    const keys = [
        'number', 'dni', 'names', 'lastNames', 'email', 'birthdate', 'residenceCity', 'phoneNumber',
        'civilState', 'numberOfChils', 'howKnowsAVAA', 'curriculum', 'bornCity',
        'haveChildren', 'areasOfInteres', 'WhyWantToBeMentor', 'profession', 'hobbies',
        'jobPlace', 'jobTittle', 'otherActivities', 'photo', 'instagram', 'twitter',
        'facebook', 'linkedin', 'tiktok'
    ];
    const mentors = values.map(async value => {
        const mentor = keys.reduce((obj: { [key: string]: string | null }, key, index) => {
            obj[key] = value[index] === undefined ? null : value[index];
            return obj;
        }, {});

        console.log('🎈 Creando a ' + mentor.names + ' ' + mentor.lastNames)

        try {
            await prisma.mentor.create({
                data: {
                    first_name: mentor.names ?? '',
                    last_name: mentor.lastNames ?? '',
                    email: mentor.email ?? '',
                    dni: mentor.dni ?? '',
                    cell_phone: mentor.phoneNumber ?? '',
                    birthdate: mentor.birthdate ? new Date(mentor.birthdate) : null,
                    city_of_residence: mentor.residenceCity,
                    profession: mentor.profession,
                    company: mentor.jobPlace,
                    company_position: mentor.jobTittle,
                    other_activities: mentor.otherActivities,
                    image: mentor.photo,
                    hobbies: mentor.hobbies,
                    instagram_profile: mentor.instagram,
                    twitter_profile: mentor.twitter,
                    facebook_profile: mentor.facebook,
                    linkedin_profile: mentor.linkedin,
                    tiktok_profile: mentor.tiktok,
                    areas_of_interest: mentor.areasOfInteres,
                    how_know_avaa: mentor.howKnowsAVAA,
                    motivation: mentor.WhyWantToBeMentor,
                    curriculum: mentor.curriculum,
                    status: 'ACCEPTED'
                }
            })
            console.log('✅ Mentor' + mentor.names + ' ' + mentor.lastNames + ' creado')
        }
        catch (error) {
            console.log('❌ Mentor' + mentor.names + ' ' + mentor.lastNames + ' no creado')
            // console.log(error)
        }

        return mentor
    });


    return mentors
}