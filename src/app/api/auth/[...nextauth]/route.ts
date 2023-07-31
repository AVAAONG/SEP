import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/nextAuthOptions/authOptions';
import adminAuthOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookieStore = cookies()
    const cookieValue = cookieStore.get('fromWhereYouCome')?.value
    if (cookieValue === "scholar") return await NextAuth(req, res, authOptions);
    else if (cookieValue === "admin") return await NextAuth(req, res, adminAuthOptions);
    else throw new Error("cookieValue is not defined")
}




export { handler as GET, handler as POST };