import { createWorkshopSpeaker } from '@/lib/db/utils/Workshops';
import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { Gender, Speaker } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
    const token = await getToken({ req });
    if (token === null) return NextResponse.redirect('/api/auth/signin');
    setTokens(token.accessToken as string, token.refreshToken as string);
    await createChatSpeakerFromSpreadsheet();
    return NextResponse.json({ message: 'ok' });
}

const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de chats';
//Se deja el perfil de rut por fuera ya que ella es tanto facilitadora de chats como de talleres, por lo cual se le da el tipo de CHAT_AND_WORKSHOP
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!C3:J45`;

const createChatSpeakerFromSpreadsheet = async () => {
    const values = (await getSpreadsheetValues(
        WORKSHOP_SPEAKERS_SPREADSHEET,
        WORKSHOP_SPEAKERS_RANGE
    )) as string[][];
    const workshopSpeakers = values.forEach(async (value) => {
        const [
            first_names,
            last_names1,
            last_names2,
            id,
            email,
            phone_number,
            speakerGender,
            isScholar,
        ] = value;
        let gender;
        if (speakerGender === 'O') gender = 'O';
        else gender = speakerGender.toLowerCase() === 'hombre' ? 'M' : 'F';
        let workshopSpeaker: Speaker;
        if (isScholar === 'NOT') {
            workshopSpeaker = {
                id,
                first_names,
                last_names: `${last_names1} ${last_names2}`,
                email: email ? email.toLowerCase() : null,
                birthdate: null,
                years_of_exp: null,
                job_title: null,
                job_company: null,
                actual_city: null,
                gender: gender as Gender,
                actual_country: null,
                curriculum: null,
                description: null,
                facebook_user: null,
                image: null,
                speaker_kind: 'CHATS',
                instagram_user: null,
                linkedin_user: null,
                phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
                twitter_user: null,
            };
        } else {
            const scholar = await prisma.scholar.findUniqueOrThrow({
                where: {
                    dni: id,
                },
            });
            workshopSpeaker = {
                id: scholar.id,
                first_names: scholar.first_names,
                last_names: scholar.last_names,
                email: scholar.email,
                birthdate: scholar.birthdate,
                years_of_exp: null,
                job_title: null,
                job_company: null,
                actual_city: null,
                gender: scholar.gender,
                actual_country: null,
                curriculum: null,
                description: null,
                facebook_user: null,
                image: null,
                speaker_kind: 'CHATS',
                instagram_user: null,
                linkedin_user: null,
                phone_number: scholar.cell_phone_Number,
                twitter_user: null,
            };
        }
        console.log(
            '\x1b[36m%s\x1b[0m',
            `Creating speaker ${workshopSpeaker.first_names} ${workshopSpeaker.last_names}`
        );
        await createWorkshopSpeaker(workshopSpeaker);
        console.log(
            '\x1b[32m%s\x1b[0m',
            `Speaker ${workshopSpeaker.first_names} ${workshopSpeaker.last_names}, created successfully`
        );
        return workshopSpeaker;
    });
    return workshopSpeakers;
};
