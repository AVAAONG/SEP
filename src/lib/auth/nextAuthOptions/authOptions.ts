/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
*/

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

// export function PrismaAdapter(p: PrismaClient): Adapter {
//     return {
//       createUser: (data) => {
//         p.user.create({
//             data: {
//                 ...data,
//                 scholar: {
//                     connect: {
//                         email: data.email,
//                     },
//                 },
//                 role: 'SCHOLAR',
//             },
//         })
//       },
//       getUser: (id) => p.user.findUnique({ where: { id } }),
//       getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
//       async getUserByAccount(provider_providerAccountId) {
//         const account = await p.account.findUnique({
//           where: { provider_providerAccountId },
//           select: { user: true },
//         })
//         return account?.user ?? null
//       },
//       updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
//       deleteUser: (id) => p.user.delete({ where: { id } }),
//       linkAccount: (data) =>
//         p.account.create({ data }) as unknown as AdapterAccount,
//       unlinkAccount: (provider_providerAccountId) =>
//         p.account.delete({
//           where: { provider_providerAccountId },
//         }) as unknown as AdapterAccount,
//       async getSessionAndUser(sessionToken) {
//         const userAndSession = await p.session.findUnique({
//           where: { sessionToken },
//           include: { user: true },
//         })
//         if (!userAndSession) return null
//         const { user, ...session } = userAndSession
//         return { user, session }
//       },
//       createSession: (data) => p.session.create({ data }),
//       updateSession: (data) =>
//         p.session.update({ where: { sessionToken: data.sessionToken }, data }),
//       deleteSession: (sessionToken) =>
//         p.session.delete({ where: { sessionToken } }),
//       async createVerificationToken(data) {
//         const verificationToken = await p.verificationToken.create({ data })
//         // @ts-expect-errors // MongoDB needs an ID, but we don't
//         if (verificationToken.id) delete verificationToken.id
//         return verificationToken
//       },
//       async useVerificationToken(identifier_token) {
//         try {
//           const verificationToken = await p.verificationToken.delete({
//             where: { identifier_token },
//           })
//           // @ts-expect-errors // MongoDB needs an ID, but we don't
//           if (verificationToken.id) delete verificationToken.id
//           return verificationToken
//         } catch (error) {
//           // If token already used/deleted, just return null
//           // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
//           if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
//             return null
//           throw error
//         }
//       },
//     }
//   }



import { googleUserProviderConfig, PAGES, NEXT_SECRET, } from "./authConfig";
import Email from "next-auth/providers/email";

const prisma = new PrismaClient();

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
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  /**
   * @see https://authjs.dev/reference/adapters for adapters information
   * @see https://authjs.dev/reference/adapter/pri sma for prisma adapter information
  */
  adapter: PrismaAdapter(prisma),
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
    strategy: "jwt",
  },
  secret: NEXT_SECRET,

  /**
   * @description Callbacks are functions that are called **async** during the execution of NextAuth.js, 
   * when specific events occur.
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const email = profile.email
      // const name = profile.name

      // const SUBJECT_MESSAGE =  encodeURIComponent(`Problemas al ingresar al SEP - ${name}`)

      // const emailBasedPath= `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}&su=${SUBJECT_MESSAGE}&body=${encodedMessage}&bcc=${recipients}`

      const userExists = await prisma.scholar.findUnique({
        where: { email },
      })
      if (!userExists) {
        throw new Error('notAllowed')
      }

      return true
    },
  },
  events: {
    createUser: async (data) => {
      await prisma.user.update({
        where: {
          id: data.user.id,
        },
        data: {
          scholar: {
            connect: {
              email: data.user.email!!,
            },
          },
          role: 'SCHOLAR',
        },
      })
    }
  },

  pages: PAGES,
};

export default authOptions;