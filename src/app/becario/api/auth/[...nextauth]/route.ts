import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };