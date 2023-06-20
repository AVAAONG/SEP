import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { setTokens } from "@/lib/auth/auth";
import { getSheetsName, getSpreadsheetValues } from "@/lib/sheets/sheets";


export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req });
    setTokens(token.accessToken, token.refreshToken)

    const chatsValues = await getSpreadsheetValues("1aC0XcBxnODfMMVlnNf7fw1loWgxok2dZLfU898DtlqU", "Sheet1!A2:H93") as string[][]


    // // const data = await getAllFilesInFolder("1Yb3aLVhfZwCK1DChGw15QwT0wMzbEPVx")
    // const sheetNames = await getSheetsName("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY")

    // let value;
    // sheetNames?.forEach(async (sheetName) => {
    //     const range = `${sheetName}!A8:G`;
    //     const rageID = `${sheetName}!H7`;
    //     const values = await getSpreadsheetValues("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY", range) as string[][]
    //     const workshopId = await getSpreadsheetValues("1P6GpJJCYpNGUZhtj6Oii4TXweab5gi2y4TUdYckZETY", rageID) as string[][]
    //     values.forEach(async (re) => {
    //         const attendance = re[6] === "Si" ? "ATTENDED" : "NOT_ATTENDED"
    //         if (re[3].length) await addWorkshopToScholar(re[3].trim().replaceAll('.', '').toLocaleLowerCase().replaceAll("V-", "") as shortUUID.SUUID, workshopId[0][0] as shortUUID.SUUID, attendance)
    //     })
    // })
    return NextResponse.json({ messagge: "ok" })
}