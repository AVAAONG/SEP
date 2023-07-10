import authOptions from "@/lib/auth/nextAuthOptions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    redirect(`/becario/${session.user.id}/config`);
}