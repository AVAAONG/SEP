/**
 * @file This file contains all the necesary options to set up the next-auth configuration object.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
*/
import { PagesOptions } from "next-auth";
import { OAuthUserConfig } from "next-auth/providers";
import shortUUID from "short-uuid";

export const NEXT_SECRET = process.env.NEXTAUTH_SECRET || shortUUID.generate();

/** 
 * @description NextAuth pages
 * @summary By default, NextAuth.js will render a generic page for handilg sign in, sign out, email verification and displating error messages.
 * You can override these pages by creating a page object with the path to your custom page in where the user can signIn or signUp.
 * @see https://next-auth.js.org/configuration/pages
 *  
 */
export const PAGES: Partial<PagesOptions> = {
    signIn: "/signin/becario",
    error: "/signin/becario",
    newUser: "/becario/config",
    verifyRequest: '/signin/becario/verify-email'

}

/// ==================================== NEXT AUTH CONFIGURATION FOR USERS ==================================== ///

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


/**
 * @description NextAuth Google Provider Options object for USERS
 * @summary This provider allows users to sign in in the app using their google account.
 * 
 * The difference between this provider and the google provider for admins is that this provider only request the user profile information, 
 * whereas the google provider for admins request a lot of scopes to access the google apis.
 * 
 * @see https://next-auth.js.org/configuration/providers/oauth to learn about the oauth 2.0 protocol
 * 
 * @see https://next-auth.js.org/providers/google to learn about the google provider in nexth-auth
 * @see https://developers.google.com/identity/protocols/oauth2 to learn about the google oauth2 protocol
 * @see https://next-auth.js.org/configuration/providers/oauth#options to learn about the options for the oauth providers
 */
export const googleUserProviderConfig: OAuthUserConfig<any> = {
    // the id should match with the redirect url final path in the google console
    id: "userGoogle",
    clientId: GOOGLE_USER_API_CLIENT_ID,
    clientSecret: GOOGLE_USER_API_CLIENT_SECRET,
}

export const emailUserProviderConfig = {
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }

/// ==================================== NEXT AUTH CONFIGURATION FOR ADMINS ==================================== ///

/**
 * @description Google ADMIN Client ID  
 * @summary Client ID for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid to get the client id 
 */
export const GOOGLE_ADMIN_API_CLIENT_ID = process.env.GOOGLE_ADMIN_API_CLIENT_ID!;
/**
 * @description Google ADMIN Client Secret
 * @summary Client Secret for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred to get the client secret
*/
export const GOOGLE_ADMIN_API_CLIENT_SECRET = process.env.GOOGLE_ADMIN_API_CLIENT_SECRET!;

/**
 * @description Google ADMIN Scopes
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
 * @description NextAuth Google Provider Options object for ADMINS
 * @summary This provider allows admin to sign in in the app using their google account.
 * 
 * It is important to notice that this provider is only for admin users, so it is not available for the public, 
 * cause have a lot of googke scopes that are not necesary for the public.
 * @see https://next-auth.js.org/configuration/providers/oauth to learn about the oauth 2.0 protocol
 * 
 * @see https://next-auth.js.org/providers/google to learn about the google provider in nexth-auth
 * @see https://developers.google.com/identity/protocols/oauth2 to learn about the google oauth2 protocol
 */
export const googleAdminProviderConfig: OAuthUserConfig<any> = {
    id: "AdminGoogle",
    clientId: GOOGLE_ADMIN_API_CLIENT_ID,
    clientSecret: GOOGLE_ADMIN_API_CLIENT_SECRET,
    authorization: {
        params: {
            access_type: "offline",
            include_granted_scopes: true,
            scope: GOOGLE_ADMIN_SCOPES.join(" "),
            max_age: 30660
        }
    }
}