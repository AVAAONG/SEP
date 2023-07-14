import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { getSheetsName, getSpreadsheetValues } from "@/lib/sheets/sheets";
import { addWorkshopToScholar } from "@/lib/database/users";
import shortUUID from "short-uuid";

const SPREADSHEET_ID = "1LstEUxNdlM5enWjIoCj-_qa0p7PiOPnPBFgXwrUbQBY"

export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)

    const sheetNames = await getSheetsName(SPREADSHEET_ID)
    const vale = {}
    sheetNames?.forEach(async (sheetName) => {
        const range = `${sheetName}!A8:G`;
        const rageID = `${sheetName}!H7`;
        const values = await getSpreadsheetValues(SPREADSHEET_ID, range) as string[][]
        const workshopId = await getSpreadsheetValues(SPREADSHEET_ID, rageID) as string[][]
        
        values.forEach(async (re) => {
            const attendance = re[6] === "Si" ? "ATTENDED" : "NOT_ATTENDED"
            if(re[3] === undefined) {}
            else if (re[3].length) await addWorkshopToScholar(normalizeDni(re[3]) as shortUUID.SUUID, workshopId[0][0] as shortUUID.SUUID, attendance)
        })
    })

    return NextResponse.json(vale)
}

const normalizeDni = (dni: string) => {
    return dni.trim().replaceAll('.', '').toLocaleLowerCase().replaceAll("v-", "")
}
