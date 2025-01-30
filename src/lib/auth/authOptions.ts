import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { randomUUID } from "crypto";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from 'next-auth';
import { getServerSession as getServerSessionAuth, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../db/utils/prisma";
import CustomEmailProvider, { EmailUserConfig } from "./EmailProvider";


/**
 * @description Google USER Client ID
 * @summary Client ID for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid to get the client id
 */
export const GOOGLE_USER_API_CLIENT_ID = process.env.GOOGLE_USER_API_CLIENT_ID!;
/**
 * @description Google USER Client Secret
 * @summary Client Secret for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred to get the client secret
 */
export const GOOGLE_USER_API_CLIENT_SECRET = process.env.GOOGLE_USER_API_CLIENT_SECRET!;


export const NEXT_SECRET = process.env.NEXTAUTH_SECRET || randomUUID();


interface ExtendedUser extends User {
  role?: string;
}

interface ExtendedSession extends Session {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const emailUserProviderConfig: EmailUserConfig = {
  type: 'email',
  id: 'email',
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
};


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: 'userGoogle',
      clientId: GOOGLE_USER_API_CLIENT_ID,
      clientSecret: GOOGLE_USER_API_CLIENT_SECRET,
      /// @see https://github.com/nextauthjs/next-auth/issues/519#issuecomment-1500498874 for more information
      allowDangerousEmailAccountLinking: true,
    }),
    CustomEmailProvider(emailUserProviderConfig),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: NEXT_SECRET,
  callbacks: {
    async jwt({ token, user, }: { token: JWT; user?: ExtendedUser }): Promise<JWT> {
      if (user) {
        token.role = user.kind_of_user;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<ExtendedSession> {
      return {
        name: "Pablo Peroz",
        image: "asdfasdfsadfsadfs",
        id: token.id as string,
        kindOfUser: token.role as string,
      } as ExtendedSession;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin', // Add this line to handle sign-in errors
    verifyRequest: '/signin/checkEmail',
    signOut: '/signin',
  },
} satisfies NextAuthOptions;

export const getServerSession = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return getServerSessionAuth(...args, authOptions)
}
export default authOptions;