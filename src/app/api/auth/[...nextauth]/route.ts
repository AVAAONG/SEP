import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/nextAuthOptions/authOptions';
import adminAuthOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';

const handler = NextAuth(adminAuthOptions);

export { handler as GET, handler as POST };