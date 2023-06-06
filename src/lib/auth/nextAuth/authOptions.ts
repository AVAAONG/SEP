import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsPrivider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const GOOGLE_API_CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID!;
const GOOGLE_API_CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET!;

const GOOGLE_ADMIN_SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/contacts',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
];

const prisma = new PrismaClient();

const googleProviderConfig = {
    clientId: GOOGLE_API_CLIENT_ID,
    clientSecret: GOOGLE_API_CLIENT_SECRET,
    authorization: {
        params: {
            access_type: "offline",
            include_granted_scopes: true,
            scope: GOOGLE_ADMIN_SCOPES.join(" "),
        }
    }
}


const credentialsProviderConfig = {
    credentials: {
        username: { label: "Username", type: "text", placeholder: "Jose Rodriguez" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const user = {
            id: credentials.username,
            name: credentials.username,
            email: credentials.username,
            image: null,
            accessToken: null,
        };

        if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
        }
        else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
        }
    }

}


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
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider(googleProviderConfig),
        CredentialsPrivider(credentialsProviderConfig),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token,
                    accessToken: token.accessToken,
                    randomKey: token.randomKey,
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
                    randomKey: u.randomKey,

                };
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signIn",
    }
};

export default authOptions; 
