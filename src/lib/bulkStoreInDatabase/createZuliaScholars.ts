import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { Collages } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
    const token = await getToken({ req });
    if (token === null) return NextResponse.redirect('/api/auth/signin');
    setTokens(token.accessToken as string, token.refreshToken as string);
    // await createScholarsInBulkFromSheet();
    return NextResponse.json({ message: 'ok' });
}

const SCHOLARS_SPREADSHEET = '1cc5spIPGVBpw-cLZ_bTkDVQ7oIjuaWGQ7D617Hf1ZJI';
const SCHOLAR_SHEET = 'Database';
const SCHOLARS_SHEET_RANGE = `'${SCHOLAR_SHEET}'!A2:O44`;
const createScholarsInBulkFromSheet = async (chapterID: string = 'H0rvqSucbop6uozNUpuC-') => {
    const values = (await getSpreadsheetValues(
        SCHOLARS_SPREADSHEET,
        SCHOLARS_SHEET_RANGE
    )) as string[][];
    const scholars = values.map(async (row) => {
        const [
            lastName,
            firstName,
            dni,
            spreadsheetGender,
            spreadSheetBirthdate,
            email,
            localPhone,
            mobilePhone,
            address,
            collage,
            career,
            studyArea,
            academicRegime,
            avaaStartedDate,
            status,
        ] = row;
        const scholar_condition = parseStatus(status);

        try {
            await prisma.scholar.create({
                data: {
                    first_names: firstName,
                    last_names: lastName,
                    dni: dni,
                    birthdate: new Date(spreadSheetBirthdate),
                    email: email,
                    local_phone_number: localPhone,
                    cell_phone_Number: mobilePhone,
                    whatsapp_number: mobilePhone,
                    address: address,
                    gender: spreadsheetGender.toLowerCase() === 'hombre' ? 'M' : 'F',
                    program_information: {
                        create: {
                            program_admission_date: new Date(avaaStartedDate),
                            scholar_condition,
                            chapter: {
                                connect: {
                                    id: chapterID,
                                },
                            },
                            is_chat_speaker: false
                        },
                    },
                    collage_information: {
                        create: {
                            collage: collage as Collages,
                            career: career,
                            study_regime: parseStudyRegime(academicRegime),
                            evaluation_scale: 'CERO_TO_TWENTY',
                            kind_of_collage: 'PUBLIC',
                        },
                    },
                },
            });
            console.log('✅ El becario', firstName, lastName, 'se ha creado correctamente');
        } catch (error) {
            console.error('El becario', firstName, lastName, 'no se ha podido crear');
            console.error(error);
        }
    });

    return scholars;
};

const parseStudyRegime = (regime: string) => {
    switch (regime) {
        case 'Año':
            return 'ANNUAL';
        case 'Trimestre':
            return 'QUARTER';
        case 'Semestre':
            return 'SEMESTER';
        default:
            return 'ANNUAL';
    }
}

const parseStudyArea = (area: string) => {
    switch (area) {
        case 'Arquitectura y Urbanismo':
            return 'ARCHITECTURE_URBANISM';
        case 'Ciencias de la Salud':
            return 'HEALTH_SCIENCES';
        case 'Ciencias Jurídicas y Políticas':
            return 'JURIDICAL_POLITICAL_SCIENCES';
        case 'Ciencias Sociales':
            return 'SOCIAL_SCIENCES';
        case 'Humanidades y Educación':
            return 'HUMANITIES_EDUCATION';
        case 'STEM':
            return 'STEM';
        default:
            return 'OTHER';
    }
};

const parseStatus = (status: string) => {
    switch (status) {
        case 'ACTIVO':
            return 'ACTIVE';
        case 'EGRESADO':
            return 'ALUMNI';
        case 'RENUNCIO':
            return 'RESIGNATION';
        case 'RETIRO':
            return 'WITHDRAWAL';
        default:
            return 'ACTIVE';
    }
};
