import { prisma } from '@/lib/db/utils/prisma';
import { setTokens } from '@/lib/googleAPI/auth';
import { getFormatedDate } from '@/lib/googleAPI/calendar/utils';
import {
    appendSpreadsheetValuesByRange,
    createSpreadsheetAndReturnUrl,
    getSpreadsheetValues,
    getSpreadsheetValuesByUrl,
    insertSpreadsheetValue,
} from '@/lib/googleAPI/sheets';
import { Level, Modality, ScholarAttendance } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
    const token = await getToken({ req });
    if (token === null) return NextResponse.redirect('/api/auth/signin');
    setTokens(token.accessToken as string, token.refreshToken as string);
    await createChatsInBulkFromSpreadsheet();
    return NextResponse.json({ message: 'ok' });
}

const ERROR_START_NUMBER = 78;

//TENER EN CUENTA TAMBIEN EL RANGO DONDE SE COLOCA EL SPREADSHEET DE ERRORES
const FIRST_RANGE = 'B2:K48';
const FIRST_RANGE_MAIN_LIST = `A12:D26`;
const FIRST_RANGE_WAITING_LIST = `A28:D`;
//##########################################################################

//##########################################################################
const SECOND_RANGE = 'B49:K77';
const SECOND_RANGE_MAIN_LIST = `A9:D23`;
const SECOND_RANGE_WAITING_LIST = `A25:D`;
//##########################################################################

//##########################################################################
const LAST_RANGE = 'B78:K245';
const LAST_RANGE_MAIN_LIST = `A9:E21`;
const LAST_RANGE_WAITING_LIST = `A23:E`;
//##########################################################################

const CHAT_SPREADSHEET = '1y4lTjgqSQvBNtoWF_v6G2UR3a4eS-Et_dDD9XoQcYlM';
const CHAT_SHEET = 'Sheet1';
const CHAT_RANGE = `'${CHAT_SHEET}'!${LAST_RANGE}`;

const createChatsInBulkFromSpreadsheet = async () => {
    console.log('\x1b[36m%s\x1b[0m', '++++++ COMENZANDO EJECICION ++++++');
    // indice desde donde se empieza a extraer los datos de los talleres (se coloca la fila 2 porque la fila 1 son los titulos de las columnas)
    console.log('\x1b[34m%s\x1b[0m', 'Extrayendo datos');

    const values = (await getSpreadsheetValues(CHAT_SPREADSHEET, CHAT_RANGE)) as string[][];
    //   console.log(values);

    for (const [index, value] of values.entries()) {
        const [
            status,
            date,
            startHour,
            level,
            title,
            speakerName,
            speakerId,
            chatModality,
            platform,
            spreadsheet,
        ] = value;

        let spreadsheetForErrors: null | string = null; // dejamos la variable en null hasta que ocurra un problema, en caso de apareceer. colocamos la spreadsheet aqui.
        //parseamos los datos del taller

        const [dates] = parseDates(date, startHour);
        const chatId = nanoid();
        const chatLevel = parseLevel(level);
        const modality = parseChatModality(chatModality) as Modality;
        const activity_status = status === 'TRUE' ? 'ATTENDANCE_CHECKED' : 'SUSPENDED';
        const speakersDni = parseSpeakerId(speakerId);

        const speakersId = speakersDni.map(async (dni) => {
            const speaker = await prisma.scholar.findUnique({
                where: {
                    dni,
                },
            });
            if (speaker === null) return dni;
            else return speaker?.id;
        });

        console.log('\x1b[34m%s\x1b[0m', 'Parseando datos del taller de ' + title);

        try {
            const speakerIds = await Promise.all(speakersId);
            await prisma.chat.create({
                data: {
                    id: chatId,
                    title: title,
                    ...dates,
                    modality: modality,
                    platform: platform,
                    level: chatLevel,
                    activity_status: activity_status,
                    avalible_spots: 15,
                    description: '',
                    speaker: {
                        connect: speakerIds.map((id) => ({ id })),
                    },
                },
            });
            console.log('\x1b[32m%s\x1b[0m', '✅✅✅ chat ' + title + ' creado correctamente');
        } catch (e) {
            console.log(e);
            console.log('\x1b[31m%s\x1b[0m', '❌❌❌ No se pudo crear el chat ', title);
            continue;
        }
        if (activity_status === 'SUSPENDED') continue;
        //asistencia de la lista principal
        console.log('\x1b[34m%s\x1b[0m', 'Obteniendo datos de la lista principal');
        const attendanceRangeMainList = LAST_RANGE_MAIN_LIST;
        const mainListAttendance = (await getSpreadsheetValuesByUrl(
            spreadsheet,
            attendanceRangeMainList
        )) as string[][];

        if (mainListAttendance.length === 0) {
            console.log('   No hay asistencia en lista principal');
            continue;
        }
        console.log('\x1b[34m%s\x1b[0m', 'Colocando asistencia de lista principal');
        for (const a of mainListAttendance) {
            if (a.length === 0) continue;
            if (a[2] === undefined || a[2].trim().length === 0) continue;
            const email = a[2].trim().toLocaleLowerCase();

            let attendaci = parseScholarAttendace(status, a[4] as 'TRUE' | 'FALSE');
            let scholar;
            try {
                scholar = await prisma.scholar.findUniqueOrThrow({
                    where: {
                        email: email,
                    },
                    include: {
                        program_information: true,
                    },
                });
            } catch (e) {
                if (spreadsheetForErrors === null) {
                    spreadsheetForErrors = await createSpreadsheetForErrors(title, index);
                }
                console.log('     Colocando a ' + a[0] + ' en el spreadsheet de errores', email);
                a.push('MAIN_LIST');
                await appendSpreadsheetValuesByRange(spreadsheetForErrors, [a]);
                continue;
            }
            console.log('     Dando asistencia a ' + a[0]);
            await addAttendaceToScholar(
                chatId,
                scholar.program_information?.id!,
                attendaci as ScholarAttendance
            );
        }

        //ASISTENCIA DE LA LSITA DE ESPERA
        const attendanceWhaitingList = (await getSpreadsheetValuesByUrl(
            spreadsheet,
            LAST_RANGE_WAITING_LIST
        )) as string[][];

        if (attendanceWhaitingList === undefined || attendanceWhaitingList.length === 0) {
            console.log('No hay asistencia en lista de espera');
            continue;
        } else {
            console.log('Colocando asistencia de lista de espera');
            for (const a of attendanceWhaitingList) {
                if (a[2] === undefined || a[2].trim().length === 0) continue;
                const email = a[2].trim().toLocaleLowerCase();
                const attendance = parseScholarAttendaceWaitingList(status, a[4] as 'TRUE' | 'FALSE');
                if (attendance === 'ATTENDED') {
                    let user;
                    try {
                        user = await prisma.scholar.findUniqueOrThrow({
                            where: {
                                email: email,
                            },
                            include: {
                                program_information: true,
                            },
                        });
                    } catch (e) {
                        if (spreadsheetForErrors === null) {
                            spreadsheetForErrors = await createSpreadsheetForErrors(title, index);
                        }
                        console.log('colocando a ' + a[0] + ' en el spreadsheet de errores');
                        a.push('WAITING_LIST');
                        await appendSpreadsheetValuesByRange(spreadsheetForErrors, [a]);
                        continue;
                    }
                    console.log('     Dando asistencia a ' + a[0]);
                    await addAttendaceToScholar(
                        chatId,
                        user.program_information?.id!,
                        attendance as ScholarAttendance
                    );
                } else {
                    continue;
                }
            }
        }
    }
    console.log('\x1b[36m%s\x1b[0m', '++++++ EJECICION FINALIZADA ++++++');
};

