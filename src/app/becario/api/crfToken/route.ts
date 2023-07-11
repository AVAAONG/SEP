import { getCsrfToken } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    const csrfToken = await getCsrfToken()
    return NextResponse.json({ csrfToken })
}