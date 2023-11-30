import authAdminOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('fromWhereYouCome')?.value;
  if (cookieValue === 'scholar') return await NextAuth(req, res, authOptions);
  else if (cookieValue === 'admin') return await NextAuth(req, res, authAdminOptions);
  else return NextResponse.json({ message: 'The cookie was not specified' })
};

export { handler as GET, handler as POST };
