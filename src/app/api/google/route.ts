import authOptions from '@/lib/auth/nextAuth/providerConfig';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { setTokens } from '@/lib/auth/auth';
import { getCalendarEvents } from '@/lib/calendar/calendar';

export async function GET(req: NextApiRequest) {
    const session = await getServerSession(authOptions);
    const token = await getToken({ req });
    //@ts-ignore
    setTokens(token.accessToken)
    const t = await getCalendarEvents()
    console.log(t)
    // console.log(session)

    // return NextRs
}