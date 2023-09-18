/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/db/utils/prisma';
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

      // const name = profile.name
      // const SUBJECT_MESSAGE =  encodeURIComponent(`Problemas al ingresar al SEP - ${name}`)
      // const encodedMessage = encodeURIComponent(`Hola, mi nombre es ${name} y estoy teniendo problemas al ingresar al SEP, me gustaría que me ayudaran a solucionarlo.`)
      // const emailBasedPath= `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}&su=${SUBJECT_MESSAGE}&body=${encodedMessage}&bcc=${recipients}`

      const userExists = await prisma.adminUser.findUnique({
        where: { email },
      });
      console.log(userExists);
      console.log(email);
      if (!userExists) throw Error('notAdmin');
      else return true;
    },
    session: async ({ session, token }) => {
      //optenemos el rol del usuario en la database
      // const role = await prisma.adminUser.findUnique({
      //   where: {
      //     email: token.email,
      //   },
      // });

      return {
        ...session,
        user: {
          ...session.user,
          id: token,
          accessToken: token.accessToken,
          randomKey: token.randomKey,
          refreshToken: token.refreshToken,
          role: 'STAFF',
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
  // events: {
  //   createUser: async (data) => {
  //     await prisma.user.update({
  //       where: {
  //         id: data.user.id,
  //       },
  //       data: {
  //         scholar: {
  //           create: {
  //             email: data.user.email!!,
  //             first_names: 'Kevin Jose',
  //             last_names: 'Bravo Mota',
  //             scholar_status: 'CURRENT',
  //           },
  //         },
  //         role: 'SCHOLAR',
  //       },
  //     });
  //   },
  // },
  adapter: PrismaAdapter(prisma, {
    userModel: 'adminUser',
    accountModel: 'adminAccount',
    sessionModel: 'adminSession',
    verificationTokenModel: 'adminVerificationToken',
  }),
};

export default authAdminOptions;
