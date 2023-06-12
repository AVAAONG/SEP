import authOptions from "@/lib/auth/nextAuthOptions/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    const token = await getToken({ req })
    return NextResponse.json({ token })
}
