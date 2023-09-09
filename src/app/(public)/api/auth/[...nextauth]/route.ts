import authAdminOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { cookies } from 'next/headers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('fromWhereYouCome')?.value;
  if (cookieValue === 'scholar') return await NextAuth(req, res, authOptions);
  else if (cookieValue === 'admin') return await NextAuth(req, res, authAdminOptions);
  else throw new Error('cookieValue is not defined');
};

export { handler as GET, handler as POST };
