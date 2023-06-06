/**
 * @file This file contains all the necesary options to set up the next-auth configuration object.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
*/

import type { CredentialsConfig } from "next-auth/providers/credentials";

/**
 * @description Google Client ID  
 * @summary Client ID for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid to get the client id 
 */
export const GOOGLE_API_CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID!;
/**
 * @description Google Client Secret
 * @summary Client Secret for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred to get the client secret
*/
export const GOOGLE_API_CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET!;

/**
 * @description Google Admin Scopes
 * @summary Scopes for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/scopes
 */
export const GOOGLE_ADMIN_SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/contacts',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
];

/** 
 * @description NextAuth pages
 * @summary By default, NextAuth.js will render a generic page for handilg sign in, sign out, email verification and displating error messages.
 * You can override these pages by creating a page object with the path to your custom page in where the user can signIn or signUp.
 * @see https://next-auth.js.org/configuration/pages
 *  
 */
export const PAGES = {
    signIn: "/auth/signIn",
    newUser: "/auth/signUp",
    error: "/auth/signUp",
}


/**
 * @description NextAuth Google Provider Options object
 * @summary The Google provider allows you to sign in with a Google account using OAuth 2.0.
 * @see https://next-auth.js.org/configuration/providers/oauth to learn about the oauth 2.0 protocol
 * 
 * @see https://next-auth.js.org/providers/google to learn about the google provider in nexth-auth
 * @see https://developers.google.com/identity/protocols/oauth2 to learn about the google oauth2 protocol
 */
export const googleProviderConfig = {
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


/**
 * @description NextAuth Credentials Provider Options object
 * @summary The credentials provider allows you to accept arbitrary credentials from users.
 * This is useful if you want to allow users to sign in with a username/password or any other type of credentials.
 * 
 * This object allow you to configure all the necesary options for the credentials provider.
 * @see https://next-auth.js.org/providers/credentials
 * @see https://next-auth.js.org/configuration/providers/credentials to learn more about credentials
 */
export const credentialsProviderConfig: CredentialsConfig = {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {
        username: { label: "Username", type: "text", placeholder: "Jose Rodriguez" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        if (credentials === undefined) throw new Error("Credentials are null")
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
