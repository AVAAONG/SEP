import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/nextAuthOptions/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };