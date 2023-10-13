/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/db/utils/prisma';
import { NEXT_SECRET, PAGES, googleAdminProviderConfig } from './authAdminConfig';

const adapter = PrismaAdapter(prisma);

/**
 *
 * @description NextAuth configuration options
 * @see https://next-auth.js.org/configuration/options
 * @see https://next-auth.js.org/configuration/providers
 * @see https://next-auth.js.org/configuration/callbacks
 * @see https://next-auth.js.org/configuration/pages
 *
 */
const authAdminOptions: NextAuthOptions = {
  /**
   * @description NextAuth providers, those are services in next auth that can be used to authenticate users.
   * @see https://next-auth.js.org/providers/ to see the complete list of options to authenticate users.
   */
  providers: [GoogleProvider(googleAdminProviderConfig)],
  secret: NEXT_SECRET,
  /**
   * @see https://authjs.dev/reference/adapters for adapters information
   * @see https://authjs.dev/reference/adapter/pri sma for prisma adapter information
   */
  /**
   * @description it is used to configure how to save the user session
   * it sets default to "jwt" which is a cookie based session. THis is override when using a database adapter,
   * so we have to specified it here to sill use the jwt session.
   *
   * DON'T confuse it with the callback session or calback jwt. Those are different things, and are specified bellow.
   *
   * @see https://next-auth.js.org/configuration/options#session
   * */
  session: {
    strategy: 'jwt',
  },
  pages: PAGES,

  /**
   * @description Callbacks are functions that are called **async** during the execution of NextAuth.js,
   * when specific events occur.
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      let email: string | undefined = '';
      if (account?.provider === 'email') email = account.providerAccountId;
      else email = profile!.email;
      const userExists = await prisma.adminProfile.findUnique({
        where: { allowedEmail: email! },
      });
      if (!userExists) throw Error('notAdmin');
      else return true;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token,
          accessToken: token.accessToken,
          randomKey: token.randomKey,
          refreshToken: token.refreshToken,
          kind_of_user: 'ADMIN',
        },
      };
    },
    jwt: ({ token, user, account, profile }) => {
      if (user) {
        const u = user as unknown as any;
        const accessToken = account?.access_token;
        const refreshToken = account?.refresh_token;
        return {
          ...token,
          id: u.id,
          accessToken,
          refreshToken,
          kind_of_user: 'ADMIN',
        };
      }
      return token;
    },
  },
  adapter
};

export default authAdminOptions;
