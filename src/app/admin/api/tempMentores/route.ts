import { setTokens } from "@/lib/googleAPI/auth";
import { getSpreadsheetValues } from "@/lib/googleAPI/sheets";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    const token = await getToken({ req });
    if (token === null) return NextResponse.redirect('/api/auth/signin');
    setTokens(token.accessToken as string, token.refreshToken as string);
    return NextResponse.json({ message: 'ok' });
}

const MENTORS_SPREADSHEET = '1uHKLAYpLHYiFi6CnCWcxS1tzOoD8bDmoux2ETRWgEYI';
const MENTOR_SHEET = 'Respuestas de formulario 1';
const MENTORS_SHEET_RANGE = `'${MENTOR_SHEET}'!B2:AO154`;


const mentores = async () => {
    const values = (await getSpreadsheetValues(
        MENTORS_SPREADSHEET,
        MENTORS_SHEET_RANGE
    )) as string[][];

}