import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { ScholarStatus } from '@prisma/client';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from 'next-auth';
import { getServerSession as getServerSessionAuth } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../db/utils/prisma";
import { GOOGLE_PROVIDER_CONFIG, NEXT_SECRET, PAGES } from './authConfig';
import CustomEmailProvider from "./EmailProvider";
import { getAdminInitialInfo, getApplicantInitialInfo, getScholarInitialInfo } from './helpers';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: NEXT_SECRET,
  pages: PAGES,

  providers: [
    GoogleProvider(GOOGLE_PROVIDER_CONFIG),
    CustomEmailProvider(),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {

      if (trigger === 'update') {
        if (!token.sub) return token
        const applicant = await getApplicantInitialInfo(token.sub)
        if (!applicant) return token
        token.name = applicant.name
        token.image = applicant.image
        token.email = applicant.email ? applicant.email : token.email
        token.chapterId = applicant.chapterId
        token.id = applicant.id
        token.role = 'APPLICANT'
      }
      /** 
       * check for the existence of parameters (apart from token). If they exist, this means that the callback is being invoked for the first time (i.e. the user is being signed in).
       * Subsequent invocations will only contain the token parameter.
       * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
       * **/
      if (user) {
        if (user.kind_of_user === 'ADMIN') {
          const admin = await getAdminInitialInfo(user.id)
          token.name = admin.name,
            token.image = admin.image,
            token.email = admin.email,
            token.id = user.id,
            token.role = user.kind_of_user,
            token.chapterId = admin.chapterId
        }
        if (user.kind_of_user === 'SCHOLAR') {
          const scholar = await getScholarInitialInfo(user.id)
          token.name = scholar.name,
            token.image = scholar.image,
            token.email = scholar.email,
            token.id = user.id,
            token.role = user.kind_of_user,
            token.chapterId = scholar.chapterId,
            token.scholarStatus = scholar.scholarStatus,
            token.isSpeaker = scholar.isSpeaker
        }
        if (user.kind_of_user === 'APPLICANT') {
          const applicant = await getApplicantInitialInfo(user.id)
          if (applicant) {
            token.name = applicant.name
            token.image = applicant.image
            token.email = applicant.email
            token.chapterId = applicant.chapterId
            token.id = user.id
            token.role = user.kind_of_user
          }
          token.id = user.id
          token.role = user.kind_of_user
          token.email = user.email
        }
      }

      return token;
    },
    async session({ token, session }) {
      return {
        name: token.name as string,
        image: token.image as string,
        email: token.email as string,
        id: token.id as string,
        kindOfUser: token.role as string,
        chapterId: token.chapterId as string,
        scholarStatus: token.scholarStatus as ScholarStatus,
        isSpeaker: token.isSpeaker as boolean,
        expires: session.expires,
      };
    },
  },
} satisfies NextAuthOptions;

export const getServerSession = async (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return await getServerSessionAuth(...args, authOptions)
}
export default authOptions;