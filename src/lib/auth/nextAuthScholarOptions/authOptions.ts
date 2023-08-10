/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Email from './EmailProvider';
import {
  NEXT_SECRET,
  PAGES,
  emailUserProviderConfig,
  googleUserProviderConfig,
} from './authConfig';

const prisma = new PrismaClient();
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
const authOptions: NextAuthOptions = {
  /**
   * @description NextAuth providers, those are services in next auth that can be used to authenticate users.
   * @see https://next-auth.js.org/providers/ to see the complete list of options to authenticate users.
   */
  providers: [
    // GoogleProvider(googleAdminProviderConfig),
    GoogleProvider(googleUserProviderConfig),
    Email(emailUserProviderConfig),
  ],
  /**
   * @see https://authjs.dev/reference/adapters for adapters information
   * @see https://authjs.dev/reference/adapter/pri sma for prisma adapter information
   */
  adapter,
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
  secret: NEXT_SECRET,

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

      // const emailBasedPath= `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}&su=${SUBJECT_MESSAGE}&body=${encodedMessage}&bcc=${recipients}`

    //   const userExists = await prisma.scholar.findUnique({
    //     where: { email },
    //   });

    //   if (!userExists) throw 'notAllowed';
    //   else return true;
    return true
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        //the token.sub obj contains the user id
        id: token.sub,
      },
    }),
  },
  events: {
    createUser: async (data) => {
      await prisma.user.update({
        where: {
          id: data.user.id,
        },
        data: {
          scholar: {
            create: {
              email: data.user.email!!,
              first_names: 'Kevin Jose',
          last_names: 'Bravo Mota',
          scholar_status: 'CURRENT',
            },
          },
          role: 'SCHOLAR',
        },
      });
    },
  },
  pages: PAGES,
};

export default authOptions;
