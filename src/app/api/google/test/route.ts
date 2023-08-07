import { setTokens } from "@/lib/auth/auth";
import authOptions from "@/lib/auth/nextAuthScholarOptions/authOptions";
import { getAllFilesInFolder } from "@/lib/drive/drive";
import { getSheetsName, getSpreadsheetValues } from "@/lib/sheets/sheets";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {

    // const token = await getToken({ req })
    // setTokens(token.accessToken, token.refreshToken)

    // const files = await getAllFilesInFolder("1Yb3aLVhfZwCK1DChGw15QwT0wMzbEPVx")
    // // files?.forEach(async (file) => {
    // const sheetNames = await getSheetsName(files[0].id!)


    return NextResponse.json({ message: "ok" })

    // sheetNames?.forEach(async (sheetName) => {
    //     const range = `${sheetName}!A8:G`;
    //     const values = await getSpreadsheetValues(files[0].id!, range) as string[][]
    //     value = values
    // })
    // })



}
