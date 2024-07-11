/**
 * @file This file contains the NweAuth configuration options object to set up next-auth library.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import { prisma } from '@/lib/db/utils/prisma';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NEXT_SECRET, emailUserProviderConfig, googleUserProviderConfig } from '../nextAuthScholarOptions/authConfig';
import CustomEmailProvider from '../nextAuthScholarOptions/EmailProvider';
import { customPrismaAdapter } from '../nextAuthScholarOptions/PrismCustomAdapter';
import { PAGES } from './authApplicantConfig';

const adapter = customPrismaAdapter(prisma);

/**
 *
 * @description NextAuth configuration options
 * @see https://next-auth.js.org/configuration/options
 * @see https://next-auth.js.org/configuration/providers
 * @see https://next-auth.js.org/configuration/callbacks
 * @see https://next-auth.js.org/configuration/pages
 *
 */
const applicantAuthOptions: NextAuthOptions = {
    /**
     * @description NextAuth providers, those are services in next auth that can be used to authenticate users.
     * @see https://next-auth.js.org/providers/ to see the complete list of options to authenticate users.
     */
    providers: [
        GoogleProvider(googleUserProviderConfig),
        CustomEmailProvider(emailUserProviderConfig),
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
            const scholar = await prisma.scholar.findUnique({
                where: { email },
                select: {
                    program_information: {
                        select: {
                            scholar_status: true,
                        }
                    }
                }
            });
            if (scholar?.program_information) throw 'alreadyScholar';
            else return true;
        },
        session: async ({ session, token }) => {
            return {
                userId: token.userId,
                ...session,
                scholarId: token.scholarId,
                kind_of_user: 'APPLICANT',
            };
        },
        jwt: ({ token, user, account, profile }) => {
            if (user) {
                const u = user as unknown as any;
                const userId = u?.id;
                const scholarId = u?.scholarId;
                const kind_of_user = u?.kind_of_user;
                return {
                    ...token,
                    userId,
                    scholarId,
                    kind_of_user,
                };
            }
            return token;
        },
    },
    pages: PAGES,
};

export default applicantAuthOptions;
