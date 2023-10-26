// import { prisma } from "@/lib/db/utils/prisma";
import { setTokens } from '@/lib/googleAPI/auth';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  if (token === null) return NextResponse.redirect('/api/auth/signin');
  setTokens(token.accessToken as string, token.refreshToken as string);
  return NextResponse.json({ message: 'ok' });
}