// ======================================================= UTILS
const parseLevel = (skill: string): Level => {
    switch (skill.trim()) {
        case 'BASICO':
            return 'BASIC';
        case 'INTERMEDIO':
            return 'INTERMEDIATE';
        case 'AVANZADO':
            return 'ADVANCED';
        default:
            return 'BASIC';
    }
};

const parseChatModality = (modality: string) => {
    switch (modality) {
        case 'PRESENCIAL':
            return 'IN_PERSON';
        case 'VIRTUAL':
            return 'ONLINE';
        case 'Asincrono':
            return 'ONLINE';
    }
};

const parseDates = (
    date: string,
    startHour: string
): [
        {
            start_dates: string[];
            end_dates: string[];
        },
    ] => {
    const dates = date.includes(',') ? date.split(',') : [date];
    const start_dates: string[] = [];
    const end_dates: string[] = [];
    dates.forEach((d) => {
        d = d.trim();
        const [startDate, endDate] = getFormatedDate(d, startHour.trim());
        start_dates.push(startDate);
        end_dates.push(endDate);
    });
    const newDates = {
        start_dates,
        end_dates,
    };
    return [newDates];
};

const parseScholarAttendaceWaitingList = (status: string, attendance: 'TRUE' | 'FALSE') => {
    let parseAttendance;
    if (status === 'ENVIADO') parseAttendance = 'ENROLLED';
    else if (status === 'SIN_ASISTENCIA') parseAttendance = 'ENROLLED';
    else parseAttendance = attendance === 'TRUE' ? 'ATTENDED' : 'WAITING_LIST';
    return parseAttendance;
};
const parseScholarAttendace = (status: string, attendance: 'TRUE' | 'FALSE') => {
    let parseAttendance;
    if (status === 'ENVIADO') parseAttendance = 'ENROLLED';
    else if (status === 'SIN_ASISTENCIA') parseAttendance = 'ENROLLED';
    else parseAttendance = attendance === 'TRUE' ? 'ATTENDED' : 'NOT_ATTENDED';
    return parseAttendance;
};

const parseDni = (dni: string) =>
    dni
        .trim()
        .toLowerCase()
        .replace(/[^0-9]/g, '');

const addAttendaceToScholar = async (
    chatId: string,
    programInformationIdScholar: string,
    attendance: ScholarAttendance,
    formFilled?: boolean
) => {
    await prisma.chatAttendance.create({
        data: {
            chat: {
                connect: {
                    id: chatId,
                },
            },
            satisfaction_form_filled: formFilled,
            scholar: {
                connect: {
                    id: programInformationIdScholar,
                },
            },
            attendance: attendance as ScholarAttendance,
        },
    });
};

const parseSpeakerId = (speakersId: string) => {
    const speakersIdArr = speakersId.includes(',') ? speakersId.split(',') : [speakersId];

    return speakersIdArr.map((speaker) => speaker.trim() as string);
};

const createSpreadsheetForErrors = async (activityTitle: string, index: number) => {
    // colocamos ese mas 2 porque la fila 1 son los titulos de las columnas y el indice comienza desde 0
    const cellToPutSpreadsheet = `'${CHAT_SHEET}'!L${index + ERROR_START_NUMBER}:L${index + ERROR_START_NUMBER
        }`;
    console.log('\x1b[36m%s\x1b[0m', 'Creando Spreadsheet de errores');
    const spreadsheetForErrors = (await createSpreadsheetAndReturnUrl(activityTitle)) as string;
    await insertSpreadsheetValue(CHAT_SPREADSHEET, cellToPutSpreadsheet, [[spreadsheetForErrors]]);
    return spreadsheetForErrors;
};
