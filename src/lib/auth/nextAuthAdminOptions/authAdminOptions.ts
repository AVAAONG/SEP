/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/db/prisma';
import { PrismaAdapter } from 'next-auth-prisma-adapter';
import { NEXT_SECRET, PAGES, googleAdminProviderConfig } from './authAdminConfig';

/**
 *
 * @description NextAuth configuration options
 * @see https://next-auth.js.org/configuration/options
 * @see https://next-auth.js.org/configuration/providers
 * @see https://next-auth.js.org/configuration/callbacks
 * @see https://next-auth.js.org/configuration/pages
 *
 */
const adminAuthOptions: NextAuthOptions = {
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
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token,
          accessToken: token.accessToken,
          randomKey: token.randomKey,
          refreshToken: token.refreshToken,
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
        };
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma, {
    userModel: 'adminUser',
    accountModel: 'adminAccount',
    sessionModel: 'adminSession',
    verificationTokenModel: 'adminVerificationToken',
  }),
};

export default adminAuthOptions;

/**
 * user {id, name, email, image}
 * Adaoter uesr {id, email, emailVerified}
 * account { access_token, token_type, id_token, refresh_token, scope,
 * expires_at:
 * session_state:
 * }
 * profile {
 *   sub?: string
  name?: string
  email?: string
  image?: string}
 */
