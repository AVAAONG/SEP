import NextAuth, { type NextAuthOptions } from 'next-auth';
import authOptions from '@/lib/auth/nextAuth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };